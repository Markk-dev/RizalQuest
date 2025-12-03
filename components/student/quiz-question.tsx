"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import NoHeartsModal from "./no-hearts-modal"
import { toast } from "sonner"
import { Info } from "lucide-react"

interface QuizQuestionProps {
  question: {
    id: number
    question: string
    options: string[]
    correct: number
  }
  onAnswer: (index: number) => void
  onNext: () => void
}

export default function QuizQuestion({ question, onAnswer, onNext }: QuizQuestionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [hearts, setHearts] = useState<number | null>(null)
  const [shuffledOptions, setShuffledOptions] = useState<{option: string, originalIndex: number}[]>([])
  const [showNoHeartsModal, setShowNoHeartsModal] = useState(false)
  const [wrongAttempts, setWrongAttempts] = useState(0)

  useEffect(() => {
    // Fetch hearts from user object in localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if (user.$id) {
      setHearts(user.hearts ?? 5)
    }
  }, [])

  useEffect(() => {
    // Shuffle options when question changes
    const optionsWithIndex = question.options.map((option, index) => ({
      option,
      originalIndex: index
    }))
    
    // Fisher-Yates shuffle
    const shuffled = [...optionsWithIndex]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    
    setShuffledOptions(shuffled)
  }, [question])

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

  const handleSelect = (index: number) => {
    if (!isAnswered) {
      setSelectedIndex(index)
    }
  }

  const handleCheck = async () => {
    if (selectedIndex !== null && hearts !== null) {
      const originalIndex = shuffledOptions[selectedIndex].originalIndex
      const correct = originalIndex === question.correct
      setIsCorrect(correct)
      setIsAnswered(true)
      
      if (!correct) {
        // Increment wrong attempts
        const newWrongAttempts = wrongAttempts + 1
        setWrongAttempts(newWrongAttempts)
        
        // Show hint after 3 wrong attempts (and keep showing on subsequent failures)
        if (newWrongAttempts >= 3) {
          toast("Hint: Try recalling the story", {
            duration: 5000,
            icon: <Info className="w-5 h-5 text-yellow-700" strokeWidth={2.5} />,
            style: {
              background: '#fef3c7',
              color: '#78350f',
              border: '2px solid #fbbf24',
              borderBottom: '4px solid #f59e0b',
              fontSize: '14px',
              fontWeight: '500',
              padding: '10px 14px',
              maxWidth: '320px',
              borderRadius: '10px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            },
            className: 'toast-hint',
          })
        }
        
        // Decrease hearts by 1 if wrong
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
        
        // Show modal if no hearts left
        if (newHearts === 0) {
          setTimeout(() => {
            setShowNoHeartsModal(true)
          }, 2000) // Show modal after 2 seconds
        }
      }
      
      onAnswer(originalIndex)
    }
  }

  const handleNextClick = () => {
    if (isCorrect) {
      // If correct, move to next question and reset wrong attempts
      setSelectedIndex(null)
      setIsAnswered(false)
      setIsCorrect(false)
      setWrongAttempts(0)
      onNext()
    } else {
      // If wrong, just reset to try again
      setSelectedIndex(null)
      setIsAnswered(false)
      setIsCorrect(false)
    }
  }

  return (
    <>
      <NoHeartsModal isOpen={showNoHeartsModal} />
      
      <div className="max-w-4xl mx-auto px-6 pb-32">
        {/* Question */}
        <div className="py-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-black text-left leading-relaxed">
            {question.question}
          </h2>
          

        </div>

        {/* Options - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shuffledOptions.map((item, index) => {
            const isCorrectOption = item.originalIndex === question.correct
            
            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={isAnswered}
                className={`p-5 rounded-2xl border-2 border-b-4 active:border-b-2 transition-all duration-200 text-left min-h-[100px] flex items-center ${
                  isAnswered && isCorrectOption
                    ? "border-green-500 border-b-green-600 bg-green-50 text-black"
                    : isAnswered && index === selectedIndex && !isCorrect
                      ? "border-red-500 border-b-red-600 bg-red-50 text-black"
                      : selectedIndex === index && !isAnswered
                        ? "border-green-500 border-b-green-600 bg-green-50 text-black"
                        : "border-gray-200 border-b-gray-300 bg-white text-black hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-lg md:text-xl font-semibold flex-1 text-center">{item.option}</span>
                  <div
                    className={`w-9 h-9 rounded-full border-2 flex items-center justify-center font-bold text-base shrink-0 ${
                      isAnswered && isCorrectOption
                        ? "border-green-500 bg-green-500 text-white"
                        : isAnswered && index === selectedIndex && !isCorrect
                          ? "border-red-500 bg-red-500 text-white"
                          : selectedIndex === index && !isAnswered
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-gray-300 bg-white text-gray-500"
                    }`}
                  >
                    {index + 1}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Footer - Fixed at bottom */}
      <div 
        className={`fixed bottom-0 left-0 right-0 border-t-2 transition-colors duration-300 ${
          isAnswered 
            ? isCorrect 
              ? "bg-green-100 border-green-200" 
              : "bg-red-100 border-red-200"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-4xl mx-auto px-6 py-5">
          {isAnswered ? (
            <div className="space-y-4">
              {/* Feedback and Button */}
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
                  onClick={handleNextClick}
                  className={!isCorrect ? "bg-red-500 hover:bg-red-600 text-white border-2 border-red-600 border-b-4 border-b-red-700 active:border-b-2" : ""}
                >
                  {isCorrect ? "Next" : "Try again"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-end">
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={handleCheck}
                disabled={selectedIndex === null}
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
