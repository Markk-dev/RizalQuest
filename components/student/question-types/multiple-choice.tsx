"use client"

import { useState, useEffect } from "react"

interface MultipleChoiceProps {
  question: string
  options: string[]
  correct: number
  onAnswer: (index: number, isCorrect: boolean) => void
}

export default function MultipleChoice({ question, options, correct, onAnswer }: MultipleChoiceProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [shuffledOptions, setShuffledOptions] = useState<{option: string, originalIndex: number}[]>([])

  useEffect(() => {
    // Shuffle options when component mounts or question changes
    const optionsWithIndex = options.map((option, index) => ({
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
    setSelectedIndex(null)
    setAnswered(false)
  }, [options, question])

  const handleSelect = (index: number) => {
    if (!answered) {
      setSelectedIndex(index)
      const originalIndex = shuffledOptions[index].originalIndex
      const isCorrect = originalIndex === correct
      setAnswered(true)
      onAnswer(originalIndex, isCorrect)
    }
  }

  if (shuffledOptions.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-black text-center">{question}</h2>
      <div className="space-y-3 mt-8">
        {shuffledOptions.map((item, index) => {
          const isCorrectOption = item.originalIndex === correct
          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={answered}
              className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left font-semibold ${
                answered && isCorrectOption
                  ? "border-green-500 bg-green-50 text-black"
                  : selectedIndex === index && !isCorrectOption
                    ? "border-red-500 bg-red-50 text-black"
                    : answered
                      ? "border-gray-200 bg-white text-gray cursor-default"
                      : "border-gray-200 bg-white text-black hover:border-primary hover:bg-gray-50 cursor-pointer"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                    answered && isCorrectOption
                      ? "border-green-500 bg-green-500 text-white"
                      : selectedIndex === index && !isCorrectOption
                        ? "border-red-500 bg-red-500 text-white"
                        : "border-gray-300 text-gray"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                {item.option}
                {answered && isCorrectOption && <span className="ml-auto text-lg">✓</span>}
                {selectedIndex === index && !isCorrectOption && <span className="ml-auto text-lg">✗</span>}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
