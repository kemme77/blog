# 2026-04-17 - Dependency audit cleanup

## Summary
Removed the local `vercel` package from project dependencies, reinstalled dependencies from a clean state, and re-ran security and build validation.

## Why
- `npm audit` issues were introduced through transitive `@vercel/*` packages.
- The project does not require `vercel` as a local runtime dependency.
- Using `npx vercel ...` remains available for CLI workflows when needed.

## Files changed
- `package.json`
- `package-lock.json`

## Validation
- `npm audit` reports `found 0 vulnerabilities`.
- `npm run build` succeeds after cleanup.