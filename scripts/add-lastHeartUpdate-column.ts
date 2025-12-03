/**
 * Migration script to add lastHeartUpdate column to users table
 * 
 * Run this script once to add the column to your Appwrite database
 * 
 * Steps to add the column manually in Appwrite Console:
 * 1. Go to your Appwrite Console
 * 2. Navigate to Databases > rizal-quest-db > users table
 * 3. Click "Add Attribute"
 * 4. Select "DateTime" type
 * 5. Set Key: lastHeartUpdate
 * 6. Make it NOT required (optional)
 * 7. Set default value to current datetime or leave empty
 * 8. Click "Create"
 * 
 * After adding the column, you can delete this file.
 */

import { databases, DATABASE_ID, COLLECTIONS } from "@/lib/appwrite"

async function addLastHeartUpdateColumn() {
  console.log("⚠️  This script is for reference only.")
  console.log("Please add the 'lastHeartUpdate' column manually in Appwrite Console:")
  console.log("")
  console.log("1. Go to Appwrite Console")
  console.log("2. Navigate to: Databases > rizal-quest-db > users")
  console.log("3. Click 'Add Attribute'")
  console.log("4. Select type: DateTime")
  console.log("5. Key: lastHeartUpdate")
  console.log("6. Required: No (optional)")
  console.log("7. Click 'Create'")
  console.log("")
  console.log("After adding, you can optionally update existing users:")
  console.log("Run: node scripts/update-existing-users.ts")
}

addLastHeartUpdateColumn()
