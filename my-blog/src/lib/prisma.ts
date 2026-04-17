import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function resolveDatabaseUrl(): string | undefined {
  const primary = process.env.DATABASE_URL?.trim()
  const vercelPrisma = process.env.DB_POSTGRES_PRISMA_URL?.trim()
  const vercelDatabase = process.env.DB_DATABASE_URL?.trim()

  // In hosted runtimes, avoid accidental fallback to local development URLs.
  if (primary && (!primary.includes("localhost") || !process.env.VERCEL)) {
    return primary
  }

  return vercelPrisma || vercelDatabase || primary
}

const resolvedDatabaseUrl = resolveDatabaseUrl()

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error"],
    ...(resolvedDatabaseUrl
      ? {
          datasources: {
            db: {
              url: resolvedDatabaseUrl,
            },
          },
        }
      : {}),
  })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
