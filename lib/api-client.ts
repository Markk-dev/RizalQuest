// API Client utilities
export async function fetchStudents() {
  const res = await fetch("/api/students")
  return res.json()
}

export async function fetchProgress(studentId: string) {
  const res = await fetch(`/api/progress?studentId=${studentId}`)
  return res.json()
}

export async function fetchQuestion(chapterId: string, levelId: string) {
  const res = await fetch(`/api/questions?chapterId=${chapterId}&levelId=${levelId}`)
  return res.json()
}

export async function fetchStats(studentId: string) {
  const res = await fetch(`/api/stats?studentId=${studentId}`)
  return res.json()
}

export async function fetchLeaderboard(limit = 10) {
  const res = await fetch(`/api/leaderboard?limit=${limit}`)
  return res.json()
}

export async function saveProgress(data: any) {
  const res = await fetch("/api/progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return res.json()
}
