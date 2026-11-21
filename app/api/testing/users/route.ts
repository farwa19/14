import { NextResponse } from "next/server"
import { db } from "../../../db"
import { users } from "../../../db/schema"
import { hash } from "bcryptjs"

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }

  try {
    const body = await request.json()

    const { username, name, password } = body

    if (!username || !name || !password) {
      return NextResponse.json(
        { error: "Username, name and password are required" },
        { status: 400 },
      )
    }

    // Hash password
    const passwordHash = await hash(password, 10)

    // Insert user directly into database
    const [user] = await db
      .insert(users)
      .values({
        username,
        name,
        passwordHash,
      })
      .returning({
        id: users.id,
        username: users.username,
        name: users.name,
      })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error("CREATE TEST USER ERROR:", error)

    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}