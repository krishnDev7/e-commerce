# E-Commerce Monorepo

Monorepo for the new e-commerce platform. Mirrors architecture & coding standards of hamari-ai-monorepo (NestJS + Prisma backend, Next.js frontend, shared packages) with improved aesthetic UI.

## Structure

```
apps/
  api/            # NestJS (Prisma) backend
  web/            # Next.js (app router) storefront UI
packages/
  api-client/     # Typed API client + React Query builders
  prisma/         # Prisma schema + migrations
  ui/             # Chakra UI theme + shared components
  typescript-config/
  tailwind-config/ (optional if using hybrid styling)
  shared/         # Shared domain models, DTOs, utilities
```

## Quick Start

Install dependencies: `npm install`

Dev (all): `npm run dev`

Add a new package or app under the respective folder and ensure its own package.json extends root TS config.

---

This repo is scaffolded; fill in business logic, migrations, and feature modules next.
