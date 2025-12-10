import { NextResponse } from "next/server"
import { getServerDatabases } from "@/lib/appwrite-server"
import { DATABASE_ID, COLLECTIONS, Query } from "@/lib/appwrite"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Fetch all students
    const studentsResponse = await getServerDatabases().listDocuments(
      DATABASE_ID,
      COLLECTIONS.USERS,
      [Query.equal("role", "student"), Query.limit(100)]
    )
    
    const students = studentsResponse.documents
    
    // Fetch all progress
    const progressResponse = await getServerDatabases().listDocuments(
      DATABASE_ID,
      COLLECTIONS.USER_PROGRESS,
      [Query.limit(100)]
    )
    
    const allProgress = progressResponse.documents
    
    // Map students with their progress
    const studentsData = students.map((student: any) => {
      const progress = allProgress.find((p: any) => p.userId === student.$id)
      const completedLevels = progress?.completedLevels ? JSON.parse(progress.completedLevels) : []
      
      // Calculate overall progress (out of 40 total levels across 8 chapters)
      const totalLevels = 40
      const progressPercentage = Math.round((completedLevels.length / totalLevels) * 100)
      
      // Calculate streak (for now, use a placeholder - would need lastPlayedDate tracking)
      // TODO: Implement proper streak tracking with daily login records
      const streak = 0
      
      // Determine status based on last heart update (if within 2 days, active)
      const lastUpdate = student.lastHeartUpdate ? new Date(student.lastHeartUpdate) : null
      const twoDaysAgo = new Date()
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
      const isActive = lastUpdate && lastUpdate > twoDaysAgo
      
      return {
        id: student.$id,
        username: student.username,
        fullName: student.fullName || student.username,
        currentChapter: progress?.currentChapter || 1,
        progress: progressPercentage,
        xp: student.xp || 0,
        hearts: student.hearts || 0,
        streak,
        status: isActive ? "Active" : "Inactive",
        completedLevelsCount: completedLevels.length
      }
    })
    
    return NextResponse.json({ students: studentsData })
  } catch (error: any) {
    console.error("Students API error:", error)
    return NextResponse.json({ students: [] })
  }
}

export async function PATCH(request: Request) {
  try {
    const { studentId, username, fullName } = await request.json()
    
    if (!studentId || !username || !fullName) {
      return NextResponse.json({ error: "Student ID, username, and full name are required" }, { status: 400 })
    }

    // Check if username is already taken by another user
    const existingUsers = await getServerDatabases().listDocuments(
      DATABASE_ID,
      COLLECTIONS.USERS,
      [Query.equal("username", username)]
    )

    if (existingUsers.documents.length > 0 && existingUsers.documents[0].$id !== studentId) {
      return NextResponse.json({ error: "Username already taken" }, { status: 400 })
    }

    // Update the user
    await getServerDatabases().updateDocument(
      DATABASE_ID,
      COLLECTIONS.USERS,
      studentId,
      {
        username,
        fullName
      }
    )
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Update student error:", error)
    return NextResponse.json({ error: "Failed to update student" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { studentId } = await request.json()
    
    if (!studentId) {
      return NextResponse.json({ error: "Student ID required" }, { status: 400 })
    }
    
    // Delete user progress first
    const progressResponse = await getServerDatabases().listDocuments(
      DATABASE_ID,
      COLLECTIONS.USER_PROGRESS,
      [Query.equal("userId", studentId)]
    )
    
    for (const progress of progressResponse.documents) {
      await getServerDatabases().deleteDocument(DATABASE_ID, COLLECTIONS.USER_PROGRESS, progress.$id)
    }
    
    // Delete the user
    await getServerDatabases().deleteDocument(DATABASE_ID, COLLECTIONS.USERS, studentId)
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Delete student error:", error)
    return NextResponse.json({ error: "Failed to delete student" }, { status: 500 })
  }
}
