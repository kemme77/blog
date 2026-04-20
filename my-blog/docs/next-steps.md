# Website Next Steps

## Current Status
- Production is deployed and the content/auth flows are working again.
- Database connectivity to Vercel is fixed.
- Login, logout, and post visibility have been validated in the live deployment.
- Temporary helper scripts for DB/admin sync were removed to keep the repo lean.
- Search is currently removed from the app and route map.
- Root metadata, sitemap, and robots URL handling is centralized.

## Next Priorities
1. Verify the logout flow in a real browser session without a manual reload.
2. Add a small automated smoke test for auth state, login, logout, and protected routes.
3. Harden auth security: move rate limiting to a persistent store and use proper client IP extraction from headers.
4. Run a secrets and credentials audit to ensure no sensitive values exist in docs, examples, or source files.
5. Re-check protection on admin routes and post update/delete actions.
6. Decide product direction for search: keep it removed for now or reintroduce it specifically for blog posts.
7. Decide language direction: keep English-only for now or plan i18n with optional German (de).

## Nice-To-Have Improvements
- Add an end-to-end test that covers sign-in, create post, delete post, and sign-out.
- Improve admin UX feedback for loading, success, and error states.
- Consider a short content-maintenance guide for adding or updating posts.
- Add broader tests over time (unit, integration, e2e, user acceptance) after smoke tests are stable.
- If i18n is selected, define locale strategy (`/en`, `/de`, default locale, and content ownership).

## Suggested Order
1. Stabilize auth interaction.
2. Complete Phase-1 security hardening.
3. Add automated checks.
4. Finalize product decisions (search + language).
5. Work on content and UX features.