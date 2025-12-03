/**
 * Script to update existing users with lastHeartUpdate timestamp
 * Run this AFTER adding the lastHeartUpdate column to the database
 */

import { Client, Databases } from "node-appwrite"

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "")
  .setKey(process.env.APPWRITE_API_KEY || "")

const databases = new Databases(client)
const DATABASE_ID = "rizal-quest-db"
const USERS_COLLECTION = "users"

async function updateExistingUsers() {
  try {
    console.log("Fetching all users...")
    
    const users = await databases.listDocuments(
      DATABASE_ID,
      USERS_COLLECTION
    )

    console.log(`Found ${users.documents.length} users`)

    const now = new Date().toISOString()

    for (const user of users.documents) {
      if (!user.lastHeartUpdate) {
        console.log(`Updating user: ${user.username}`)
        
        await databases.updateDocument(
          DATABASE_ID,
          USERS_COLLECTION,
          user.$id,
          { lastHeartUpdate: now }
        )
      }
    }

    console.log("✅ All users updated successfully!")
  } catch (error) {
    console.error("❌ Error updating users:", error.message)
  }
}

updateExistingUsers()
