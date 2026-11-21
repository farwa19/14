
import { redirect } from "next/navigation"
import { connection } from "next/server"
import { getCurrentUser } from "../../services/session"
import NewBlogForm from "./NewBlogForm"

export const instant = false

async function NewBlogContent() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  return <NewBlogForm userId={user.id} users={[]} />
}

export default async function NewBlog() {
  await connection()
  return NewBlogContent()
}
