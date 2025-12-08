"use client"

import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface DrawingProps {
  question: string
  imageUrl?: string
  onAnswer: (result: any) => void
  onNext: () => void
}

interface Stroke {
  points: { x: number; y: number }[]
}

export default function Drawing({ question, imageUrl, onAnswer, onNext }: DrawingProps) {
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [lastX, setLastX] = useState(0)
  const [lastY, setLastY] = useState(0)
  const [strokes, setStrokes] = useState<Stroke[]>([])
  const [currentStroke, setCurrentStroke] = useState<{ x: number; y: number }[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }
  }, [])

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    }
  }

  const redrawCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    ctx.strokeStyle = "#22c55e"
    ctx.lineWidth = 4
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    
    strokes.forEach(stroke => {
      if (stroke.points.length < 2) return
      
      ctx.beginPath()
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y)
      
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y)
      }
      ctx.stroke()
    })
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getCoordinates(e)
    setLastX(coords.x)
    setLastY(coords.y)
    setCurrentStroke([coords])
    setIsDrawing(true)
    setHasDrawn(true)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    
    const coords = getCoordinates(e)
    
    ctx.strokeStyle = "#22c55e"
    ctx.lineWidth = 4
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    
    ctx.beginPath()
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(coords.x, coords.y)
    ctx.stroke()
    
    setCurrentStroke(prev => [...prev, coords])
    setLastX(coords.x)
    setLastY(coords.y)
  }

  const stopDrawing = () => {
    if (isDrawing && currentStroke.length > 0) {
      setStrokes(prev => [...prev, { points: currentStroke }])
      setCurrentStroke([])
    }
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setStrokes([])
    setCurrentStroke([])
    setHasDrawn(false)
  }

  const undoLastStroke = () => {
    if (strokes.length === 0) return
    
    const newStrokes = strokes.slice(0, -1)
    setStrokes(newStrokes)
    
    if (newStrokes.length === 0) {
      setHasDrawn(false)
    }
    
    redrawCanvas()
  }

  useEffect(() => {
    redrawCanvas()
  }, [strokes])

  const handleNext = () => {
    if (!hasDrawn) return
    
    // Mark as correct and proceed
    onAnswer({ isCorrect: true })
    onNext()
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4 pt-8">
      <div className="w-full max-w-2xl">
        <h2 className="text-4xl font-bold text-black text-center mb-3">{question}</h2>
        <p className="text-center text-gray-600 mb-6">Trace the outline to continue</p>

        <div className="relative border-4 border-gray-300 rounded-xl overflow-hidden bg-white shadow-lg h-[320px] mb-5">
          {/* Background image to trace */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Image
              src="/traceable/alipato.png"
              alt="Alipato the dog"
              width={600}
              height={600}
              className="opacity-30"
              style={{ objectFit: "contain" }}
            />
          </div>
          
          {/* Drawing canvas */}
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="w-full h-full cursor-crosshair relative z-10 block"
            style={{ touchAction: "none" }}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={undoLastStroke}
            disabled={strokes.length === 0}
            className={`py-3 rounded-xl border-2 border-b-4 font-bold transition-all active:border-b-2 flex-[0.5] ${
              strokes.length === 0
                ? "bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed"
                : "bg-white border-gray-300 border-b-gray-400 text-black hover:bg-gray-50"
            }`}
          >
            Undo
          </button>
          <button
            onClick={clearCanvas}
            className="py-3 rounded-xl border-2 border-b-4 border-gray-300 border-b-gray-400 text-black font-bold hover:bg-gray-50 transition-all active:border-b-2 flex-[0.5]"
          >
            Clear
          </button>
          <button
            onClick={handleNext}
            disabled={!hasDrawn}
            className={`flex-1 py-3 rounded-xl border-2 border-b-4 font-bold transition-all ${
              !hasDrawn
                ? "bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed"
                : "bg-primary border-green-600 border-b-green-700 text-white hover:bg-green-600 active:border-b-2"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
