"use client"

import { useState, useEffect } from "react"

interface MultipleChoiceProps {
  question: string
  options: string[]
  correct: number | number[]
  multipleCorrect?: boolean
  onAnswer: (index: number | number[], isCorrect: boolean) => void
}

export default function MultipleChoice({ question, options, correct, multipleCorrect = false, onAnswer }: MultipleChoiceProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [selectedIndices, setSelectedIndices] = useState<number[]>([])
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
    setSelectedIndices([])
    setAnswered(false)
  }, [options, question])

  const handleSelect = (index: number) => {
    if (!answered) {
      if (multipleCorrect) {
        // Toggle selection for multiple correct answers
        const originalIndex = shuffledOptions[index].originalIndex
        if (selectedIndices.includes(index)) {
          setSelectedIndices(selectedIndices.filter(i => i !== index))
        } else {
          setSelectedIndices([...selectedIndices, index])
        }
      } else {
        // Single selection
        setSelectedIndex(index)
        const originalIndex = shuffledOptions[index].originalIndex
        const isCorrect = originalIndex === correct
        setAnswered(true)
        onAnswer(originalIndex, isCorrect)
      }
    }
  }

  const handleSubmitMultiple = () => {
    if (multipleCorrect && selectedIndices.length > 0) {
      const originalIndices = selectedIndices.map(i => shuffledOptions[i].originalIndex).sort()
      const correctIndices = Array.isArray(correct) ? [...correct].sort() : [correct]
      const isCorrect = JSON.stringify(originalIndices) === JSON.stringify(correctIndices)
      setAnswered(true)
      onAnswer(originalIndices, isCorrect)
    }
  }

  if (shuffledOptions.length === 0) {
    return null
  }

  const correctIndices = Array.isArray(correct) ? correct : [correct]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-black text-center">{question}</h2>
      {multipleCorrect && !answered && (
        <p className="text-sm text-gray-600 text-center">Select all correct answers</p>
      )}
      <div className="space-y-3 mt-8">
        {shuffledOptions.map((item, index) => {
          const isCorrectOption = correctIndices.includes(item.originalIndex)
          const isSelected = multipleCorrect ? selectedIndices.includes(index) : selectedIndex === index
          
          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={answered}
              className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left font-semibold ${
                answered && isCorrectOption
                  ? "border-green-500 bg-green-50 text-black"
                  : answered && isSelected && !isCorrectOption
                    ? "border-red-500 bg-red-50 text-black"
                    : answered
                      ? "border-gray-200 bg-white text-gray cursor-default"
                      : isSelected
                        ? "border-blue-500 bg-blue-50 text-black"
                        : "border-gray-200 bg-white text-black hover:border-primary hover:bg-gray-50 cursor-pointer"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 ${multipleCorrect ? 'rounded' : 'rounded-full'} border-2 flex items-center justify-center text-sm font-bold ${
                    answered && isCorrectOption
                      ? "border-green-500 bg-green-500 text-white"
                      : answered && isSelected && !isCorrectOption
                        ? "border-red-500 bg-red-500 text-white"
                        : isSelected
                          ? "border-blue-500 bg-blue-500 text-white"
                          : "border-gray-300 text-gray"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                {item.option}
                {answered && isCorrectOption && <span className="ml-auto text-lg">✓</span>}
                {answered && isSelected && !isCorrectOption && <span className="ml-auto text-lg">✗</span>}
              </div>
            </button>
          )
        })}
      </div>
      {multipleCorrect && !answered && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmitMultiple}
            disabled={selectedIndices.length === 0}
            className="px-8 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  )
}
