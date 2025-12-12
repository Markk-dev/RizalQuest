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

        // Calculate accuracy based on XP and completed levels
        // Assuming max XP per level is 100, and 5 levels per chapter (8 chapters = 40 levels total)
        const maxPossibleXP = completedLevels.length * 100
        const accuracy =
          maxPossibleXP > 0 ? Math.round((student.xp / maxPossibleXP) * 100) : 0

        return {
          id: student.$id,
          username: student.username,
          fullName: student.fullName || student.username,
          xp: student.xp,
          completedLevels: completedLevels.length,
          currentChapter: progress?.currentChapter || 1,
          accuracy: Math.min(accuracy, 100), // Cap at 100%
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
