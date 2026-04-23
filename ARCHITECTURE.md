# Architecture

---

## 1. Components, Data Flows, Boundaries

Four services + Postgres + RabbitMQ + a shared volume for artifacts.
Communication is asynchronous via the AMQP topic exchange `reports`. Status is pushed to the browser via SSE.

```
Browser ─POST /reports──▶ report-api ──AMQP──▶ report-worker ──AMQP──▶ events-api ─SSE─▶ Browser
                               │                     │
                             Postgres            /artifacts (volume)
```

| Component       | Responsibility                                                        |
| --------------- | --------------------------------------------------------------------- |
| `report-api`    | REST: report creation, client listing, **report-type catalog**, static artifacts. Does not know how reports are rendered. |
| `report-worker` | AMQP consumer. Fetches source data, renders artifact, updates DB, publishes events. One handler per report type. |
| `events-api`    | AMQP consumer → SSE fan-out to browsers. Isolates long-lived connections from the REST service. |
| `clinic-web-app`| React SPA (FSD layout). Talks to `report-api` for REST, `events-api` for SSE. |

---

## 2. How to Add a New Report

1. **Shared contract** — add the literal to `reportTypes.ts` in `report-api` and `report-worker`, and extend `reportTypeCatalog` in `report-api/src/reportTypes.ts` (label, format, `requiresClient`, description). The frontend discovers the new type automatically via `GET /report-types` — no frontend enum to update.
2. **Renderer** (if new format) — `report-worker/src/renderers/render<Name>.ts`.
3. **Handler** — `report-worker/src/handlers/handler<Name>Report.ts`. For a per-client report use `CosmofitHandler` (typed with `clientId`); for a global report use `Handler`.
4. **Wire it** — add a `case` to the `switch` in `report-worker/src/index.ts`.
5. **Request shape** — if the new type needs extra parameters, extend the `discriminatedUnion` in `report-api/src/App/requestSchemas.ts` and the mirror schema in `report-worker/src/App/schemas.ts`.

---

## 3. Decisions and Alternatives

### 3.1 RabbitMQ (topic exchange) vs BullMQ/Redis vs cron table
**Chose:** RabbitMQ. **Why:** Report generation is genuinely asynchronous work with multiple event kinds (`*.validate`, `*.done`, `*.failed`) and multiple consumers (worker + events-api). A topic exchange with routing-key patterns lets us add new consumers without touching producers. BullMQ gives great job ergonomics but ties us to Redis and to its own retry/DLQ vocabulary — harder to bolt an independent SSE fan-out onto. A cron + DB polling table is simpler but not really asynchronous and scales poorly across workers.

### 3.2 Separate `events-api` vs SSE inside `report-api`
**Chose:** separate service. **Why:** SSE connections are long-lived — each open browser holds a socket for minutes. Mixing that with a stateless REST service makes restarts noisy (drops user connections on every deploy) and inflates REST instance count for a write-light workload. Keeping the REST path stateless and scaling the stateful SSE layer independently is worth a second Node process.

### 3.3 Shared docker volume for artifacts vs S3/MinIO
**Chose:** shared volume for the prototype. **Why:** zero configuration, everyone can run it locally with one `docker-compose up`. For production this is the first thing to replace with S3 + presigned URLs — the worker's `renderers/*` already return a `publicUrl`, so the swap is local to the renderer.

### 3.4 Per-handler function vs three-layer DataSource + Renderer + Generator
**Chose:** flat handler per report type. **Why:** with two reports a three-layer abstraction is speculation — you don't yet know what DataSources look like (some pull from external APIs, some from Postgres, some from S3). Flat handlers keep the "how do I add a new report" path to a single file, and the common pieces (AMQP subscribe, DB status updates, artifact publish) already live in `index.ts`. If we hit 5+ reports and see real duplication, extract then.

### 3.5 Report-type catalog as API (`GET /report-types`) vs hardcoded enum in frontend
**Chose:** API. **Why:** the core bet of this platform is "one rubbing day to add a report." Forcing a frontend deploy just to make a new type visible breaks that promise. The frontend now discovers types at runtime — the `Dashboard` table is driven entirely by `reportTypeCatalog`. Trade-off: frontend loses compile-time knowledge of report types. Acceptable because the list is small and rendering is generic.

### 3.6 Single endpoint with discriminated union vs per-type endpoints
**Chose:** single `POST /reports` with a zod `discriminatedUnion` on `type`. **Why:** the client's mental model is "I want a report of type X with these params" — one endpoint matches that. Zod gives type-safe conditional validation (cosmofit requires `clientId`, clients-summary forbids it). The Fastify JSON-schema stays permissive (accept `clientId?`) because Ajv's `removeAdditional` interacts badly with `oneOf` — strict validation is in zod at the handler boundary, not in the transport schema.

### 3.7 SSE vs WebSocket vs long-polling
**Chose:** SSE. **Why:** the event stream is one-way (server → browser) and text-based (JSON events). SSE is a single HTTP GET with built-in auto-reconnect in the browser; no framing protocol, no separate libraries. WebSocket would be over-engineered for a read-only feed; long-polling adds request overhead for each event.

### 3.8 Zod at the worker's AMQP boundary
**Chose:** parse AMQP messages with zod before dispatch. **Why:** the broker is untyped — anything can arrive, and a malformed message should not crash a consumer mid-handler. A `discriminatedUnion` per report type mirrors the API's validation and gives each handler a fully-typed input.

---

## 4. What We Skipped and Why. What Is Needed for Production

**Skipped (with reason):**

- **AMQP reconnect / DLX / publisher confirms.** Prototype tolerates a Rabbit restart poorly. `TODO` marker in `Broker.ts`. Prod needs a reconnect loop + DLX so poison messages don't hot-loop a handler.
- **Idempotency on `POST /reports`.** A retry produces a second report. Fix with an `Idempotency-Key` header + unique constraint.
- **Auth.** No auth layer at all. Prod needs JWT at `report-api` edges and per-user scoping on SSE (`events-api` currently broadcasts to everyone).
- **Timeouts on `running` jobs.** A worker crash leaves a report stuck `running` forever. Prod needs a watchdog that flips stale runs to `failed`.
- **Backend tests.** Frontend has Vitest + MSW; backend is untested. Prod needs `testcontainers` for integration tests against real Postgres + Rabbit.
- **Two loggers.** Fastify uses pino, the rest uses winston. Should be unified.

**For production, add:**

- S3 + presigned URLs for artifacts (see 3.3).
- OpenTelemetry traces across `api → worker → events → browser` — the async hop is the hardest thing to debug without a correlation ID propagated end-to-end.
- Migrations via a real tool (`node-pg-migrate` / Prisma) instead of `init.sql`.
- CI/CD + health-gated rolling deploys.
- Rate limiting on `POST /reports` (cheap DoS vector — generation is CPU-heavy).
