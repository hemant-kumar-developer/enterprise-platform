# ADR 001: Use Microfrontends

## Context

The frontend needs to demonstrate independent UI ownership and independent deployment boundaries.

## Decision

Use a shell host plus several independently runnable remote MFEs.

## Alternatives

- One large React app
- A monolithic portal coupled to all domains

## Trade-offs

- More deployment surface area
- Slightly more orchestration complexity

## Consequences

The prototype can illustrate independently evolving frontend teams and routes.
