"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import { randomUUID } from "node:crypto"
import bcrypt from "bcryptjs"
import { db } from "../db"
import { users } from "../db/schema"
import { getCurrentUser } from "../services/session"

export const registerUser = async (
  prevState: { error: string },
  formData: FormData,
)=> {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
    const confirmPassword = formData.get("passwordConfirm") as string
if (username.trim().length < 4) {
  return { error: "Username must be at least 4 characters long"}
}

if (password.length < 4) {
  return { error: "Password must be at least 4 characters long"}
}

if (password !== confirmPassword) {
    
    return { error: "Passwords do not match"}

}
  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  redirect("/login")
}

export const generateApiToken = async () => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const token = randomUUID()

  await db
    .update(users)
    .set({ token })
    .where(eq(users.id, user.id))

  revalidatePath("/me")
}