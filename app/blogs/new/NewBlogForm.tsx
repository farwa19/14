"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBlog } from "../../actions/blogs"
import { useNotification } from "../../components/NotificationContext"

type FormState = {
  error: string
  success?: boolean
}

type UserOption = {
  id: number | string
  name: string
  username: string
}

export default function NewBlogForm({
  userId,
  users,
}: {
  userId: number | string | null
  users: UserOption[]
}) {
  const router = useRouter()
  const { showNotification } = useNotification()

  const [state, formAction] = useActionState(
    async (_previousState: FormState, formData: FormData) =>
      createBlog(formData),
    { error: "", success: false },
  )

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created successfully!")
      router.push("/blogs")
    }
  }, [state.success, showNotification, router])

  return (
      <div className="min-h-screen flex items-center justify-center">
     <div className="max-w-3xl w-full mx-auto p-10 border rounded-xl shadow-md space-y-10">
      <h2 className="text-2xl font-bold capitalize">
  Create New Blog
</h2>

      <form action={formAction} className="space-y-6">
        <div>
  <label className="block text-sm font-medium text-white-700">
    Title
    <input
      type="text"
      name="title"
      required
      minLength={5}
      className="block w-full p-3 mt-2 border border-gray-300 rounded-lg"
    />
  </label>
</div>

        <div>
          <label>
            Author
            <input type="text" name="author" required minLength={5} className="block w-full p-2.5 border rounded-lg" />
          </label>
        </div>

        <div>
          <label>
            URL
            <input type="url" name="url" required minLength={5} className="block w-full p-2.5 border rounded-lg"/>
          </label>
        </div>

        <div>
          <label>
            Likes
            <input
              type="number"
              name="likes"
              min="0"
              defaultValue="0"
              className="block w-full p-2.5 border rounded-lg"
            />
          </label>
        </div>

        <button
  type="submit"
  data-testid="create-blog-button"
  className="text-white bg-blue-600 border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none transition"
>
  Create
</button>

        {state.error && (
          <p style={{ color: "red" }}>{state.error}</p>
        )}
      </form>
    </div>
    </div>
  )
}