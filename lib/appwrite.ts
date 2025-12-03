import { Client, Databases, ID, Query } from "appwrite"

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)

export const databases = new Databases(client)

export const DATABASE_ID = "rizal-quest-db"
export const COLLECTIONS = {
  USERS: "users",
  USER_PROGRESS: "user_progress",
  QUESTS: "quests",
  USER_QUESTS: "user_quests",
  SHOP_ITEMS: "shop_items",
}

export { ID, Query }
