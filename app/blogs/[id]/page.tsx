
import { notFound } from "next/navigation"
import { getBlogById, getBlogs } from "../../services/notes"
import { likeBlog } from "../../actions/blogs"
import { Suspense } from "react"

export const generateStaticParams = async () =>
  (await getBlogs()).map((blog) => ({ id: String(blog.id) }))

const BlogDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>Author: {blog.author}</p>
      <p>
        URL: <a href={blog.url}>{blog.url}</a>
      </p>
      <p>Likes: {blog.likes}</p>

      <form action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">
          Like 👍 ({blog.likes})
        </button>
      </form>
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
