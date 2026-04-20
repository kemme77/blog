# Vercel Incident Response Checklist

Use this checklist if Vercel publishes a security bulletin, contacts you about possible exposure, or you suspect a secret may have been accessed.

## 1. Triage

1. Review the Vercel activity log for the team and affected project.
2. Inspect recent deployments for anything unexpected.
3. Check whether you were contacted by Vercel and whether the project is in scope.

## 2. Rotate secrets

Rotate these values first if they are stored in Vercel or connected services:

- `DATABASE_URL`
- `BLOG_ADMIN_USERNAME`
- `BLOG_ADMIN_PASSWORD_HASH`
- `BLOG_ADMIN_SECRET`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

Then rotate any provider or integration tokens that may have been exposed:

- GitHub OAuth app credentials
- Database password or connection string
- Any third-party API keys stored as environment variables

## 3. Verify the app state

1. Recheck the last successful deployment.
2. Review build logs for accidental secret output.
3. Confirm GitHub secret scanning is enabled.
4. Review connected OAuth apps and revoke anything you do not actively use.
5. Ensure Vercel Deployment Protection is set to Standard or stricter.
6. Rotate any Deployment Protection bypass tokens if you use them.

## 4. Restore confidence

1. Redeploy with the rotated values.
2. Test login, logout, and the protected admin routes.
3. Confirm database reads and writes still work after the rotations.
4. Record what was rotated and when, so the next response is faster.

## 5. Follow-up

- Keep secrets out of logs and out of the repository.
- Prefer least-privilege tokens for future integrations.
- Revisit this checklist after any major deployment-platform change.