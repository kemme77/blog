# 2026-04-17 - Vercel login and data visibility fix

## Summary
Fixed missing Vercel environment variables for non-production environments, synchronized admin users in cloud databases, and copied production blog posts into the development cloud database.

## Why
- Login failed on Vercel because auth variables were incomplete outside production.
- Blog entries were missing in non-production cloud database views.
- The app should behave consistently across local, development, preview, and production.

## Actions
- Added/overrode `BLOG_ADMIN_USERNAME`, `BLOG_ADMIN_PASSWORD_HASH`, `BLOG_ADMIN_SECRET`, and `NEXTAUTH_URL` in Vercel Development/Preview.
- Verified `DATABASE_URL` exists in Production/Development/Preview.
- Synced admin user into Development and Production databases.
- Copied existing blog posts from Production database into Development database.

## Validation
- Development DB check: `posts=7`, `admins=1`, `users=1`.
- Production DB check: `posts=7`, `admins=1`, `users=1`.
- Vercel env listing shows required auth + database variables in Production, Development, and Preview.