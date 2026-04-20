# 2026-04-20 - Vercel incident response checklist

## Summary
Added a repo-specific Vercel incident response checklist and linked it from the deployment documentation.

## Why
- The repository stores deployment-time secrets in Vercel environment variables.
- The app relies on GitHub OAuth connections, auth secrets, and a PostgreSQL connection string that should be reviewed after any Vercel security bulletin.
- A concrete checklist is more actionable than generic security advice during an incident.

## Files changed
- `docs/vercel-incident-response-checklist.md`
- `README.md`

## Validation
- Documentation-only change.
- Checked the repo-specific auth and database secret flow before adding the checklist.