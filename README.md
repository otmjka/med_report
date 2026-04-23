# Report Platform

Report platform prototype.

## Run

Requirements: Docker + Docker Compose.

```bash
docker-compose -f infra/docker-compose.local.yml up --build
```

Open http://localhost:5173.

Stop: `Ctrl+C`, or `docker-compose -f infra/docker-compose.local.yml down`.
Full reset (drops volumes): add `-v` to `down`.

## Services

| Service         | URL / Port              | Description                    |
| --------------- | ----------------------- | ------------------------------ |
| clinic-web-app  | http://localhost:5173           | React frontend                 |
| report-api      | http://localhost:3001 (`/docs`) | REST API + Swagger UI          |
| events-api      | http://localhost:3002           | SSE events (`/health`)         |
| report-worker   | —                       | PDF/XLSX generator             |
| postgres        | 5432                    | `medcontrol` / `medcontrol`    |
| rabbitmq        | 5672, UI on 15672       | `medcontrol` / `medcontrol`    |
