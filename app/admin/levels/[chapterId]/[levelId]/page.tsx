"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ArrowLeft, Save} from "lucide-react"
import { CHAPTERS } from "@/lib/constants"
import { getQuestionsForLevel } from "@/lib/questions"

export default function EditLevelPage() {
  const params = useParams()
  const router = useRouter()
  const chapterId = parseInt(params.chapterId as string)
  const levelId = parseInt(params.levelId as string)
  
  const chapter = CHAPTERS.find(c => c.id === chapterId)
  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load questions from question bank
    const levelQuestions = getQuestionsForLevel(chapterId, levelId)
    setQuestions(levelQuestions || [])
    setLoading(false)
  }, [chapterId, levelId])

  const handleSave = async () => {
    // TODO: Implement save to database
    alert("Save functionality will be implemented with database integration")
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.push("/admin/levels")}
          className="flex items-center gap-2 text-gray hover:text-black mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Levels
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-black mb-2">
              {chapter?.title} - Level {levelId}
            </h1>
            <p className="text-gray">Edit questions for this level</p>
          </div>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-6 py-3 rounded-xl border-2 border-green-600 border-b-4 border-b-green-700 font-semibold hover:bg-green-600 transition-all active:border-b-2 flex items-center gap-2"
          >
            <Save size={20} />
            Save Changes
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((question, index) => (
          <div key={index} className="bg-white rounded-2xl border-2 border-b-4 border-gray-300 p-4">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold text-black">Question {index + 1}</h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm font-semibold border-2 border-blue-200">
                {question.type}
              </span>
            </div>

            <div className="space-y-3">
              {/* Question Text */}
              <div>
                <label className="block text-xs font-semibold text-black mb-1">Question</label>
                <textarea
                  value={question.question}
                  onChange={(e) => {
                    const newQuestions = [...questions]
                    newQuestions[index].question = e.target.value
                    setQuestions(newQuestions)
                  }}
                  className="w-full px-3 py-2 border-2 border-b-4 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none transition-all text-sm"
                  rows={2}
                />
              </div>

              {/* Type-specific fields */}
              {question.type === "multiple-choice" && (
                <div>
                  <label className="block text-xs font-semibold text-black mb-1">Options</label>
                  {question.options?.map((option: string, optIndex: number) => (
                    <div key={optIndex} className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newQuestions = [...questions]
                          newQuestions[index].options[optIndex] = e.target.value
                          setQuestions(newQuestions)
                        }}
                        className="flex-1 px-3 py-2 border-2 border-b-4 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none transition-all text-sm"
                      />
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold border-2 border-b-4 ${
                        question.correct === optIndex 
                          ? "bg-green-50 text-green-600 border-green-500 border-b-green-600" 
                          : "bg-gray-100 text-gray-400 border-gray-300"
                      }`}>
                        {question.correct === optIndex ? "✓" : ""}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {question.type === "typing" && (
                <div>
                  <label className="block text-xs font-semibold text-black mb-1">Correct Answer</label>
                  <input
                    type="text"
                    value={question.correctAnswer}
                    onChange={(e) => {
                      const newQuestions = [...questions]
                      newQuestions[index].correctAnswer = e.target.value
                      setQuestions(newQuestions)
                    }}
                    className="w-full px-3 py-2 border-2 border-b-4 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none transition-all text-sm"
                  />
                  {question.acceptedAnswers && (
                    <div className="mt-2">
                      <label className="block text-xs text-gray-600 mb-1">Accepted Answers (comma-separated)</label>
                      <input
                        type="text"
                        value={question.acceptedAnswers.join(", ")}
                        onChange={(e) => {
                          const newQuestions = [...questions]
                          newQuestions[index].acceptedAnswers = e.target.value.split(",").map(a => a.trim())
                          setQuestions(newQuestions)
                        }}
                        className="w-full px-3 py-2 border-2 border-b-4 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none text-xs transition-all"
                      />
                    </div>
                  )}
                </div>
              )}

              {question.type === "fill-in-blanks" && (
                <div>
                  <label className="block text-xs font-semibold text-black mb-1">Correct Answers</label>
                  <p className="text-xs text-gray-600 mb-1">For multiple accepted answers, separate with commas</p>
                  <input
                    type="text"
                    value={Array.isArray(question.blanks[0]) ? question.blanks[0].join(", ") : question.blanks[0]}
                    onChange={(e) => {
                      const newQuestions = [...questions]
                      const answers = e.target.value.split(",").map(a => a.trim())
                      newQuestions[index].blanks = [answers]
                      setQuestions(newQuestions)
                    }}
                    className="w-full px-3 py-2 border-2 border-b-4 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none transition-all text-sm"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
