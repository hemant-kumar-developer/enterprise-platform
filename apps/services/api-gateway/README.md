# API Gateway

This service acts as the entry point for the platform. It demonstrates request routing, identity propagation, CORS handling, and a simple health surface for the local prototype.

## Why it exists

- Keeps frontend clients from directly depending on every internal service.
- Centralizes cross-cutting concerns like authentication checks, logging, and request normalization.
- Makes the system easier to learn because the request path is visible in one place.
