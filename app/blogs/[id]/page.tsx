import { notFound } from "next/navigation"
import { Suspense } from "react"
import { getBlogById } from "../../services/notes"
import { likeBlog, addtoreadinglist } from "../../actions/blogs"
import { getCurrentUser } from "../../services/session"

const BlogDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))
  const currentUser = await getCurrentUser()

  if (!blog) {
    notFound()
  }

  const isAuthor = blog.userId === currentUser?.id

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        data-testid="blog-detail"
        className="max-w-2xl mx-auto p-6 border rounded-lg shadow-sm space-y-4"
      >
        <h2 data-testid="blog-title" className="text-2xl font-bold capitalize">
          {blog.title}
        </h2>

        <p data-testid="blog-author">
          <span className="font-semibold">Author:</span> {blog.author}
        </p>

        <p>
          <span className="font-semibold">URL:</span>{" "}
          <a
            href={blog.url}
            className="text-blue-600 hover:underline"
          >
            {blog.url}
          </a>
        </p>

        <p>
          <span className="font-semibold">Likes:</span> {blog.likes}
        </p>

        <form action={likeBlog}>
          <input type="hidden" name="id" value={blog.id} />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Like 👍 ({blog.likes})
          </button>
        </form>

        {!isAuthor && (
          <form action={addtoreadinglist}>
            <input type="hidden" name="id" value={blog.id} />

            <button
              type="submit"
              data-testid="add-to-reading-list-button"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add to reading list 📚
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

const BlogPage = ({
  params,
}: {
  params: Promise<{ id: string }>
}) => (
  <div>
    <Suspense fallback={<p>Loading blog...</p>}>
      <BlogDetails params={params} />
    </Suspense>
  </div>
)

export default BlogPage