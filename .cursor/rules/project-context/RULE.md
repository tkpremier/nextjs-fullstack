---
description: Docker Project context, set up with Docker compose files, database, TypeScript api application, TypeScript client application
globs: [**/*]
alwaysApply: true
---

## Architecture Overview

- **Database**: PostgreSQL 16 running in Docker container
- **Application**: Next.js 16 TypeScript application with React 19, Auth0 authentication, SCSS styling
- **Orchestration**: Docker Compose with custom bridge network (tk_net), base `docker-compose.yml` and environment-specific `docker-compose.[env].yml`

## Key Technologies

- **Application Stack**: TypeScript, Next.js 16, React 19, Auth0, SCSS, CKEditor 5
- **Database**: PostgreSQL 16 with persistent volumes
- **Build Tools**: Docker Compose, Next.js build system

## Development Guidelines

- Application uses Next.js App Router (app/ directory structure)
- Uses TypeScript with strict type checking
- Uses Auth0 for OAuth authorization/authentication
- Environment variables required for Auth0, database connections, API URLs, Next.js runtime variables, Docker container and images
- Database connection pooling handled via custom db services
- When creating new types, put all the types into the respective types folder, `src/types/**/*.ts`

## File Structure Notes

- Application logic should all reside inside `/src` folder
- API routes defined in `src/app/api/**/routes.ts`
- API middleware logic is located in `src/app/proxy.ts`, per https://nextjs.org/docs/app/getting-started/proxy
- All types are created and exported from `src/types/`
- Database migrations/queries in `src/_db/dev/`

## Docker Configuration

- Services communicate via `tk_net` bridge network
- Database health checks configured
- Volume mounts for database persistence (`./db-data`)
- Run `docker compose -f docker-compose.yml -f docker-compose.[env].yml up -d --build` to build and run env-specific container

## Package Management

- Use **yarn** as the package manager for both API and client applications
- Run `yarn install` to install dependencies
- Use `yarn add` and `yarn remove` for dependency management

## Command Line / Terminal Configuration

- Use **zsh** for all scripts
