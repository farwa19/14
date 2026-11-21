import { eq, sql } from "drizzle-orm"
import { db } from "../db"
import { blogs,readingList } from "../db/schema"
import { getCurrentUser } from "./session"
export const getBlogById = (id: number) =>
  db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })


export const addread = async (formData: FormData) => {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not logged in")
  }

  const blogid = Number(formData.get("id"))

  if (!blogid) {
    throw new Error("Invalid blog ID")
  }

  await db.insert(readingList).values({
    userId: user.id,
    blogId: blogid,
  })
  .onConflictDoNothing()
}
 

export const getBlogs = () => db.select().from(blogs)

export const addBlog = async (
  title: string,
  author: string,
  url: string,
  likes: number,
) => {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not logged in")
  }

  const [blog] = await db
    .insert(blogs)
    .values({
      title,
      author,
      url,
      likes,
      userId: user.id,
    })
    .returning()

  await db.insert(readingList).values({
    userId: user.id,
    blogId: blog.id,
  })

  return blog
}

export const addlike = (id: number) =>
  db
    .update(blogs)
    .set({ likes: sql<number>`coalesce(${blogs.likes}, 0) + 1` })
    .where(eq(blogs.id, id))
