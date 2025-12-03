"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface TypingProps {
  question: {
    type: string
    question: string
    correctAnswer: string
    placeholder?: string
  }
  onAnswer: (result: any) => void
  onNext: () => void
}

export default function Typing({ question, onAnswer, onNext }: TypingProps) {
  const [input, setInput] = useState("")
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [hearts, setHearts] = useState(5)

  useEffect(() => {
    const savedHearts = localStorage.getItem("hearts")
    if (savedHearts) {
      setHearts(Number(savedHearts))
    }
  }, [])

  const handleSubmit = () => {
    const correct = input.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()
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
    setInput("")
    setAnswered(false)
    setIsCorrect(false)
    onNext()
  }

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 pb-32">
        <div className="py-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-black text-left leading-relaxed">
            {question.question}
          </h2>
        </div>

        <div className="mt-8">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !answered && input.trim() && handleSubmit()}
            disabled={answered}
            placeholder={question.placeholder || "Type your answer..."}
            className={`w-full p-6 rounded-2xl border-2 border-b-4 text-xl font-semibold transition-all ${
              answered
                ? isCorrect
                  ? "border-green-500 border-b-green-600 bg-green-50 text-black"
                  : "border-red-500 border-b-red-600 bg-red-50 text-black"
                : "border-gray-200 border-b-gray-300 bg-white text-black focus:border-green-500 focus:outline-none"
            }`}
          />
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
                className={!isCorrect ? "bg-red-500 hover:bg-red-600 text-white border-red-600 border-b-red-700" : ""}
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
                disabled={!input.trim()}
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
