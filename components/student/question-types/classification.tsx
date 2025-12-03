"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface ClassificationProps {
  question: {
    type: string
    question: string
    items: string[]
    categories: string[]
    correctMapping: Record<string, string>
  }
  onAnswer: (result: any) => void
  onNext: () => void
}

export default function Classification({ question, onAnswer, onNext }: ClassificationProps) {
  const [classification, setClassification] = useState<Record<string, string>>({})
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [hearts, setHearts] = useState(5)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

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

  const handleDragStart = (e: React.DragEvent, item: string) => {
    if (!answered) {
      e.dataTransfer.effectAllowed = "move"
      e.dataTransfer.setData("text/plain", item)
      setSelectedItem(item)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, category: string) => {
    e.preventDefault()
    const item = e.dataTransfer.getData("text/plain")
    if (!answered && item) {
      setClassification({ ...classification, [item]: category })
      setSelectedItem(null)
    }
  }

  const handleRemoveItem = (item: string) => {
    if (!answered) {
      const newClassification = { ...classification }
      delete newClassification[item]
      setClassification(newClassification)
    }
  }

  const handleSubmit = async () => {
    // Check if all items are correctly classified
    const correct = question.items.every(item => 
      classification[item] === question.correctMapping[item]
    )
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
    if (isCorrect) {
      // If correct, move to next question
      setClassification({})
      setAnswered(false)
      setIsCorrect(false)
      onNext()
    } else {
      // If wrong, just reset to try again
      setClassification({})
      setAnswered(false)
      setIsCorrect(false)
    }
  }

  const getCategoryColor = (index: number) => {
    const colors = ["bg-blue-100", "bg-red-100", "bg-green-100", "bg-yellow-100"]
    return colors[index % colors.length]
  }

  const allItemsClassified = question.items.every(item => classification[item])

  return (
    <>
      <div className="max-w-5xl mx-auto px-6 pb-28">
        <div className="py-6 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-black text-left leading-relaxed">
            {question.question}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {question.categories.map((category, idx) => (
            <div
              key={idx}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, category)}
              className={`p-6 rounded-2xl border-2 border-b-4 border-gray-300 min-h-[280px] text-center transition-all ${getCategoryColor(idx)}`}
            >
              <p className="font-bold text-black text-2xl mb-6">{category}</p>
              <div className="space-y-3">
                {question.items.map((item) => (
                  classification[item] === category && (
                    <div
                      key={item}
                      draggable={!answered}
                      onDragStart={(e) => handleDragStart(e, item)}
                      onClick={() => handleRemoveItem(item)}
                      className={`p-4 rounded-xl border-2 border-b-4 bg-white font-semibold text-center cursor-move transition-all active:border-b-2 ${
                        answered
                          ? question.correctMapping[item] === category
                            ? "border-green-500 border-b-green-600 bg-green-50"
                            : "border-red-500 border-b-red-600 bg-red-50"
                          : "border-gray-300 border-b-gray-400 hover:border-green-400 hover:shadow-lg"
                      }`}
                    >
                      {item}
                    </div>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>

        {!answered && (
          <div className="mt-6 p-5 bg-gray-100 rounded-2xl border-2 border-b-4 border-gray-300">
            <p className="font-semibold text-gray-700 mb-4">
              Drag items to categories above:
            </p>
            <div className="flex flex-wrap gap-3">
              {question.items.map((item) => (
                !classification[item] && (
                  <div
                    key={item}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    className="p-4 rounded-xl border-2 border-b-4 border-gray-300 bg-white font-semibold cursor-move transition-all hover:border-green-500 hover:shadow-lg active:border-b-2"
                  >
                    {item}
                  </div>
                )
              ))}
            </div>
          </div>
        )}
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
                disabled={!allItemsClassified}
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
