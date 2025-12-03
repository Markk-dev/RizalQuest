"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface ImageSelectProps {
  question: string
  images: { id: number; url: string; label: string }[]
  correct: number
  onAnswer: (id: number, isCorrect: boolean) => void
}

export default function ImageSelect({ question, images, correct, onAnswer }: ImageSelectProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [shuffledImages, setShuffledImages] = useState<{ id: number; url: string; label: string }[]>([])

  useEffect(() => {
    // Shuffle images when component mounts or question changes
    const shuffled = [...images]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    
    setShuffledImages(shuffled)
    setSelectedId(null)
    setAnswered(false)
  }, [images, question])

  const handleSelect = (id: number) => {
    if (!answered) {
      setSelectedId(id)
      const isCorrect = id === correct
      setAnswered(true)
      onAnswer(id, isCorrect)
    }
  }

  if (shuffledImages.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black text-center">{question}</h2>
      <div className="grid grid-cols-2 gap-4 mt-8">
        {shuffledImages.map((img) => (
          <button
            key={img.id}
            onClick={() => handleSelect(img.id)}
            disabled={answered}
            className={`p-4 rounded-lg border-2 transition-all overflow-hidden ${
              selectedId === img.id
                ? img.id === correct
                  ? "border-green-500 bg-green-50"
                  : "border-red-500 bg-red-50"
                : answered
                  ? "border-gray-200 bg-white"
                  : "border-gray-200 bg-white hover:border-primary"
            }`}
          >
            <div className="relative w-full h-32 mb-2 bg-gray-100 rounded">
              <Image src={img.url || "/placeholder.svg"} alt={img.label} fill className="object-cover rounded" />
            </div>
            <p className="text-sm font-semibold text-black">{img.label}</p>
            {selectedId === img.id && img.id === correct && <p className="text-lg mt-1">✓</p>}
            {selectedId === img.id && img.id !== correct && <p className="text-lg mt-1">✗</p>}
          </button>
        ))}
      </div>
    </div>
  )
}
