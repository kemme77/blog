# 2026-04-17 - PostgreSQL cleanup and documentation polish

## Summary
Cleaned up the remaining MySQL wording, normalized the local PostgreSQL setup, and added a dedicated documentation trail for the migration.

## Why
- Keep the repository language consistent after the database migration.
- Avoid outdated MySQL references in user-facing documentation.
- Make future changes easier to trace with one note per change set.

## Files changed
- `docker-compose.yml`
- `.env.local`
- `.env.example`
- `README.md`
- `docs/changes/2026-04-17-postgres-migration.md`
- `docs/changes/README.md`

## Validation
- Local PostgreSQL container starts on host port `5433`.
- Prisma schema sync succeeds against the local PostgreSQL instance.
- Production build still succeeds.