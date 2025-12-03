"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import QuestionRenderer from "@/components/student/question-renderer"
import QuizHeader from "@/components/student/quiz-header"
import { CHAPTERS } from "@/lib/constants"
import { getQuestionsForLevel } from "@/lib/questions"
import storyline from "@/storyline.json"

export default function LessonPage() {
  const router = useRouter()
  const params = useParams()
  const chapterId = Number(params.chapterId)
  const levelId = Number(params.levelId)

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isCorrect, setIsCorrect] = useState(false)
  const [questions, setQuestions] = useState<any[]>([])
  const [hearts, setHearts] = useState(5)

  const chapter = CHAPTERS.find((c) => c.id === chapterId)
  const chapterData = storyline.chapters.find((c) => c.chapter === chapterId)

  useEffect(() => {
    const levelQuestions = getQuestionsForLevel(chapterId, levelId)
    setQuestions(levelQuestions)
    
    // Load hearts from localStorage
    const savedHearts = localStorage.getItem("hearts")
    if (savedHearts) {
      setHearts(Number(savedHearts))
    }
  }, [chapterId, levelId])

  const handleAnswer = (selectedIndex: number) => {
    const correct = selectedIndex === currentQuestion.correct
    setIsCorrect(correct)
    
    // Decrease heart if wrong answer
    if (!correct) {
      const newHearts = Math.max(0, hearts - 1)
      setHearts(newHearts)
      localStorage.setItem("hearts", String(newHearts))
      
      // If no hearts left, redirect to chapter grid
      if (newHearts === 0) {
        setTimeout(() => {
          router.push("/student/learn")
        }, 2000)
      }
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      // Next question in this level
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Level completed! Save progress
      const levelKey = `${chapterId}-${levelId}`
      const saved = localStorage.getItem("completedLevels")
      const completed = saved ? new Set(JSON.parse(saved)) : new Set()
      completed.add(levelKey)
      localStorage.setItem("completedLevels", JSON.stringify([...completed]))

      // Update current level to next
      const isLastLevel = levelId >= 6

      if (!isLastLevel) {
        localStorage.setItem(
          "currentLevel",
          JSON.stringify({ chapter: chapterId, level: levelId + 1 })
        )
      }

      if (isLastLevel) {
        // Go back to chapter grid
        router.push("/student/learn")
      } else {
        // Go to next level
        router.push(`/student/learn/${chapterId}/${levelId + 1}`)
      }
    }
  }

  if (!chapter || !chapterData || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray">Loading...</p>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-white">
      {/* Quiz Header with Hearts and Progress */}
      <QuizHeader hearts={hearts} progress={progress} />

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4">
        <QuestionRenderer question={currentQuestion} onAnswer={handleAnswer} onNext={handleNext} />
      </div>
    </div>
  )
}
