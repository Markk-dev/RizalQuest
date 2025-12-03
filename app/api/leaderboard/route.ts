export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = searchParams.get("limit") || "10"

  return Response.json({
    leaderboard: [
      { rank: 1, name: "Ana Reyes", xp: 2850, level: 6, streak: 21 },
      { rank: 2, name: "Juan Cruz", xp: 2100, level: 5, streak: 14 },
      { rank: 3, name: "Pedro Lopez", xp: 1800, level: 4, streak: 5 },
      { rank: 4, name: "Maria Santos", xp: 1200, level: 3, streak: 7 },
      { rank: 5, name: "Rosa Garcia", xp: 850, level: 2, streak: 0 },
    ].slice(0, Number.parseInt(limit)),
  })
}
