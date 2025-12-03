"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

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
  const [hearts, setHearts] = useState(5)

  useEffect(() => {
    // Load from localStorage
    const savedHearts = localStorage.getItem("hearts")
    if (savedHearts) {
      setHearts(Number(savedHearts))
    }
  }, [isAnswered])

  const handleSelect = (index: number) => {
    if (!isAnswered) {
      setSelectedIndex(index)
    }
  }

  const handleCheck = () => {
    if (selectedIndex !== null) {
      const correct = selectedIndex === question.correct
      setIsCorrect(correct)
      setIsAnswered(true)
      
      if (!correct) {
        // Decrease hearts by 1 if wrong
        const newHearts = Math.max(0, hearts - 1)
        setHearts(newHearts)
        localStorage.setItem("hearts", String(newHearts))
      }
      
      onAnswer(selectedIndex)
    }
  }

  const handleNextClick = () => {
    setSelectedIndex(null)
    setIsAnswered(false)
    setIsCorrect(false)
    onNext()
  }

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 pb-32">
        {/* Question */}
        <div className="py-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-black text-left leading-relaxed">
            {question.question}
          </h2>
        </div>

        {/* Options - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={isAnswered}
              className={`p-5 rounded-2xl border-2 border-b-4 active:border-b-2 transition-all duration-200 text-left min-h-[100px] flex items-center ${
                isAnswered && index === question.correct
                  ? "border-green-500 border-b-green-600 bg-green-50 text-black"
                  : isAnswered && index === selectedIndex && !isCorrect
                    ? "border-red-500 border-b-red-600 bg-red-50 text-black"
                    : selectedIndex === index && !isAnswered
                      ? "border-green-500 border-b-green-600 bg-green-50 text-black"
                      : "border-gray-200 border-b-gray-300 bg-white text-black hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-lg md:text-xl font-semibold flex-1 text-center">{option}</span>
                <div
                  className={`w-9 h-9 rounded-full border-2 flex items-center justify-center font-bold text-base shrink-0 ${
                    isAnswered && index === question.correct
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
          ))}
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
                  className={!isCorrect ? "bg-red-500 hover:bg-red-600 text-white border-red-600 border-b-red-700" : ""}
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
