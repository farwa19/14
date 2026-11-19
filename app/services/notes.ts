const blogs = [
  {
    id: 1,
    author: "Dan Abramov",
    title: "Understanding React Server Components",
    url: "https://react.dev",
    likes: 15
  
  },
  {
    id: 2,
    author: "Lee Robinson",
    title: "Getting Started with Next.js",
    url: "https://nextjs.org",
    likes: 20
    
  },
  {
    id: 3,
    author: "Vercel",
    title: "Static and Dynamic Rendering in Next.js",
    url: "https://nextjs.org/docs",
    likes: 10
   
  },
];
export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id)
}

let nextId = 4

export const getBlogs = () => {
  return blogs
}

export const addBlog = (title: string, author: string, url: string, likes: number, important: boolean) => {
  blogs.push({ id: nextId++, title, author, url, likes })
}
export const addlike  = (id:number) => {
  const note = blogs.find((blog) => blog.id === id)
  if (note) {
    note.likes+=1
  }
}