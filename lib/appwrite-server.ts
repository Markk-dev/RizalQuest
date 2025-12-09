import { Client, Databases, ID, Query } from "node-appwrite"

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.NEXT_PUBLIC_APPWRITE_API!) // API key for server-side operations

export const serverDatabases = new Databases(client)

export const DATABASE_ID = "rizal-quest-db"
export const COLLECTIONS = {
  USERS: "users",
  USER_PROGRESS: "user_progress",
  QUESTS: "quests",
  USER_QUESTS: "user_quests",
  SHOP_ITEMS: "shop_items",
  QUESTIONS: "questions",
}

export { ID, Query }
