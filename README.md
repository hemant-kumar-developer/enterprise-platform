# Enterprise Platform Prototype

This repository is a learning-oriented, local-first prototype for an enterprise-style architecture combining microfrontends, microservices, an API gateway, event-driven messaging, observability, and Docker-based infrastructure.

## What this prototype demonstrates

- Microfrontend composition with a shell host and remote MFEs
- A Node.js API gateway plus backend services
- Database-per-service and service-to-service communication
- JWT-based authentication with RBAC
- RabbitMQ-based event-driven workflows
- Redis-backed caching and resilience patterns
- Structured logging, tracing, metrics, and health endpoints
- Docker Compose for local orchestration

## Quick start

```bash
pnpm install
pnpm dev
```

This will start the shell and a few initial services locally.

### Local URLs

- Shell app: http://localhost:3100/
- Product MFE: http://localhost:3101/
- Cart MFE: http://localhost:3102/
- Gateway: http://localhost:18080/health
- Auth service: http://localhost:18081/health
- Product service: http://localhost:18082/health

