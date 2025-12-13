"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import QuestionRenderer from "@/components/student/question-renderer"
import QuizHeader from "@/components/student/quiz-header"
import ChapterCompleteModal from "@/components/student/chapter-complete-modal"
import { CHAPTERS } from "@/lib/constants"
import { getQuestionsForLevel } from "@/lib/questions"
import { getQuestionsForChapterLevel } from "@/lib/question-service"
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
  const [levelStartTime] = useState(Date.now())
  const [showChapterComplete, setShowChapterComplete] = useState(false)
  const [completedChapterInfo, setCompletedChapterInfo] = useState({ number: 1, title: "" })

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
    
    // Use local question bank (database questions are outdated)
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
      const completed = saved ? new Set<string>(JSON.parse(saved)) : new Set<string>()
      
      // Check if this is the first time completing this level
      const isFirstTimeCompletion = !completed.has(levelKey)
      console.log(`📊 Level ${levelKey} - First time: ${isFirstTimeCompletion}`)
      
      completed.add(levelKey)
      localStorage.setItem("completedLevels", JSON.stringify([...completed]))

      // Track daily quest progress
      const today = new Date().toDateString()
      const savedDate = localStorage.getItem("completedLevelsTodayDate")
      
      if (savedDate !== today) {
        // New day, reset counter
        localStorage.setItem("completedLevelsToday", "1")
        localStorage.setItem("completedLevelsTodayDate", today)
      } else {
        // Same day, increment counter
        const todayCount = parseInt(localStorage.getItem("completedLevelsToday") || "0")
        localStorage.setItem("completedLevelsToday", String(todayCount + 1))
      }

      // Sync completed level to database
      await syncCompletedLevel(levelKey).catch(console.error)

      // Check if this completes the platform (all 5 levels)
      const isLastLevel = levelId >= 5
      
      // Award XP for completing level (first time only)
      if (isFirstTimeCompletion) {
        console.log("🎉 First time completion! Awarding XP...")
        const user = JSON.parse(localStorage.getItem("user") || "{}")
        // Levels 1-4 = 10 XP each, Level 5 (crown) = 60 XP
        const xpReward = isLastLevel ? 60 : 10
        const newXP = (user.xp || 0) + xpReward
        console.log(`💰 XP: ${user.xp || 0} + ${xpReward} = ${newXP}`)
        user.xp = newXP
        localStorage.setItem("user", JSON.stringify(user))
        setXp(newXP)
        await syncXP(newXP).catch(console.error)
        
        // Track daily XP
        const today = new Date().toDateString()
        const dailyXpData = JSON.parse(localStorage.getItem("dailyXP") || '{"date": "", "xp": 0}')
        if (dailyXpData.date === today) {
          dailyXpData.xp += xpReward
        } else {
          dailyXpData.date = today
          dailyXpData.xp = xpReward
        }
        localStorage.setItem("dailyXP", JSON.stringify(dailyXpData))
        
        // Dispatch event to update UI
        window.dispatchEvent(new CustomEvent("xpUpdated", { detail: { xp: newXP } }))
      }
      
      // Track daily levels completed
      if (isFirstTimeCompletion) {
        const today = new Date().toDateString()
        const dailyLevelsData = JSON.parse(localStorage.getItem("dailyLevels") || '{"date": "", "count": 0}')
        if (dailyLevelsData.date === today) {
          dailyLevelsData.count += 1
        } else {
          dailyLevelsData.date = today
          dailyLevelsData.count = 1
        }
        localStorage.setItem("dailyLevels", JSON.stringify(dailyLevelsData))
      }
      
      // Track perfect level (no hearts lost) - works on ANY level, even replays
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      const currentHearts = user.hearts ?? 5
      if (currentHearts === hearts) {
        // No hearts lost during this level
        const today = new Date().toDateString()
        const dailyPerfectData = JSON.parse(localStorage.getItem("dailyPerfect") || '{"date": "", "count": 0}')
        if (dailyPerfectData.date === today) {
          dailyPerfectData.count += 1
        } else {
          dailyPerfectData.date = today
          dailyPerfectData.count = 1
        }
        localStorage.setItem("dailyPerfect", JSON.stringify(dailyPerfectData))
      }
      
      // Track chapter completion (all 5 levels) - works on ANY chapter, even replays
      if (isLastLevel) {
        const today = new Date().toDateString()
        const dailyChapterData = JSON.parse(localStorage.getItem("dailyChapter") || '{"date": "", "count": 0}')
        if (dailyChapterData.date === today) {
          dailyChapterData.count += 1
        } else {
          dailyChapterData.date = today
          dailyChapterData.count = 1
        }
        localStorage.setItem("dailyChapter", JSON.stringify(dailyChapterData))
      }

      // Track completion time
      const completionTime = Date.now() - levelStartTime
      const timeData = JSON.parse(localStorage.getItem("levelTimes") || '{"times": [], "total": 0, "count": 0}')
      timeData.times.push(completionTime)
      timeData.total += completionTime
      timeData.count += 1
      localStorage.setItem("levelTimes", JSON.stringify(timeData))

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
          Array.from(completed)
        ).catch(console.error)
      }

      // Check if this is a chapter completion (level 5) AND first time
      if (isLastLevel && isFirstTimeCompletion) {
        // Show chapter complete modal
        setCompletedChapterInfo({
          number: chapterId,
          title: chapterData?.title || ""
        })
        setShowChapterComplete(true)
      } else if (isLastLevel && chapterId >= 8) {
        // Completed all chapters!
        router.push("/student/learn")
      } else if (isLastLevel) {
        // Go to next chapter (replay)
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
    <>
      <ChapterCompleteModal
        isOpen={showChapterComplete}
        chapterNumber={completedChapterInfo.number}
        chapterTitle={completedChapterInfo.title}
        onNext={() => {
          setShowChapterComplete(false)
          router.push("/student/learn")
        }}
      />

      <div className="min-h-screen bg-white">
        {/* Quiz Header with Hearts and Progress */}
        <QuizHeader hearts={hearts} progress={progress} />

        {/* Main Content */}
        <div className="pt-24 pb-12 px-4">
          <QuestionRenderer question={currentQuestion} onAnswer={handleAnswer} onNext={handleNext} />
        </div>
      </div>
    </>
  )
}
