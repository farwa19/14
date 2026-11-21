"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, addlike, addread } from "../services/notes"
import { getCurrentUser } from "../services/session"

export const likeBlog = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  if (!Number.isInteger(id) || id < 1) {
    throw new Error("Invalid blog ID")
  }

  await addlike(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}
export const addtoreadinglist  = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  if (!Number.isInteger(id) || id < 1) {
    throw new Error("Invalid blog ID")
  }

  await addread(formData)
  revalidatePath("/me")
}

export const createBlog = async (formData: FormData) => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }
  const title = String(formData.get("title") ?? "")
  const author = String(formData.get("author") ?? "")
  const url = String(formData.get("url") ?? "")
  const likes = Number(formData.get("likes"))
  

  if (
  title.trim().length < 5 ||
  author.trim().length < 5 ||
  url.trim().length < 5
) {
  return {
      error: "Title, author, and URL must be at least 5 characters long",
      success: false,
    }
  }
  

  if (!Number.isInteger(likes) || likes < 0) {
    throw new Error("Likes must be a non-negative integer")
  }

  await addBlog(title, author, url, likes)
  revalidatePath("/blogs")
  revalidatePath(`/users/${user.username}`)
  return { error: "", success: true }
  redirect("/blogs")
  
}
