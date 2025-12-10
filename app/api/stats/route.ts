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
    
    // Calculate stats
    const totalStudents = students.length
    const totalXP = students.reduce((sum, s: any) => sum + (s.xp || 0), 0)
    const avgXP = totalStudents > 0 ? Math.round(totalXP / totalStudents) : 0
    const totalHearts = students.reduce((sum, s: any) => sum + (s.hearts || 0), 0)
    const avgHearts = totalStudents > 0 ? (totalHearts / totalStudents).toFixed(1) : 0
    
    // Calculate total levels completed
    let totalLevelsCompleted = 0
    allProgress.forEach((p: any) => {
      if (p.completedLevels) {
        const levels = JSON.parse(p.completedLevels)
        totalLevelsCompleted += levels.length
      }
    })
    
    // Top students by XP
    const topStudents = students
      .sort((a: any, b: any) => (b.xp || 0) - (a.xp || 0))
      .slice(0, 10)
      .map((s: any) => ({
        username: s.username,
        xp: s.xp || 0
      }))
    
    // Chapter completion rate
    const chapterCompletion = []
    for (let ch = 1; ch <= 8; ch++) {
      let completedCount = 0
      allProgress.forEach((p: any) => {
        if (p.completedLevels) {
          const levels = JSON.parse(p.completedLevels)
          const chapterLevels = levels.filter((l: string) => l.startsWith(`${ch}-`))
          if (chapterLevels.length === 5) completedCount++
        }
      })
      const completion = totalStudents > 0 ? Math.round((completedCount / totalStudents) * 100) : 0
      chapterCompletion.push({ chapter: ch, completion })
    }
    
    // Learning curve (avg XP by chapter progress)
    const learningCurve = []
    for (let ch = 1; ch <= 8; ch++) {
      const studentsAtChapter = allProgress.filter((p: any) => p.currentChapter >= ch)
      if (studentsAtChapter.length > 0) {
        const avgXPAtChapter = studentsAtChapter.reduce((sum: number, p: any) => {
          const student = students.find((s: any) => s.$id === p.userId)
          return sum + (student?.xp || 0)
        }, 0) / studentsAtChapter.length
        learningCurve.push({ chapter: `Ch${ch}`, avgXP: Math.round(avgXPAtChapter) })
      }
    }
    
    // All students with details
    const allStudents = students.map((s: any) => {
      const progress = allProgress.find((p: any) => p.userId === s.$id)
      const completedLevels = progress?.completedLevels ? JSON.parse(progress.completedLevels) : []
      return {
        username: s.username,
        xp: s.xp || 0,
        hearts: s.hearts || 0,
        currentChapter: progress?.currentChapter || 1,
        currentLevel: progress?.currentLevel || 1,
        completedLevelsCount: completedLevels.length
      }
    }).sort((a, b) => b.xp - a.xp)
    
    return NextResponse.json({
      totalStudents,
      avgXP,
      totalLevelsCompleted,
      avgHearts,
      topStudents,
      chapterCompletion,
      learningCurve,
      allStudents
    })
  } catch (error: any) {
    console.error("Stats error:", error)
    return NextResponse.json({
      totalStudents: 0,
      avgXP: 0,
      totalLevelsCompleted: 0,
      avgHearts: 0,
      topStudents: [],
      chapterCompletion: [],
      learningCurve: [],
      allStudents: []
    })
  }
}
