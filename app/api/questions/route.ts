export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const chapterId = searchParams.get("chapterId")
  const levelId = searchParams.get("levelId")

  const questions = {
    "1-1": { question: "In what year was José Rizal born?", options: ["1861", "1863", "1865"], correct: 0 },
    "1-2": { question: "Where was Rizal born?", options: ["Calamba, Laguna", "Manila", "Cavite"], correct: 0 },
  }

  const key = `${chapterId}-${levelId}`
  const question = questions[key as keyof typeof questions]

  if (!question) {
    return Response.json({ error: "Question not found" }, { status: 404 })
  }

  return Response.json(question)
}
