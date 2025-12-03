"use client"

import { useState } from "react"

interface MultipleChoiceProps {
  question: string
  options: string[]
  correct: number
  onAnswer: (index: number, isCorrect: boolean) => void
}

export default function MultipleChoice({ question, options, correct, onAnswer }: MultipleChoiceProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)

  const handleSelect = (index: number) => {
    if (!answered) {
      setSelectedIndex(index)
      const isCorrect = index === correct
      setAnswered(true)
      onAnswer(index, isCorrect)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-black text-center">{question}</h2>
      <div className="space-y-3 mt-8">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={answered}
            className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left font-semibold ${
              selectedIndex === index
                ? index === correct
                  ? "border-green-500 bg-green-50 text-black"
                  : "border-red-500 bg-red-50 text-black"
                : answered
                  ? "border-gray-200 bg-white text-gray cursor-default"
                  : "border-gray-200 bg-white text-black hover:border-primary hover:bg-gray-50 cursor-pointer"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                  selectedIndex === index
                    ? index === correct
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-red-500 bg-red-500 text-white"
                    : "border-gray-300 text-gray"
                }`}
              >
                {String.fromCharCode(65 + index)}
              </div>
              {option}
              {selectedIndex === index && index === correct && <span className="ml-auto text-lg">✓</span>}
              {selectedIndex === index && index !== correct && <span className="ml-auto text-lg">✗</span>}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
