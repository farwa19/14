import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { getBlogsByUserId, getUserByUsername } from "../../services/users"

const UserProfile = async ({
  params,
}: {
  params: Promise<{ username: string }>
}) => {
  const { username } = await params
  const user = await getUserByUsername(username)

  if (!user) {
    notFound()
  }

  const blogs = await getBlogsByUserId(user.id)

  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-5 bg-gray-50">
        <h2 className="text-2xl font-bold mb-3">{user.name}</h2>
        <p className="text-gray-600">
          <span className="font-semibold">Username:</span> {user.username}
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Blogs</h3>

        <ul className="space-y-3">
          {blogs.map((blog) => (
            <li
              key={blog.id}
              className="border rounded-lg p-4 shadow-sm hover:bg-gray-50 transition"
            >
              <Link
                href={`/blogs/${blog.id}`}
                className="text-blue-600 font-medium hover:underline"
              >
                {blog.title} by {blog.author} — Likes: {blog.likes}
              </Link>
            </li>
          ))}
        </ul>

        {blogs.length === 0 && (
          <p className="text-gray-500">This user has not created any blogs yet.</p>
        )}
      </div>
    </div>
  )
}

const UserPage = ({
  params,
}: {
  params: Promise<{ username: string }>
}) => (
  <div className="min-h-screen flex justify-center items-center p-6">
    <div className="max-w-2xl w-full p-8 border rounded-xl shadow-md">
      <Suspense fallback={<p className="text-center text-gray-500">Loading user...</p>}>
        <UserProfile params={params} />
      </Suspense>
    </div>
  </div>
)

export default UserPage