"use client"

import React from "react"

import { useState } from "react"

interface DrawingProps {
  question: string
  imageUrl: string
  onAnswer: (points: string, isCorrect: boolean) => void
}

export default function Drawing({ question, imageUrl, onAnswer }: DrawingProps) {
  const [isDrawing, setIsDrawing] = useState(false)
  const [answered, setAnswered] = useState(false)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  const handleStartDraw = () => {
    setIsDrawing(true)
  }

  const handleEndDraw = () => {
    setIsDrawing(false)
  }

  const handleSubmit = () => {
    setAnswered(true)
    onAnswer("drawing", true)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black text-center">{question}</h2>

      <div className="border-2 border-gray-300 rounded-lg overflow-hidden mt-8">
        <canvas
          ref={canvasRef}
          onMouseDown={handleStartDraw}
          onMouseUp={handleEndDraw}
          onMouseLeave={handleEndDraw}
          className="w-full bg-white cursor-crosshair"
          height={300}
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => {
            if (canvasRef.current) {
              const ctx = canvasRef.current.getContext("2d")
              if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
            }
          }}
          className="flex-1 py-3 rounded-lg border-2 border-gray-300 text-black font-bold hover:bg-gray-50 transition-all"
        >
          Clear
        </button>
        <button
          onClick={handleSubmit}
          disabled={answered}
          className="flex-1 py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary-dark transition-all"
        >
          Submit
        </button>
      </div>
    </div>
  )
}
