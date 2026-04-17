import { resolve } from "node:path"

import { PrismaClient } from "@prisma/client"

import { readEnvFile } from "./load-env.mjs"

const [, , envFileArg] = process.argv

if (!envFileArg) {
  console.error("Usage: node scripts/admin-sync.mjs <env-file>")
  process.exit(1)
}

const envFilePath = resolve(process.cwd(), envFileArg)
const env = readEnvFile(envFilePath)

const databaseUrl = env.DATABASE_URL
const username = env.BLOG_ADMIN_USERNAME?.trim()
const passwordHash = env.BLOG_ADMIN_PASSWORD_HASH?.trim().replace(/\\\$/g, "$")

if (!databaseUrl) {
  throw new Error(`DATABASE_URL is missing in ${envFileArg}`)
}

if (!username) {
  throw new Error(`BLOG_ADMIN_USERNAME is missing in ${envFileArg}`)
}

if (!passwordHash) {
  throw new Error(`BLOG_ADMIN_PASSWORD_HASH is missing in ${envFileArg}`)
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
})

try {
  const user = await prisma.user.upsert({
    where: { username },
    update: {
      role: "ADMIN",
      passwordHash,
    },
    create: {
      username,
      role: "ADMIN",
      passwordHash,
    },
  })

  console.log(JSON.stringify({
    envFile: envFileArg,
    synced: true,
    userId: user.id,
    username: user.username,
    role: user.role,
  }))
} catch (error) {
  console.log(JSON.stringify({
    envFile: envFileArg,
    synced: false,
    error: error instanceof Error ? error.message : String(error),
  }))
  process.exitCode = 1
} finally {
  await prisma.$disconnect()
}
