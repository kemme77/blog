# 2026-04-17 - PostgreSQL migration

## Summary
Migrated the blog to PostgreSQL to make deployment simpler and more compatible with Vercel-friendly managed databases.

## Why
- PostgreSQL is a better fit for Prisma + Vercel.
- It allows a free managed path through Neon or Vercel Postgres.
- It keeps local and production environments aligned on the same database engine.

## Files changed
- `prisma/schema.prisma`
- `docker-compose.yml`
- `.env.local`
- `.env.example`
- `README.md`

## Infra changes
- Changed Prisma datasource provider from `mysql` to `postgresql`.
- Replaced the local database container with PostgreSQL in Docker Compose.
- Removed phpMyAdmin from the local stack.
- Updated local and example env files to use PostgreSQL connection settings.
- Added a small Prisma config fallback so `DATABASE_URL` is loaded from `.env.local` during local builds when it is not already present in the process environment.

## Documentation changes
- Rewrote the setup instructions in the README for PostgreSQL.
- Rewrote the deployment section to recommend managed PostgreSQL providers such as Neon and Vercel Postgres.
- Added a docs convention file for future changes.

## Validation
- `npm run build` will be re-run after the migration update.
