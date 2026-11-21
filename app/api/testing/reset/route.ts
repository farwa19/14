
import { NextResponse } from "next/server"
import { db } from "../../../db"
import { sql } from "drizzle-orm"

export async function DELETE() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }

  try {
    await db.execute(
      sql`TRUNCATE TABLE ${sql.identifier("reading_list")}, ${sql.identifier("blogs")}, ${sql.identifier("users")} RESTART IDENTITY CASCADE`,
    )

    return NextResponse.json(
      { message: "Database reset successful" },
      { status: 200 },
    )
  } catch (error) {
    console.error("RESET DATABASE ERROR:", error)

    return NextResponse.json({ error: "Failed to reset database" }, { status: 500 })
  }
}
