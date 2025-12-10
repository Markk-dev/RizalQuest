import { Client, Databases, ID, Query } from "node-appwrite"

let _serverDatabases: Databases | null = null

// Lazy initialization to avoid build-time issues
export function getServerDatabases(): Databases {
  if (!_serverDatabases) {
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
    const apiKey = process.env.NEXT_PUBLIC_APPWRITE_API
    
    if (!endpoint || !projectId || !apiKey) {
      throw new Error("Missing Appwrite environment variables")
    }
    
    const client = new Client()
      .setEndpoint(endpoint)
      .setProject(projectId)
      .setKey(apiKey)
    
    _serverDatabases = new Databases(client)
  }
  
  return _serverDatabases
}

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
