import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
// DEFINE TABLE
export const menus = sqliteTable("menus", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  status: integer("status").default(1)
});

export const greetings = sqliteTable("greetings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title"),
  button_one: text("button_one"),
  button_two: text("button_two")
});

export const medias = sqliteTable("medias", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  url: text("url"),
  icon: text("icon"),
  status: integer("status").default(1)
});

export const about = sqliteTable("about", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title"),
  content: text("content")
});

export const experience = sqliteTable("experience", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  main_title: text("main_title"),
  sub_title: text("sub_title"),
  status: integer("status").default(1)
});

export const skills = sqliteTable("skills", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  status: integer("status").default(1)
});

export const achieves = sqliteTable("achieves", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  image: text("image"),
  status: integer("status").default(1)
});

export const footers = sqliteTable("footers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  copy_right: text("copy_right"),
  title: text("title")
});