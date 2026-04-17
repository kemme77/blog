import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { defineConfig, env } from "prisma/config";

function loadDatabaseUrlFromLocalEnv(): void {
  if (process.env.DATABASE_URL) {
    return;
  }

  const envFiles = [resolve(process.cwd(), ".env.local"), resolve(process.cwd(), ".env")];

  for (const filePath of envFiles) {
    if (!existsSync(filePath)) {
      continue;
    }

    const content = readFileSync(filePath, "utf-8");
    const match = content.match(/^DATABASE_URL=(?:"([^"]*)"|'([^']*)'|([^\r\n#]*))/m);
    const value = match?.[1] ?? match?.[2] ?? match?.[3];

    if (value) {
      process.env.DATABASE_URL = value.trim();
      return;
    }
  }
}

loadDatabaseUrlFromLocalEnv();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
