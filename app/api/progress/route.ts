export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const studentId = searchParams.get("studentId")

  return Response.json({
    studentId,
    chapters: [
      { chapterId: 1, progress: 100, completed: true },
      { chapterId: 2, progress: 65, completed: false },
      { chapterId: 3, progress: 0, completed: false },
    ],
    totalXP: 1200,
    streak: 7,
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  return Response.json({
    success: true,
    message: "Progress saved",
    data: body,
  })
}
