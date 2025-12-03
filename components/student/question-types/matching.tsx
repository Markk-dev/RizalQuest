"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface MatchingProps {
  question: {
    type: string
    question: string
    pairs: Array<{ left: string; right: string }>
  }
  onAnswer: (result: any) => void
  onNext: () => void
}

export default function Matching({ question, onAnswer, onNext }: MatchingProps) {
  const [matches, setMatches] = useState<Record<string, string>>({})
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [hearts, setHearts] = useState(5)
  const [shuffledRightItems, setShuffledRightItems] = useState<string[]>([])

  useEffect(() => {
    const savedHearts = localStorage.getItem("hearts")
    if (savedHearts) {
      setHearts(Number(savedHearts))
    }
  }, [])

  useEffect(() => {
    // Shuffle right column items when question changes
    const rightItems = question.pairs.map(pair => pair.right)
    const shuffled = [...rightItems]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    setShuffledRightItems(shuffled)
    setMatches({})
    setAnswered(false)
  }, [question])

  const handleMatch = (left: string, right: string) => {
    if (!answered) {
      setMatches({ ...matches, [left]: right })
    }
  }

  const handleSubmit = () => {
    const correct = question.pairs.every((pair) => matches[pair.left] === pair.right)
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
    if (isCorrect) {
      // If correct, move to next question
      setMatches({})
      setAnswered(false)
      setIsCorrect(false)
      onNext()
    } else {
      // If wrong, just reset to try again
      setMatches({})
      setAnswered(false)
      setIsCorrect(false)
    }
  }

  const isComplete = Object.keys(matches).length === question.pairs.length

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 pb-32">
        <div className="py-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-black text-left leading-relaxed">
            {question.question}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column */}
          <div className="space-y-4">
            {question.pairs.map((pair, idx) => (
              <div
                key={`left-${idx}`}
                className="p-5 rounded-2xl border-2 border-b-4 border-gray-300 bg-gray-50 text-black font-semibold text-lg"
              >
                {pair.left}
              </div>
            ))}
          </div>
          {/* Right column - shuffled */}
          <div className="space-y-4">
            {shuffledRightItems.map((rightItem, idx) => {
              // Find which left item this right item belongs to
              const correctPair = question.pairs.find(p => p.right === rightItem)
              const leftItem = correctPair?.left || ''
              const isMatched = matches[leftItem] === rightItem
              
              return (
                <button
                  key={`right-${idx}`}
                  onClick={() => handleMatch(leftItem, rightItem)}
                  disabled={answered}
                  className={`w-full p-5 rounded-2xl border-2 border-b-4 transition-all text-left font-semibold text-lg active:border-b-2 ${
                    isMatched
                      ? answered && isCorrect
                        ? "border-green-500 border-b-green-600 bg-green-50 text-black"
                        : "border-green-500 border-b-green-600 bg-green-50 text-black"
                      : "border-gray-300 bg-white text-black hover:border-green-500 hover:bg-gray-50"
                  }`}
                >
                  {rightItem}
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
                disabled={!isComplete}
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
