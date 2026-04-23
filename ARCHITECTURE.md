# Architecture — Table of Contents

---

## 1. Components, Data Flows, Boundaries

4 services + Postgres + RabbitMQ + a shared volume for artifacts.
Communication is asynchronous via the AMQP topic exchange `reports`. Status is pushed to the browser via SSE.

```
Browser ─POST /reports──▶ report-api ──AMQP──▶ report-worker ──AMQP──▶ events-api ─SSE─▶ Browser
                               │                     │
                             Postgres            /artifacts (volume)
```

---

## 2. How to Add a New Report

1. Add the literal to `reportTypes.ts` (in both services).
2. Add the renderer (if it is a new format).
3. Add the handler in `handlers/handler<Name>Report.ts`.
4. Add a `case` to the `switch` in `worker/index.ts`.

---

## 3. Decisions and Alternatives

- **RabbitMQ** (topic exchange) vs BullMQ/Redis vs a cron table
- **Separate `events-api`** vs SSE directly inside `report-api`
- **Shared docker volume** for artifacts vs S3/MinIO
- **Flat per-report handler** vs a three-layer DataSource + Renderer + Generator design
- **SSE** vs WebSocket vs long-polling
- **Zod** validation at the worker's entry (AMQP is a weakly typed boundary)

---

## 4. What We Skipped and Why. What Is Needed for Production

- No AMQP reconnect / DLX / publisher confirms — TODO in `Broker.ts`.
- No idempotency on `POST /reports`, no auth, no timeouts for `running` jobs.
- No backend tests, no e2e.
- Logging uses pino and winston in parallel.

For production: S3 + presigned URLs, OpenTelemetry, JWT + per-user SSE, migrations via a dedicated tool, CI/CD, `testcontainers` for e2e.
