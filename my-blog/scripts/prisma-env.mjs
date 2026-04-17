import { spawn } from "node:child_process"
import { resolve } from "node:path"

import { getDatabaseUrl } from "./load-env.mjs"

const [, , envFileArg, ...prismaArgs] = process.argv

if (!envFileArg || prismaArgs.length === 0) {
  console.error("Usage: node scripts/prisma-env.mjs <env-file> <prisma args...>")
  process.exit(1)
}

const envFilePath = resolve(process.cwd(), envFileArg)
const databaseUrl = getDatabaseUrl(envFilePath)

const child = spawn(
  "npx",
  ["prisma", ...prismaArgs],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      DATABASE_URL: databaseUrl,
    },
  },
)

child.on("exit", (code) => {
  process.exit(code ?? 1)
})
