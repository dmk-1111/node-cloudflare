import { Hono } from "hono"
import { cors } from "hono/cors"
import { getDB } from "./db"
import { sql } from "drizzle-orm";
import { employees } from "./schema"
const app = new Hono()

// MIDDLEWARE
app.use("*", cors());

app.get("/", (c) => {
  return c.text("API running 🚀")
})

app.get("/setup", async (c) => {
  try {
    const db = getDB(c.env)

    await db.run(sql`
        CREATE TABLE IF NOT EXISTS employees (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL
        )
      `)

    return c.text("Table created!")
  } catch (err) {
    return c.text(err.message, 500)
  }
})

app.get("/show-employees", async (c) => {
  try {
    const db = getDB(c.env)
    const data = await db.select().from(employees).all()
    return c.json(data)
  } catch (err) {
    return c.text(err.message, 500)
  }
})

app.get("/add-employees", async (c) => {
  try{
    const db = getDB(c.env)
  
    // const body = await c.req.json()
  
    const employee = await db.insert(employees)
      .values({ name: 'Roth Thida' })
      .returning()
      .get()
  
    return c.json(employee)
  } catch (err) {
    return c.text(err.message, 500)
  }
})

export default app