"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import QuestionRenderer from "@/components/student/question-renderer"
import QuizHeader from "@/components/student/quiz-header"
import { CHAPTERS } from "@/lib/constants"
import { getQuestionsForLevel } from "@/lib/questions"
import { syncHearts, syncXP, syncCompletedLevel, syncCurrentProgress, loadProgress } from "@/lib/progress-sync"
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
  const [xp, setXp] = useState(0)

  const chapter = CHAPTERS.find((c) => c.id === chapterId)
  const chapterData = storyline.chapters.find((c) => c.chapter === chapterId)

  useEffect(() => {
    // Check if user has access to this level
    const currentLevelData = JSON.parse(localStorage.getItem("currentLevel") || '{"chapter": 1, "level": 1}')
    const completedLevelsData = JSON.parse(localStorage.getItem("completedLevels") || "[]")
    
    // Check if trying to access a level beyond current progress
    const isCurrentLevel = currentLevelData.chapter === chapterId && currentLevelData.level === levelId
    const isPreviousLevel = completedLevelsData.includes(`${chapterId}-${levelId}`)
    const isAccessible = isCurrentLevel || isPreviousLevel
    
    // If trying to access a locked level, redirect back
    if (!isAccessible) {
      router.push("/student/learn")
      return
    }
    
    const levelQuestions = getQuestionsForLevel(chapterId, levelId)
    setQuestions(levelQuestions)
    
    // Load progress from database
    loadProgress().then((progress) => {
      if (progress) {
        // Load from database
        const user = JSON.parse(localStorage.getItem("user") || "{}")
        const userHearts = user.hearts ?? 5
        setHearts(userHearts)
        setXp(user.xp || 0)
        
        // Redirect if no hearts
        if (userHearts === 0) {
          router.push("/student/learn")
        }
      } else {
        // Fallback to localStorage
        const savedHearts = localStorage.getItem("hearts")
        if (savedHearts) {
          setHearts(Number(savedHearts))
        }
      }
    })

    // Listen for heart updates
    const handleHeartsUpdated = (event: any) => {
      setHearts(event.detail.hearts)
    }
    window.addEventListener("heartsUpdated", handleHeartsUpdated)

    // Listen for XP updates
    const handleXPUpdated = (event: any) => {
      setXp(event.detail.xp)
    }
    window.addEventListener("xpUpdated", handleXPUpdated)

    return () => {
      window.removeEventListener("heartsUpdated", handleHeartsUpdated)
      window.removeEventListener("xpUpdated", handleXPUpdated)
    }
  }, [chapterId, levelId])

  const handleAnswer = (selectedIndex: number) => {
    // Heart logic is handled in quiz-question component
    // Just track if answer is correct for any additional logic if needed
    const correct = selectedIndex === currentQuestion.correct
    setIsCorrect(correct)
  }

  const handleNext = async () => {
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

      // Sync completed level to database
      await syncCompletedLevel(levelKey).catch(console.error)

      // Check if this completes the platform (all 5 levels)
      const isLastLevel = levelId >= 5
      
      // Award XP only when completing all 5 levels (completing the platform)
      if (isLastLevel) {
        const user = JSON.parse(localStorage.getItem("user") || "{}")
        const newXP = (user.xp || 0) + 20 // 20 XP per platform (5 levels)
        user.xp = newXP
        localStorage.setItem("user", JSON.stringify(user))
        setXp(newXP)
        await syncXP(newXP).catch(console.error)
        
        // Dispatch event to update UI
        window.dispatchEvent(new CustomEvent("xpUpdated", { detail: { xp: newXP } }))
      }

      // Update current level to next

      const nextChapter = isLastLevel ? chapterId + 1 : chapterId
      const nextLevel = isLastLevel ? 1 : levelId + 1

      if (!isLastLevel || chapterId < 8) {
        localStorage.setItem(
          "currentLevel",
          JSON.stringify({ chapter: nextChapter, level: nextLevel })
        )
        
        // Sync current progress to database
        await syncCurrentProgress(
          nextChapter,
          nextLevel,
          [...completed]
        ).catch(console.error)
      }

      if (isLastLevel && chapterId >= 8) {
        // Completed all chapters!
        router.push("/student/learn")
      } else if (isLastLevel) {
        // Go to next chapter
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
