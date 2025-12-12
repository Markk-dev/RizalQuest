import { Client, Databases, ID, Query } from "appwrite"

// Create client with environment variable validation
function createClient() {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID

  if (!endpoint || !projectId) {
    throw new Error("Missing Appwrite environment variables. Please check your .env.local file.")
  }

  return new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
}

// Initialize client and databases
const client = createClient()
export const databases = new Databases(client)

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
