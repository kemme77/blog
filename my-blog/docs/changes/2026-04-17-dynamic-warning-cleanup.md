# 2026-04-17 - Dynamic warning cleanup

## Summary
Removed the remaining Next.js build warnings by moving the header session check to the client and marking auth-dependent pages as dynamic.

## Why
- The previous header implementation used server-side session resolution on every page.
- Several auth-aware routes were still being treated as static candidates during the build.
- The repository now keeps a written trail for each follow-up change set.

## Files changed
- `src/components/Header.tsx`
- `src/components/auth-provider.tsx`
- `src/app/layout.tsx`
- `src/app/create/page.tsx`
- `src/app/login/page.tsx`
- `src/app/career/page.tsx`
- `src/app/hobbies/page.tsx`
- `src/app/travel/page.tsx`
- `src/app/blog/[slug]/page.tsx`

## Validation
- `npm run build` now completes without the previous dynamic server usage warnings.