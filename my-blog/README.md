This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Setup (Prisma + PostgreSQL)

The blog posts are now stored in PostgreSQL via Prisma.

1. Start PostgreSQL (from this project directory):

```bash
docker compose up -d
```

2. Ensure your local env file exists (`.env.local`):

```env
DATABASE_URL="postgresql://<db-user>:<db-password>@localhost:5433/app-infrastructure"
POSTGRES_DB="app-infrastructure"
POSTGRES_USER="<db-user>"
POSTGRES_PASSWORD="<db-password>"
BLOG_ADMIN_USERNAME="<username>"
BLOG_ADMIN_PASSWORD_HASH="\$2b\$12\$..."
BLOG_ADMIN_SECRET="<long-random-secret>"
NEXTAUTH_URL="http://localhost:3000"
```

`docker compose up -d` reads the PostgreSQL credentials from `.env.local`, so the password is no longer hardcoded in `docker-compose.yml`.

The local PostgreSQL container listens on host port `5433` to avoid conflicts with any existing Postgres installation on `5432`.

3. Generate Prisma client and sync schema:

```bash
npm run prisma:generate
npm run prisma:push
```

4. Start the app:

```bash
npm run dev
```

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

This app uses Next.js + Prisma + PostgreSQL, so deployment needs a managed PostgreSQL database.

### Security checklist for Vercel incidents

If Vercel publishes a security bulletin or contacts you about possible exposure, use the dedicated checklist in [docs/vercel-incident-response-checklist.md](docs/vercel-incident-response-checklist.md).

The most important values to review immediately are:

- `DATABASE_URL`
- `BLOG_ADMIN_USERNAME`
- `BLOG_ADMIN_PASSWORD_HASH`
- `BLOG_ADMIN_SECRET`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

Also verify that Vercel Deployment Protection is set to Standard or stricter.

### Regular deployment steps

1. Create a managed PostgreSQL database (for example Neon, Vercel Postgres, Railway, Aiven, or Supabase).
2. Run schema migration against that production database:

```bash
npm run prisma:generate
npx prisma db push
```

3. Push your repository to GitHub.
4. In Vercel, create a new project and select this repository.
5. Set **Root Directory** to `my-blog`.
6. In **Settings -> Environment Variables**, add:

```env
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>?sslmode=require"
BLOG_ADMIN_USERNAME="<your-admin-username>"
BLOG_ADMIN_PASSWORD_HASH="<bcrypt-hash>"
BLOG_ADMIN_SECRET="<long-random-secret>"
NEXTAUTH_SECRET="<long-random-secret>"
NEXTAUTH_URL="https://<your-vercel-domain>"
```

7. Keep the default build command (`npm run build`) and deploy.

If you want CLI deployment:

```bash
cd my-blog
npm i -g vercel
vercel
vercel --prod
```

Notes:
- `DATABASE_URL` is required at build time because Prisma config reads it.
- Keep `NEXTAUTH_URL` aligned with your final Vercel domain.
- Use a real bcrypt hash for `BLOG_ADMIN_PASSWORD_HASH`.
- For the easiest free Vercel setup, Neon is the best fit.

