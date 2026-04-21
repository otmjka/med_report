# Report Platform

Report platform prototype.

## Run

Requirements: Docker + Docker Compose.

```bash
cd infra
docker-compose up --build
```

Use `-d` to run in the background.

## Verify

```bash
# container status (all should be healthy)
docker ps --filter "name=medcontrol"

# API health endpoint
curl localhost:3001/health
# → {"status":"ok"}
```

## Stop

```bash
cd infra
docker-compose down
```

## Services

| Service      | Port | Description                      |
| ------------ | ---- | -------------------------------- |
| `report-api` | 3001 | Fastify API for the platform     |
| `worker`     | —    | Demo worker (echo + healthcheck) |

## Local development (without Docker)

```bash
cd apps/report-api
npm install
npm run dev
```
