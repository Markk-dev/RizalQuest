import { NextResponse } from "next/server"
import { getServerDatabases } from "@/lib/appwrite-server"
import { DATABASE_ID, COLLECTIONS, ID } from "@/lib/appwrite"
import bcrypt from "bcryptjs"

export async function POST() {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10)
    
    const admin = await getServerDatabases().createDocument(
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
    
    return NextResponse.json({
      success: true,
      message: "Admin user created successfully!",
      username: "Mark",
      userId: admin.$id
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
