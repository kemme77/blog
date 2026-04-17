import { existsSync, readFileSync } from "node:fs"

function stripQuotes(value) {
  const trimmed = value.trim()
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }
  return trimmed
}

export function readEnvFile(envFilePath) {
  if (!existsSync(envFilePath)) {
    throw new Error(`Env file not found: ${envFilePath}`)
  }

  const content = readFileSync(envFilePath, "utf8")
  const env = {}

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim()

    if (!line || line.startsWith("#")) {
      continue
    }

    const separatorIndex = line.indexOf("=")
    if (separatorIndex === -1) {
      continue
    }

    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1)
    env[key] = stripQuotes(value)
  }

  return env
}

export function getDatabaseUrl(envFilePath) {
  const env = readEnvFile(envFilePath)
  const databaseUrl = env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error(`DATABASE_URL is missing in ${envFilePath}`)
  }

  return databaseUrl
}
