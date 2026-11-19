import { eq, sql } from "drizzle-orm"
import { db } from "../db"
import { blogs } from "../db/schema"

export const getBlogById = (id: number) =>
  db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })

export const getBlogs = () => db.select().from(blogs)

export const addBlog = async (
  title: string,
  author: string,
  url: string,
  likes: number,
) => {
  const [blog] = await db
    .insert(blogs)
    .values({ title, author, url, likes })
    .returning()

  return blog
}

export const addlike = (id: number) =>
  db
    .update(blogs)
    .set({ likes: sql<number>`coalesce(${blogs.likes}, 0) + 1` })
    .where(eq(blogs.id, id))
