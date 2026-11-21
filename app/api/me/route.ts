import { NextResponse } from "next/server"
import { db } from "../../db"
import { users } from "../../db/schema"
import { eq } from "drizzle-orm"
import { getCurrentUser } from "../../services/session"
import { getBlogsByUserId, getUserByUsername } from "../../services/users"
export async function GET(request: Request) {
 
  const authorization = request.headers.get("Authorization")


  if (!authorization || !authorization.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  
  const token = authorization.slice(7)

 
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.token, token))
    .limit(1)

 
  if (!user) {
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    )
  }
  const gfgffg = await getBlogsByUserId(user.id)


  return NextResponse.json({
    id: user.id,
    username: user.username,
    name: user.name,
    createdblogs: gfgffg  
  })
}