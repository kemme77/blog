import { resolve } from "node:path"

import { PrismaClient } from "@prisma/client"

import { getDatabaseUrl } from "./load-env.mjs"

const [, , envFileArg] = process.argv

if (!envFileArg) {
  console.error("Usage: node scripts/db-status.mjs <env-file>")
  process.exit(1)
}

const envFilePath = resolve(process.cwd(), envFileArg)
const databaseUrl = getDatabaseUrl(envFilePath)
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
})

try {
  const [posts, admins, users] = await Promise.all([
    prisma.blogPost.count(),
    prisma.user.count({ where: { role: "ADMIN" } }),
    prisma.user.count(),
  ])

  console.log(JSON.stringify({
    envFile: envFileArg,
    connected: true,
    posts,
    admins,
    users,
  }))
} catch (error) {
  console.log(JSON.stringify({
    envFile: envFileArg,
    connected: false,
    error: error instanceof Error ? error.message : String(error),
  }))
  process.exitCode = 1
} finally {
  await prisma.$disconnect()
}
