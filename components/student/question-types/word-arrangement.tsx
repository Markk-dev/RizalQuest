"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface WordArrangementProps {
  question: {
    type: string
    question: string
    words: string[]
    correctOrder: string[]
    prefilledWords?: string[]
  }
  onAnswer: (result: any) => void
  onNext: () => void
}

export default function WordArrangement({ question, onAnswer, onNext }: WordArrangementProps) {
  const [selected, setSelected] = useState<string[]>([])
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [hearts, setHearts] = useState(5)
  const [shuffledWords, setShuffledWords] = useState<string[]>([])
  const [usedIndices, setUsedIndices] = useState<number[]>([])

  useEffect(() => {
    // Fetch hearts from user object in localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if (user.$id) {
      setHearts(user.hearts ?? 5)
    }
  }, [])

  useEffect(() => {
    // Listen for heart updates
    const handleHeartsUpdated = (event: any) => {
      setHearts(event.detail.hearts)
    }
    window.addEventListener("heartsUpdated", handleHeartsUpdated)

    return () => {
      window.removeEventListener("heartsUpdated", handleHeartsUpdated)
    }
  }, [])

  useEffect(() => {
    // Shuffle words when question changes
    const shuffled = [...question.words]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    setShuffledWords(shuffled)
    // Set prefilled words if provided
    setSelected(question.prefilledWords || [])
    setUsedIndices([])
    setAnswered(false)
  }, [question])

  const playTileSound = () => {
    const audio = new Audio('/sounds/tile_clicked.ogg')
    audio.volume = 0.5
    audio.play().catch((err) => console.log('Audio play failed:', err))
  }

  const handleSelectWord = (word: string, index: number) => {
    if (!answered) {
      playTileSound()
      setSelected([...selected, word])
      setUsedIndices([...usedIndices, index])
    }
  }

  const handleRemoveWord = (idx: number) => {
    if (!answered) {
      // Don't allow removing prefilled words
      const prefilledCount = question.prefilledWords?.length || 0
      if (idx < prefilledCount) return
      
      playTileSound()
      const removedWordIndex = usedIndices[idx]
      setSelected(selected.filter((_, i) => i !== idx))
      setUsedIndices(usedIndices.filter((_, i) => i !== idx))
    }
  }

  const playButtonSound = () => {
    const audio = new Audio('/sounds/platform_clicked.ogg')
    audio.volume = 0.5
    audio.play().catch((err) => console.log('Audio play failed:', err))
  }

  const handleSubmit = async () => {
    playButtonSound()
    const correct = JSON.stringify(selected) === JSON.stringify(question.correctOrder)
    setIsCorrect(correct)
    setAnswered(true)
    
    if (!correct) {
      const newHearts = Math.max(0, hearts - 1)
      setHearts(newHearts)
      
      // Update user object in localStorage
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      user.hearts = newHearts
      localStorage.setItem("user", JSON.stringify(user))
      
      // Sync to database
      try {
        await fetch("/api/progress/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.$id,
            action: "updateHearts",
            data: { hearts: newHearts }
          })
        })
      } catch (error) {
        console.error("Failed to sync hearts:", error)
      }
      
      // Dispatch event so other components update
      window.dispatchEvent(new CustomEvent("heartsUpdated", { detail: { hearts: newHearts } }))
    }
    
    onAnswer(correct ? 1 : 0)
  }

  const handleNext = () => {
    playButtonSound()
    if (isCorrect) {
      // If correct, move to next question
      setSelected(question.prefilledWords || [])
      setUsedIndices([])
      setAnswered(false)
      setIsCorrect(false)
      onNext()
    } else {
      // If wrong, just reset to try again but keep prefilled words
      setSelected(question.prefilledWords || [])
      setUsedIndices([])
      setAnswered(false)
      setIsCorrect(false)
    }
  }

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 pb-32">
        <div className="py-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-black text-left leading-relaxed">
            {question.question}
          </h2>
        </div>

        {/* Selected words area */}
        <div className="min-h-24 p-6 rounded-2xl border-2 border-b-4 border-green-300 bg-green-50 mb-6">
          <div className="flex flex-wrap gap-3">
            {selected.length === 0 ? (
              <span className="text-gray-500 text-lg">Tap words below to arrange them</span>
            ) : (
              selected.map((word, idx) => {
                const prefilledCount = question.prefilledWords?.length || 0
                const isPrefilled = idx < prefilledCount
                
                return (
                  <button
                    key={idx}
                    onClick={() => handleRemoveWord(idx)}
                    disabled={answered || isPrefilled}
                    className={`px-5 py-3 rounded-xl border-2 border-b-4 font-semibold text-lg transition-all active:border-b-2 ${
                      isPrefilled
                        ? "border-gray-400 bg-gray-300 text-gray-700 cursor-not-allowed"
                        : "border-green-600 bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {word}
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* Available words */}
        <div>
          <p className="text-sm text-gray-600 mb-4 font-semibold">Available words:</p>
          <div className="flex flex-wrap gap-3">
            {shuffledWords.map((word, idx) => {
              const isUsed = usedIndices.includes(idx)
              if (isUsed) return null
              
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectWord(word, idx)}
                  disabled={answered}
                  className="px-5 py-3 rounded-xl border-2 border-b-4 border-gray-300 bg-white text-black font-semibold text-lg hover:border-green-500 hover:bg-gray-50 transition-all active:border-b-2"
                >
                  {word}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div 
        className={`fixed bottom-0 left-0 right-0 border-t-2 transition-colors duration-300 ${
          answered 
            ? isCorrect 
              ? "bg-green-100 border-green-200" 
              : "bg-red-100 border-red-200"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-4xl mx-auto px-6 py-5">
          {answered ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full border-[3px] ${isCorrect ? "border-green-500" : "border-red-400"} flex items-center justify-center`}>
                  {isCorrect ? (
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
                <span className={`text-xl font-bold ${isCorrect ? "text-green-500" : "text-red-400"}`}>
                  {isCorrect ? "Nicely done!" : "Try again."}
                </span>
              </div>
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={handleNext}
                className={!isCorrect ? "bg-red-500 hover:bg-red-600 text-white border-2 border-red-600 border-b-4 border-b-red-700 active:border-b-2" : ""}
              >
                {isCorrect ? "Next" : "Try again"}
              </Button>
            </div>
          ) : (
            <div className="flex justify-end">
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={handleSubmit}
                disabled={selected.length === 0}
                className="disabled:opacity-50"
              >
                Check
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
