"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

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
  const [hearts, setHearts] = useState(5)

  useEffect(() => {
    const savedHearts = localStorage.getItem("hearts")
    if (savedHearts) {
      setHearts(Number(savedHearts))
    }
  }, [])

  const handleChange = (position: number, value: string) => {
    if (!answered) {
      setAnswers({ ...answers, [position]: value })
    }
  }

  const handleSubmit = () => {
    const correct = question.blanks.every(
      (blank, idx) => answers[idx]?.toLowerCase().trim() === blank.toLowerCase().trim(),
    )
    setIsCorrect(correct)
    setAnswered(true)
    
    if (!correct) {
      const newHearts = Math.max(0, hearts - 1)
      setHearts(newHearts)
      localStorage.setItem("hearts", String(newHearts))
    }
    
    onAnswer(correct ? 1 : 0)
  }

  const handleNext = () => {
    setAnswers({})
    setAnswered(false)
    setIsCorrect(false)
    onNext()
  }

  const parts = question.question.split("___")
  const allFilled = question.blanks.every((_, idx) => answers[idx]?.trim())

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 pb-32">
        <div className="py-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-black text-left leading-relaxed">
            Fill in the blanks:
          </h2>
        </div>

        <div className="p-8 bg-gray-50 rounded-2xl border-2 border-b-4 border-gray-200">
          <p className="text-xl text-black leading-relaxed">
            {parts.map((part, idx) => (
              <span key={idx}>
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
                        ? answers[idx]?.toLowerCase().trim() === question.blanks[idx].toLowerCase().trim()
                          ? "border-green-500 border-b-green-600 bg-green-50"
                          : "border-red-500 border-b-red-600 bg-red-50"
                        : "border-gray-300 border-b-gray-400 bg-white focus:border-green-500"
                    }`}
                  />
                )}
              </span>
            ))}
          </p>
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
                className={!isCorrect ? "bg-red-500 hover:bg-red-600 text-white" : ""}
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
