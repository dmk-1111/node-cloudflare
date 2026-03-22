import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
// DEFINE TABLE
export const employees = sqliteTable("employees", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull()
})