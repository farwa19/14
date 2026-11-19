import { getBlogs } from "../services/notes"
import Link from "next/link"
import { Suspense } from "react"

const BlogsList = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams

  const blogs = getBlogs()

  const filteredBlogs = filter
    ? blogs.filter(blog =>
        blog.title.toLowerCase().includes(filter.toLowerCase())
      )
    : blogs

  const sortedBlogs = [...filteredBlogs].sort(
    (a, b) => b.likes - a.likes
  )

  return (
    <ul>
      {sortedBlogs.map(blog => (
        <li key={blog.id}>
          <Link href={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author} — Likes: {blog.likes}
          </Link>
        </li>
      ))}
    </ul>
  )
}

const Blogs = ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => (
  <div>
    <h2>Blogs</h2>
    <Suspense fallback={<p>Loading blogs...</p>}>
      <BlogsList searchParams={searchParams} />
    </Suspense>
  </div>
)

export default Blogs
