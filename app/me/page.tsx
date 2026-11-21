
import { generateApiToken } from "../actions/users"
import { getCurrentUser } from "../services/session"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { connection } from "next/server"
import { db } from "../db"
import { and, eq } from "drizzle-orm"
import { readingList } from "../db/schema"

export const instant = false

const markAsRead = async (formData: FormData) => {
  "use server"

  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const id = Number(formData.get("id"))

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid reading list ID")
  }

  await db
    .update(readingList)
    .set({ read: true })
    .where(
      and(
        eq(readingList.id, id),
        eq(readingList.userId, user.id),
      ),
    )

  revalidatePath("/me")
}

export default async function Me() {
  await connection()
  return MeContent()
}

async function MeContent() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const list = await db.query.readingList.findMany({
    where: eq(readingList.userId, user.id),
    with: {
      blog: true,
    },
  })

  const unreadBlogs = list.filter((item) => !item.read)
  const readBlogs = list.filter((item) => item.read)

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div
        data-testid="user-profile"
        className="max-w-2xl w-full p-8 border rounded-xl shadow-md"
      >
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>

        <p data-testid="user-name">{user.name}</p>
        <p data-testid="user-username">{user.username}</p>

        <h2
          data-testid="api-token-section"
          className="text-xl font-bold mt-6 mb-2"
        >
          Personal API token
        </h2>

        {user.token ? (
          <p data-testid="token-display" className="break-all">
            <code data-testid="api-token">{user.token}</code>
          </p>
        ) : (
          <p data-testid="no-token-message">No token has been generated yet.</p>
        )}

        <form action={generateApiToken}>
          <button
            type="submit"
            data-testid="generate-token-button"
            className="mt-4"
          >
            Generate new token
          </button>
        </form>

        <h2
          data-testid="reading-list-section"
          className="text-xl font-bold mt-8 mb-4"
        >
          My Reading List 📚
        </h2>

        {list.length === 0 && (
          <p data-testid="empty-reading-list">Your reading list is empty.</p>
        )}

        {/* Unread blogs */}
        <section data-testid="unread-section">
          <h3 className="text-lg font-semibold mt-6 mb-4">
            Unread Blogs ({unreadBlogs.length})
          </h3>

          {unreadBlogs.length === 0 ? (
            <p data-testid="no-unread-blogs">No unread blogs.</p>
          ) : (
            <ul className="space-y-4">
              {unreadBlogs.map((item) => (
              <li key={item.id} className="border rounded-lg p-4">
                <h4 className="font-semibold">
                  {item.blog.title}
                </h4>

                <p>Author: {item.blog.author}</p>

                <a
                  href={item.blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Visit blog
                </a>

                <form action={markAsRead}>
                  <input
                    type="hidden"
                    name="id"
                    value={item.id}
                  />

                  <button
                    type="submit"
                    data-testid={`mark-read-${item.id}`}
                    className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Mark as read ✓
                  </button>
                </form>
              </li>
              ))}
            </ul>
          )}
        </section>

        {/* Read blogs */}
        <h3 className="text-lg font-semibold mt-8 mb-4">
          Read Blogs ({readBlogs.length})
        </h3>

        {readBlogs.length === 0 ? (
          <p>No blogs read yet.</p>
        ) : (
          <ul className="space-y-4">
            {readBlogs.map((item) => (
              <li key={item.id} className="border rounded-lg p-4">
                <h4 className="font-semibold">
                  {item.blog.title}
                </h4>

                <p>Author: {item.blog.author}</p>

                <a
                  href={item.blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Visit blog
                </a>

                <p className="text-green-600 mt-2">
                  Read ✓
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
