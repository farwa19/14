
import { getBlogs} from "../../services/notes"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "../../auth"
import { addBlog } from "../../services/notes"
import { revalidatePath } from "next/cache"

export const POST = async (req: NextRequest) => {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
 const { title, url, author, likes } = body

if (!title || title.length < 5) {
  return NextResponse.json(
    { error: "Title must be at least 5 characters" },
    { status: 400 },
  )
}

if (!author || author.length < 5) {
  return NextResponse.json(
    { error: "Author must be at least 5 characters" },
    { status: 400 },
  )
}

if (!url) {
  return NextResponse.json(
    { error: "URL is required" },
    { status: 400 },
  )
}

  await addBlog(title,url,author,likes)
  revalidatePath("/blogs")
  return NextResponse.json({ success: true }, { status: 201 })
}
export const GET = async () => {
  const notes = await getBlogs()
  return NextResponse.json(notes)
}