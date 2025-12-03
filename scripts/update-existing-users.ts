/**
 * Script to update existing users with lastHeartUpdate timestamp
 * Run this AFTER adding the lastHeartUpdate column to the database
 */

import { databases, DATABASE_ID, COLLECTIONS } from "../lib/appwrite"

async function updateExistingUsers() {
  try {
    console.log("Fetching all users...")
    
    const users = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.USERS
    )

    console.log(`Found ${users.documents.length} users`)

    const now = new Date().toISOString()

    for (const user of users.documents) {
      if (!user.lastHeartUpdate) {
        console.log(`Updating user: ${user.username}`)
        
        await databases.updateDocument(
          DATABASE_ID,
          COLLECTIONS.USERS,
          user.$id,
          { lastHeartUpdate: now }
        )
      }
    }

    console.log("✅ All users updated successfully!")
  } catch (error: any) {
    console.error("❌ Error updating users:", error.message)
  }
}

updateExistingUsers()
