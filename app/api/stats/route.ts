export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const studentId = searchParams.get("studentId")

  return Response.json({
    studentId,
    stats: {
      totalPlays: 24,
      successRate: 85,
      currentStreak: 7,
      totalXP: 2450,
      averageTime: "3m 45s",
      chaptersCompleted: 2,
      performanceByChapter: [
        { chapter: 1, accuracy: 92, attempts: 4 },
        { chapter: 2, accuracy: 88, attempts: 6 },
        { chapter: 3, accuracy: 78, attempts: 3 },
      ],
    },
  })
}
