import { drizzle } from "drizzle-orm/d1"
// DEFINE CONNECTION
export const getDB = (env) => {
  return drizzle(env.DB)
}