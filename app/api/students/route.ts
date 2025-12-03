export async function GET() {
  return Response.json({
    students: [
      { id: 1, name: "Maria Santos", email: "maria@school.com", level: 3, xp: 1200 },
      { id: 2, name: "Juan Cruz", email: "juan@school.com", level: 5, xp: 2100 },
    ],
  })
}
