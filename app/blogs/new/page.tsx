
import { redirect } from "next/navigation"
import { connection } from "next/server"
import { Suspense } from "react"
import { getCurrentUser } from "../../services/session"
import NewBlogForm from "./NewBlogForm"

async function NewBlogContent() {
  await connection()
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  return <NewBlogForm userId={user.id} users={[]} />
}

export default function NewBlog() {
  return (
    <Suspense fallback={<p>Checking access...</p>}>
      <NewBlogContent />
    </Suspense>
  )
}
