# 2026-04-20 - Search Removal and UX Refinements

## What changed

### 1. Project Audit & Dependency Cleanup
- Ran full health audit (lint, build, npm audit, dependency checks).
- Removed unused dependency: `@neondatabase/serverless`.

### 2. Search Feature & Content Bootstrap Removal
- Removed search feature entirely (routes, components, revalidation, sitemap entry).
- Removed JSON seed content bootstrap from database initialization.
- Deleted obsolete files: `src/app/search/page.tsx`, `src/lib/search-index.ts`, `src/content/posts/*.json`.

### 3. Metadata Base URL Centralization
- Created `src/lib/site-url.ts` for shared URL resolution (environment-based fallback).
- Added `metadataBase` to root layout metadata.
- Refactored `robots.ts` and `sitemap.ts` to use centralized resolver.

### 4. Loading UI Flash Prevention
- Updated `src/app/loading.tsx` with 220ms visibility delay.
- Prevents visual "flash" on fast navigations.

### 5. Post Edit Improvements
- **Slug Redirect Fix**: `updatePost()` now returns final slug after title changes, preventing stale slug lookups.
- **Success Feedback**: Post edit action redirects with `?updated=1` query flag; page conditionally shows success message.
- **Auto-Hide with URL Cleanup**: New `PostEditSuccessNotice` component auto-hides after 5 seconds and removes query parameter from URL to prevent re-appearance on reload.

## Why it changed
- Keep surface minimal: remove unused features and dependencies.
- Centralize configuration to reduce duplication and drift.
- Improve UX: prevent unnecessary UI flashing and provide clear user feedback on actions.
- Fix bugs: handle slug changes during post edits correctly and deterministically.

## Files touched
- **Removed**: `src/app/search/page.tsx`, `src/lib/search-index.ts`, `src/content/posts/*.json`
- **Added**: `src/lib/site-url.ts`, `src/components/PostEditSuccessNotice.tsx`
- **Modified**:
  - `src/components/Header.tsx` (removed search form)
  - `src/app/create/page.tsx` (removed revalidatePath calls for search)
  - `src/app/blog/[slug]/page.tsx` (slug handling, success feedback rendering)
  - `src/app/api/posts/delete/route.ts` (removed search revalidation)
  - `src/app/sitemap.ts` (removed search, use shared URL resolver)
  - `src/app/robots.ts` (use shared URL resolver)
  - `src/app/layout.tsx` (add metadataBase, use shared URL resolver)
  - `src/app/loading.tsx` (add visibility delay)
  - `src/lib/blog-posts.ts` (remove bootstrap, updatePost returns slug)
  - `package.json`, `package-lock.json` (dependency cleanup)

## Validation performed
- `npm run lint` → all checks passed
- `npm run build` → full production build successful
- `npm audit --audit-level=moderate` → 0 vulnerabilities
- Confirmed `/search` route no longer exists in build output
- Post edit flow tested with slug changes
- Loading UI flash prevention verified

## Notes
- `npx depcheck` produces false positives for Tailwind-related packages (CSS imports + PostCSS config usage).
- Major upgrades available (Prisma, tooling packages) should be handled in dedicated upgrade pass.
