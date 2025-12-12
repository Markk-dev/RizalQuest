"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import NoHeartsModal from "../no-hearts-modal"

interface FillInBlanksProps {
  question: {
    type: string
    question: string
    blanks: string[]
  }
  onAnswer: (result: any) => void
  onNext: () => void
}

export default function FillInBlanks({ question, onAnswer, onNext }: FillInBlanksProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [hearts, setHearts] = useState<number | null>(null)
  const [showNoHeartsModal, setShowNoHeartsModal] = useState(false)

  useEffect(() => {
    // Fetch hearts from user object in localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if (user.$id) {
      setHearts(user.hearts ?? 5)
    }
  }, [])

  useEffect(() => {
    // Listen for heart updates from other components
    const handleHeartsUpdated = (event: any) => {
      setHearts(event.detail.hearts)
    }
    window.addEventListener("heartsUpdated", handleHeartsUpdated)

    return () => {
      window.removeEventListener("heartsUpdated", handleHeartsUpdated)
    }
  }, [])

  const handleChange = (position: number, value: string) => {
    if (!answered) {
      setAnswers({ ...answers, [position]: value })
    }
  }

  const handleSubmit = async () => {
    const correct = question.blanks.every((blank, idx) => {
      const userAnswer = answers[idx]?.toLowerCase().trim()
      // Check if blank is an array of accepted answers or a single answer
      if (Array.isArray(blank)) {
        return blank.some(acceptedAnswer => 
          userAnswer === acceptedAnswer.toLowerCase().trim()
        )
      }
      return userAnswer === blank.toLowerCase().trim()
    })
    setIsCorrect(correct)
    setAnswered(true)
    
    if (!correct && hearts !== null) {
      // Check if shield is active
      const activeBoosts = JSON.parse(localStorage.getItem("activeBoosts") || "{}")
      const shieldActive = activeBoosts.shield && activeBoosts.shield > Date.now()
      
      const newHearts = shieldActive ? hearts : Math.max(0, hearts - 1)
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
      
      // Show shield protection message if active
      if (shieldActive) {
        // Optional: Show a toast that shield protected them
        console.log("Shield protected you from losing a heart!")
      }
      
      // Show modal if no hearts left
      if (newHearts === 0) {
        setTimeout(() => {
          setShowNoHeartsModal(true)
        }, 2000) // Show modal after 2 seconds
      }
    }
    
    onAnswer(correct ? 1 : 0)
  }

  const handleNext = () => {
    if (isCorrect) {
      // If correct, move to next question
      setAnswers({})
      setAnswered(false)
      setIsCorrect(false)
      onNext()
    } else {
      // If wrong, just reset to try again
      setAnswers({})
      setAnswered(false)
      setIsCorrect(false)
    }
  }

  const parts = question.question.split("___")
  const allFilled = question.blanks.every((_, idx) => answers[idx]?.trim())

  return (
    <>
      <NoHeartsModal isOpen={showNoHeartsModal} />
      
      <div className="max-w-4xl mx-auto px-6 pb-32">
        <div className="py-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-black text-left leading-relaxed">
            Fill in the blanks:
          </h2>
        </div>

        <div className="p-8 bg-gray-50 rounded-2xl border-2 border-b-4 border-gray-200">
          <div className="text-xl text-black leading-relaxed space-y-4">
            {parts.map((part, idx) => (
              <span key={idx} className="inline-block">
                {part}
                {idx < parts.length - 1 && (
                  <input
                    type="text"
                    value={answers[idx] || ""}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    disabled={answered}
                    placeholder="___"
                    className={`mx-2 px-4 py-2 border-2 border-b-4 rounded-lg text-center font-semibold min-w-32 focus:outline-none transition-all ${
                      answered
                        ? (() => {
                            const userAnswer = answers[idx]?.toLowerCase().trim()
                            const blank = question.blanks[idx]
                            const isCorrect = Array.isArray(blank)
                              ? blank.some(acceptedAnswer => userAnswer === acceptedAnswer.toLowerCase().trim())
                              : userAnswer === blank.toLowerCase().trim()
                            return isCorrect
                              ? "border-green-500 border-b-green-600 bg-green-50"
                              : "border-red-500 border-b-red-600 bg-red-50"
                          })()
                        : "border-gray-300 border-b-gray-400 bg-white focus:border-green-500"
                    }`}
                  />
                )}
              </span>
            ))}
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
                disabled={!allFilled}
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
