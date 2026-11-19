import { defineConfig } from "drizzle-kit"

import * as dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

const databaseUrl =
  process.env.DATABASE_URL ?? process.env.DATABASE_URL_UNPOOLED

if (!databaseUrl) {
  throw new Error("Set DATABASE_URL_UNPOOLED or DATABASE_URL in .env.local")
}

export default defineConfig({
  schema: "./app/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
})