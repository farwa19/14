"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, addlike } from "../services/notes"

export const likeBlog = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  if (!Number.isInteger(id) || id < 1) {
    throw new Error("Invalid blog ID")
  }

  await addlike(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}

export const createBlog = async (formData: FormData) => {
  const title = String(formData.get("title") ?? "")
  const author = String(formData.get("author") ?? "")
  const url = String(formData.get("url") ?? "")
  const likes = Number(formData.get("likes"))

  if (!title.trim() || !author.trim() || !url.trim()) {
    throw new Error("Title, author, and URL are required")
  }
  if (!Number.isInteger(likes) || likes < 0) {
    throw new Error("Likes must be a non-negative integer")
  }

  await addBlog(title, author, url, likes)
  revalidatePath("/blogs")
  redirect("/blogs")
}
