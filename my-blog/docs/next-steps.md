# Website Next Steps

## Current Status
- Production is deployed and the content/auth flows are working again.
- Database connectivity to Vercel is fixed.
- Login, logout, and post visibility have been validated in the live deployment.
- Temporary helper scripts for DB/admin sync were removed to keep the repo lean.

## Next Priorities
1. Verify the logout flow in a real browser session without a manual reload.
2. Add a small automated smoke test for auth state, login, logout, and protected routes.
3. Review the login and post-management UI for any remaining hydration or interaction edge cases.
4. Keep the new Vercel incident-response checklist aligned with the live deployment flow.
5. Decide whether post editing, draft handling, or richer search should be the next product improvement.

## Nice-To-Have Improvements
- Add an end-to-end test that covers sign-in, create post, delete post, and sign-out.
- Improve admin UX feedback for loading, success, and error states.
- Consider a short content-maintenance guide for adding or updating posts.

- Add some test (unit, integration, e2e, user acceptance)

## Suggested Order
1. Stabilize auth interaction.
2. Add automated checks.
3. Tidy documentation.
4. Work on product features.