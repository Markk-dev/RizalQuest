import { databases, DATABASE_ID, COLLECTIONS, ID } from "@/lib/appwrite"
import bcrypt from "bcryptjs"

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10)
    
    const admin = await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.USERS,
      ID.unique(),
      {
        username: "Mark",
        password: hashedPassword,
        fullName: "Mark (Admin)",
        role: "admin",
        hearts: 5,
        xp: 0,
        lastHeartUpdate: new Date().toISOString()
      }
    )
    
    console.log("Admin user created successfully!")
    console.log("Username: Mark")
    console.log("Password: admin123")
    console.log("User ID:", admin.$id)
  } catch (error: any) {
    console.error("Error creating admin:", error.message)
  }
}

createAdmin()
