import { Hono } from "hono"
import { cors } from "hono/cors"
import { getDB } from "./db"
import { sql } from "drizzle-orm";
import { home } from "./views/home.js"
import { menu } from "./views/menu.js"

import { menus , greetings, medias, about, experience, skills, achieves, footers } from "./schema.js"
const app = new Hono()

// MIDDLEWARE
app.use("*", cors());

app.get("/", (c) => {
  return c.html(home)
});

app.get("/menu", (c) => {
  return c.html(menu)
});

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

app.get("/menu-list", async (c) => {
  try {
    const db = getDB(c.env);
    // get page and limit from query params
    const page = Number(c.req.query('page')) || 1;
    const limit = Number(c.req.query('limit')) || 5;
    const offset = (page - 1) * limit;

    // Example using your DB (pseudo-code)
    const total = await db.select({ count: sql`count(*)` }).from(menus).get();
    const data = await db.select().from(menus).limit(limit).offset(offset).all();
    const totalPages = Math.ceil(total.count / limit);
    return c.json({
        data,
        total,
        page,
        limit,
        totalPages
    });
  } catch (err) {
    return c.text(err.message, 500)
  }
})

app.post('/create-menu', async (c) => {
  try{
    const db = getDB(c.env);
    const body = await c.req.formData();

    const name = body.get('name');
    const status = body.get('status');
    await db.insert(menus).values({
      name,
      status: status === "1" ? 1 : 0
    })
    return c.redirect("/menu");
  }
  catch(err){
    return c.text(err.message, 500)
  }
})

app.get("/menu/find/:id", async (c) => {
  try{
    const db = getDB(c.env);
    const id = c.req.param("id");
    const data = await db.select().from(menus).where(sql`${menus.id} = ${id}`).get();
    return c.json(data);
  }catch(err){
    return c.text(err.message, 500)
  }
});

app.post("/menu/update/:id", async (c) => {
  try{
    const db = getDB(c.env);
    const id = c.req.param("id");
    const body = await c.req.formData();
    const name = body.get('name');
    const status = body.get('status');
    await db.update(menus).set({
      name,
      status: status === "1" ? 1 : 0
    }).where(sql`${menus.id} = ${id}`);
    return c.redirect("/menu");

  }catch(err){
    return c.text(err.message, 500)
  }

});

app.post("/menu/delete/:id", async (c) => {
  try{
    const db = getDB(c.env);
    const id = c.req.param("id");
    await db.delete(menus).where(sql`${menus.id} = ${ id }`);
    return c.redirect("/menu");
  }
  catch(err){
    return c.text(err.message, 500)
  } 
});


export default app