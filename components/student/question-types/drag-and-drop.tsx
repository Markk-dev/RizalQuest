"use client"

import { useState } from "react"

interface DragAndDropProps {
  question: string
  pairs: Array<{ id: string; left: string; right: string }>
  onAnswer: (pairs: Array<{ left: string; right: string }>, isCorrect: boolean) => void
}

export default function DragAndDrop({ question, pairs, onAnswer }: DragAndDropProps) {
  const [matches, setMatches] = useState<Record<string, string>>({})
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [draggedItem, setDraggedItem] = useState<string | null>(null)

  const handleDragStart = (item: string) => {
    setDraggedItem(item)
  }

  const handleDrop = (leftId: string) => {
    if (draggedItem && draggedItem !== leftId) {
      setMatches({ ...matches, [leftId]: draggedItem })
      setDraggedItem(null)
    }
  }

  const handleSubmit = () => {
    const allMatched = pairs.every((pair) => matches[pair.id] === pair.right)
    setIsCorrect(allMatched)
    setAnswered(true)
    onAnswer(
      Object.entries(matches).map(([id, right]) => {
        const pair = pairs.find((p) => p.id === id)
        return { left: pair?.left || "", right }
      }),
      allMatched,
    )
  }

  const unmatched = pairs.filter((p) => !matches[p.id]).map((p) => p.right)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">{question}</h2>

      <div className="grid grid-cols-2 gap-8">
        {/* Left side - items to match */}
        <div className="space-y-3">
          {pairs.map((pair) => (
            <div
              key={pair.id}
              className="p-4 rounded-xl bg-gray-100 border-2 border-gray-300 text-center font-semibold text-black"
            >
              {pair.left}
            </div>
          ))}
        </div>

        {/* Right side - draggable items */}
        <div className="space-y-3">
          {unmatched.map((item, idx) => (
            <div
              key={idx}
              draggable
              onDragStart={() => handleDragStart(item)}
              className="p-4 rounded-xl bg-primary text-white cursor-move hover:bg-primary-dark transition-all transform hover:scale-105 text-center font-semibold shadow-lg"
            >
              {item}
            </div>
          ))}

          {/* Matched items show as badges */}
          {Object.values(matches).map((item, idx) => (
            <div
              key={`matched-${idx}`}
              className="p-4 rounded-xl bg-green-200 text-green-900 text-center font-semibold border-2 border-green-400"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {!answered && (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(matches).length === 0}
          className="w-full py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Check Answer
        </button>
      )}
    </div>
  )
}
