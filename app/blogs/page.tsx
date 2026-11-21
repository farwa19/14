import { getBlogs } from "../services/notes"
import Link from "next/link"

export const instant = false

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams
  const blogs = await getBlogs()

  const filteredBlogs = filter
    ? blogs.filter((blog) =>
        blog.title.toLowerCase().includes(filter.toLowerCase()),
      )
    : blogs

  const sortedBlogs = [...filteredBlogs].sort(
    (a, b) => (b.likes ?? 0) - (a.likes ?? 0),
  )

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      <form className="mb-4 flex gap-2">
        <input
          name="filter"
          type="text"
          aria-label="Filter blogs"
          data-testid="filter-input"
          className="flex-1 p-2 border rounded"
          placeholder="Filter by title"
        />
        <button
          type="submit"
          data-testid="search-button"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Search
        </button>
      </form>

      <ul className="space-y-2" data-testid="blogs-list">
        {sortedBlogs.map((blog) => (
          <li key={blog.id} className="border rounded p-3 hover:bg-gray-50">
            <Link
              href={`/blogs/${blog.id}`}
              className="text-blue-600 hover:underline"
            >
              {blog.title} by {blog.author} — {blog.likes ?? 0} likes
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs