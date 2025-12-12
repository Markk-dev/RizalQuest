import { NextResponse } from "next/server"
import { databases, DATABASE_ID, COLLECTIONS, Query } from "@/lib/appwrite"

export async function GET() {
  try {
    // Fetch all students
    const students = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.USERS,
      [Query.equal("role", "student"), Query.limit(100)]
    )

    // Calculate performance for each student
    const studentsWithPerformance = await Promise.all(
      students.documents.map(async (student) => {
        // Get user progress
        const progressDocs = await databases.listDocuments(
          DATABASE_ID,
          COLLECTIONS.USER_PROGRESS,
          [Query.equal("userId", student.$id)]
        )

        const progress = progressDocs.documents[0]
        const completedLevels = progress?.completedLevels
          ? JSON.parse(progress.completedLevels)
          : []

        // Calculate progress percentage based on completed levels
        // Total levels: 8 chapters × 5 levels = 40 levels
        const TOTAL_LEVELS = 40
        const progressPercentage = Math.round((completedLevels.length / TOTAL_LEVELS) * 100)

        return {
          id: student.$id,
          username: student.username,
          fullName: student.fullName || student.username,
          xp: student.xp,
          completedLevels: completedLevels.length,
          currentChapter: progress?.currentChapter || 1,
          accuracy: Math.min(progressPercentage, 100), // Cap at 100%
        }
      })
    )

    // Sort by accuracy (performance) and get top 5
    const topStudents = studentsWithPerformance
      .sort((a, b) => {
        // Primary sort by accuracy
        if (b.accuracy !== a.accuracy) {
          return b.accuracy - a.accuracy
        }
        // Secondary sort by XP if accuracy is the same
        return b.xp - a.xp
      })
      .slice(0, 5)

    return NextResponse.json({ topStudents })
  } catch (error: any) {
    console.error("Error fetching top students:", error)
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    )
  }
}
