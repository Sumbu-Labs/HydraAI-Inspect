# Infrastructure

This folder stores Dockerfiles, Compose stacks, and stub Kubernetes manifests.

## Compose
- `docker-compose.dev.yml` spins up backend, frontend, AI service, and Hydra node for local development.
- `docker-compose.prod.yml` is a minimal example for deploying production-ready images.

## Dockerfiles
Located under `infra/docker/` and structured to plug into CI builds.
