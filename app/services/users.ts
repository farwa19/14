import { eq } from "drizzle-orm"
import { db } from "../db"
import { blogs, users } from "../db/schema"

export const getUsers = () => db.select().from(users)

export const getUserByUsername = (username: string) =>
  db.query.users.findFirst({
    where: eq(users.username, username),
  })

export const getUserById = (id: number) =>
  db.query.users.findFirst({
    where: eq(users.id, id),
  })

export const getBlogsByUserId = (userId: number) =>
  db.query.blogs.findMany({
    where: eq(blogs.userId, userId),
  })