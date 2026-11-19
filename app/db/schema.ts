import { pgTable, serial, text, integer } from "drizzle-orm/pg-core"

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  author: text("author").notNull(),
  url: text("url").notNull(),
  title: text("title").notNull(),
  likes: integer("likes").default(1)

})