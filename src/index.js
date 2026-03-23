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

    // menus
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS menus(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        status INTEGER DEFAULT 1
      )
    `)

    // greetings
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS greetings(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        button_one TEXT,
        button_two TEXT
      )
    `)

    // medias
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS medias(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        url TEXT,
        icon TEXT,
        status INTEGER DEFAULT 1
      )
    `)

    // about
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS about(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT
      )
    `)

    // experience
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS experience(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        main_title TEXT,
        sub_title TEXT,
        status INTEGER DEFAULT 1
      )
    `)

    // skills
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS skills(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        status INTEGER DEFAULT 1
      )
    `)

    // achieves
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS achieves(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        image TEXT,
        status INTEGER DEFAULT 1
      )
    `)

    // footers
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS footers(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        copy_right TEXT,
        title TEXT
      )
    `)

    return c.text("All tables created successfully!")
  } catch (err) {
    return c.text(err.message, 500)
  }
});

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