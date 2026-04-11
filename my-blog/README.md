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

## Database Setup (Prisma + MySQL)

The blog posts are now stored in MySQL via Prisma.

1. Start MySQL (from this project directory):

```bash
docker compose up -d
```

2. Ensure your local env file exists (`.env.local`):

```env
DATABASE_URL="mysql://<db-user>:<db-password>@localhost:3306/app-infrastructure"
MYSQL_ROOT_PASSWORD="<strong-root-password>"
MYSQL_PASSWORD="<strong-app-password>"
BLOG_ADMIN_USERNAME="<username>"
BLOG_ADMIN_PASSWORD_HASH="\$2b\$12\$..."
BLOG_ADMIN_SECRET="<long-random-secret>"
NEXTAUTH_URL="http://localhost:3000"
```

`docker compose up -d` reads the MySQL credentials from `.env.local`, so the password is no longer hardcoded in `docker-compose.yml`.

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

This app uses Next.js + Prisma + MySQL, so deployment needs a managed MySQL database (not local Docker MySQL).

1. Create a managed MySQL database (for example Neon, PlanetScale, Railway, Aiven, or cloud-hosted MySQL).
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
DATABASE_URL="mysql://<user>:<password>@<host>:<port>/<database>"
BLOG_ADMIN_USERNAME="<your-admin-username>"
BLOG_ADMIN_PASSWORD_HASH="<bcrypt-hash>"
BLOG_ADMIN_SECRET="<long-random-secret>"
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
