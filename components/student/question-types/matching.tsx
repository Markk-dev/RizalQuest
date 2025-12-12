"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import NoHeartsModal from "../no-hearts-modal"
import { toast } from "sonner"
import { Info } from "lucide-react"

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
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]) // Order of tapped right items
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [hearts, setHearts] = useState<number | null>(null)
  const [shuffledRightItems, setShuffledRightItems] = useState<string[]>([])
  const [showNoHeartsModal, setShowNoHeartsModal] = useState(false)
  const [wrongAttempts, setWrongAttempts] = useState(0)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if (user.$id) {
      setHearts(user.hearts ?? 5)
    }
  }, [])

  useEffect(() => {
    const handleHeartsUpdated = (event: any) => {
      setHearts(event.detail.hearts)
    }
    window.addEventListener("heartsUpdated", handleHeartsUpdated)
    return () => window.removeEventListener("heartsUpdated", handleHeartsUpdated)
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
    setSelectedOrder([])
    setAnswered(false)
  }, [question])

  const playTileSound = () => {
    const audio = new Audio('/sounds/tile_clicked.ogg')
    audio.volume = 0.5
    audio.play().catch((err) => console.log('Audio play failed:', err))
  }

  const handleTap = (rightItem: string) => {
    if (answered) return
    
    playTileSound()
    
    // If already selected, remove it (redo)
    if (selectedOrder.includes(rightItem)) {
      setSelectedOrder(selectedOrder.filter(item => item !== rightItem))
    } else {
      // Add to selection order
      setSelectedOrder([...selectedOrder, rightItem])
    }
  }

  const playButtonSound = () => {
    const audio = new Audio('/sounds/platform_clicked.ogg')
    audio.volume = 0.5
    audio.play().catch((err) => console.log('Audio play failed:', err))
  }

  const handleSubmit = async () => {
    playButtonSound()
    // Check if user's order matches the correct order
    const correct = question.pairs.every((pair, index) => selectedOrder[index] === pair.right)
    setIsCorrect(correct)
    setAnswered(true)
    
    if (!correct && hearts !== null) {
      // Check if shield is active
      const activeBoosts = JSON.parse(localStorage.getItem("activeBoosts") || "{}")
      const shieldActive = activeBoosts.shield && activeBoosts.shield > Date.now()
      
      const newWrongAttempts = wrongAttempts + 1
      setWrongAttempts(newWrongAttempts)
      
      if (newWrongAttempts >= 3) {
        // Play toast sound
        try {
          const toastAudio = new Audio('/sounds/toast.ogg')
          toastAudio.volume = 0.5
          toastAudio.play().catch((err) => console.error('Toast audio play failed:', err))
        } catch (error) {
          console.error('Toast audio error:', error)
        }
        
        toast("Try recalling the story", {
          duration: 5000,
          icon: <Info className="w-5 h-5 text-yellow-700" strokeWidth={2.5} />,
          style: {
            background: '#fef3c7',
            color: '#78350f',
            border: '2px solid #fbbf24',
            borderBottom: '4px solid #f59e0b',
            fontSize: '14px',
            fontWeight: '500',
            padding: '10px 14px',
            maxWidth: '320px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
        })
      }
      
      const newHearts = shieldActive ? hearts : Math.max(0, hearts - 1)
      setHearts(newHearts)
      
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      user.hearts = newHearts
      localStorage.setItem("user", JSON.stringify(user))
      
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
      
      window.dispatchEvent(new CustomEvent("heartsUpdated", { detail: { hearts: newHearts } }))
      
      if (newHearts === 0) {
        setTimeout(() => setShowNoHeartsModal(true), 2000)
      }
    }
    
    onAnswer(correct ? 1 : 0)
  }

  const handleNext = () => {
    playButtonSound()
    if (isCorrect) {
      setSelectedOrder([])
      setAnswered(false)
      setIsCorrect(false)
      setWrongAttempts(0)
      onNext()
    } else {
      setSelectedOrder([])
      setAnswered(false)
      setIsCorrect(false)
    }
  }

  const isComplete = selectedOrder.length === question.pairs.length

  return (
    <>
      <NoHeartsModal isOpen={showNoHeartsModal} />
      
      <div className="max-w-4xl mx-auto px-6 pb-32">
        <div className="py-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-black text-left leading-relaxed">
            {question.question}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column - Questions */}
          <div className="space-y-4">
            {question.pairs.map((pair, idx) => (
              <div
                key={`left-${idx}`}
                className="p-5 rounded-2xl border-2 border-b-4 border-gray-300 bg-gray-50 text-black font-semibold text-lg flex items-center justify-between"
              >
                <span>{pair.left}</span>
                <div className="w-7 h-7 rounded-full border-2 border-gray-400 bg-gray-300 text-gray-700 flex items-center justify-center font-bold text-sm shrink-0">
                  {idx + 1}
                </div>
              </div>
            ))}
          </div>
          
          {/* Right column - Answers (shuffled, tap to order) */}
          <div className="space-y-4">
            {shuffledRightItems.map((rightItem, idx) => {
              const orderIndex = selectedOrder.indexOf(rightItem)
              const isSelected = orderIndex !== -1
              const orderNumber = isSelected ? orderIndex + 1 : null
              
              return (
                <button
                  key={`right-${idx}`}
                  onClick={() => handleTap(rightItem)}
                  disabled={answered}
                  className={`w-full p-5 rounded-2xl border-2 border-b-4 transition-all font-semibold text-lg active:border-b-2 flex items-center justify-between ${
                    answered
                      ? isCorrect && isSelected
                        ? "border-green-500 border-b-green-600 bg-green-50 text-black"
                        : !isCorrect && isSelected
                          ? "border-red-500 border-b-red-600 bg-red-50 text-black"
                          : "border-gray-300 bg-white text-black"
                      : isSelected
                        ? "border-green-500 border-b-green-600 bg-green-50 text-black"
                        : "border-gray-300 bg-white text-black hover:border-green-500 hover:bg-gray-50"
                  }`}
                >
                  <span>{rightItem}</span>
                  {orderNumber && (
                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center font-bold text-sm shrink-0 ${
                      answered
                        ? isCorrect
                          ? "border-green-500 bg-green-500 text-white"
                          : "border-red-500 bg-red-500 text-white"
                        : "border-green-500 bg-green-500 text-white"
                    }`}>
                      {orderNumber}
                    </div>
                  )}
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
