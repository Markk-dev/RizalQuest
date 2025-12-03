"use client"

import { useState } from "react"

interface ImageArrangeProps {
  question: string
  images: Array<{ id: string; url: string; label: string }>
  correctOrder: string[]
  onAnswer: (order: string[], isCorrect: boolean) => void
}

export default function ImageArrange({ question, images, correctOrder, onAnswer }: ImageArrangeProps) {
  const [order, setOrder] = useState<string[]>(images.map((img) => img.id))
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newOrder = [...order]
    const [movedItem] = newOrder.splice(fromIndex, 1)
    newOrder.splice(toIndex, 0, movedItem)
    setOrder(newOrder)
  }

  const handleSubmit = () => {
    const correct = JSON.stringify(order) === JSON.stringify(correctOrder)
    setIsCorrect(correct)
    setAnswered(true)
    onAnswer(order, correct)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">{question}</h2>

      <div className="flex flex-col gap-3">
        {order.map((imageId, idx) => {
          const image = images.find((img) => img.id === imageId)
          return (
            <div key={imageId} className="flex items-center gap-3 p-4 bg-gray-100 rounded-xl">
              <span className="text-2xl font-bold text-primary">{idx + 1}.</span>
              <img
                src={image?.url || "/placeholder.svg"}
                alt={image?.label}
                className="w-12 h-12 rounded object-cover"
              />
              <span className="flex-1 font-semibold text-black">{image?.label}</span>
              <div className="flex gap-2">
                {idx > 0 && (
                  <button
                    onClick={() => moveImage(idx, idx - 1)}
                    className="p-2 bg-primary text-white rounded hover:bg-primary-dark"
                  >
                    ↑
                  </button>
                )}
                {idx < order.length - 1 && (
                  <button
                    onClick={() => moveImage(idx, idx + 1)}
                    className="p-2 bg-primary text-white rounded hover:bg-primary-dark"
                  >
                    ↓
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {!answered && (
        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary-dark transition-all"
        >
          Check Answer
        </button>
      )}
    </div>
  )
}
