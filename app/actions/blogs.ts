"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog,addlike } from "../services/notes"
export const likeBlog = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  addlike(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}
export const createBlog = async (formData: FormData) => {
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string
  const likes = parseInt(formData.get("likes") as string)
  const important = formData.get("important") === "on"
  addBlog(title, author, url, likes, important)
    revalidatePath("/blogs")
    
  redirect("/blogs")
}