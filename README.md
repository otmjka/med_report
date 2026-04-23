# Report Platform

Report platform prototype.

## Run

Requirements: Docker + Docker Compose.

```bash
cd infra
docker-compose -f docker-compose.dev.yml up --build
```

Use `-d` to run in the background.

This starts PostgreSQL, RabbitMQ, and all backend services. The frontend (`clinic-web-app`) is not part of the compose file and runs separately — see below.

## Verify

```bash
# container status (all should be healthy)
docker ps --filter "name=medcontrol"

# report-api health
curl localhost:3001/health
# → {"status":"ok"}

# events-api health
curl localhost:3002/health
# → {"status":"ok"}

# RabbitMQ management UI
open http://localhost:15672   # login: medcontrol / medcontrol
```

## Stop

```bash
cd infra
docker-compose -f docker-compose.dev.yml down
```

Add `-v` to also drop the `postgres`, `rabbitmq`, and `artifacts` volumes (full reset).

## Services

### Infrastructure

| Service    | Port          | Description                              |
| ---------- | ------------- | ---------------------------------------- |
| `postgres` | 5432          | PostgreSQL 16 (user/db: `medcontrol`)    |
| `rabbitmq` | 5672 / 15672  | AMQP broker + management UI on 15672     |

### Backend

| Service         | Port | Description                                   |
| --------------- | ---- | --------------------------------------------- |
| `report-api`    | 3001 | Fastify REST API — report CRUD, artifacts     |
| `events-api`    | 3002 | Fastify SSE service — streams AMQP events     |
| `report-worker` | —    | Consumes AMQP jobs, generates PDF/XLSX reports |

## Frontend (`clinic-web-app`)

The web app runs outside Docker:

```bash
cd apps/clinic-web-app
npm install
npm run dev
```

Vite dev server starts on the port it prints (default 5173). It expects `report-api` on `:3001` and `events-api` on `:3002`.

## Local development (without Docker)

Any backend service can be run directly (requires Postgres + RabbitMQ to be available):

```bash
cd apps/report-api   # or events-api / report-worker
npm install
npm run dev
```
