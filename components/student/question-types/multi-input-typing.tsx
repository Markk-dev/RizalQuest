"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import NoHeartsModal from "../no-hearts-modal"
import { toast } from "sonner"
import { Info } from "lucide-react"

interface MultiInputTypingProps {
  question: {
    type: string
    question: string
    correctAnswers: string // Comma-separated valid answers
    inputCount: number
    placeholder?: string
  }
  onAnswer: (result: any) => void
  onNext: () => void
}

export default function MultiInputTyping({ question, onAnswer, onNext }: MultiInputTypingProps) {
  const [inputs, setInputs] = useState<string[]>(Array(question.inputCount).fill(""))
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [hearts, setHearts] = useState<number | null>(null)
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

  const normalizeString = (str: string) => {
    return str.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }

  const playButtonSound = () => {
    const audio = new Audio('/sounds/platform_clicked.ogg')
    audio.volume = 0.5
    audio.play().catch((err) => console.log('Audio play failed:', err))
  }

  const handleSubmit = async () => {
    playButtonSound()
    const validAnswers = question.correctAnswers.split(",").map(ans => normalizeString(ans.trim()))
    const normalizedInputs = inputs.map(inp => normalizeString(inp))
    
    // Check if all inputs are filled
    const allFilled = normalizedInputs.every(inp => inp.length > 0)
    
    // Check if all inputs are valid and unique
    const allValid = normalizedInputs.every(inp => validAnswers.includes(inp))
    const allUnique = new Set(normalizedInputs).size === normalizedInputs.length
    
    const correct = allFilled && allValid && allUnique
    setIsCorrect(correct)
    setAnswered(true)
    
    if (!correct && hearts !== null) {
      const newWrongAttempts = wrongAttempts + 1
      setWrongAttempts(newWrongAttempts)
      
      if (newWrongAttempts >= 3) {
        // Play toast sound immediately
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
      
      const newHearts = Math.max(0, hearts - 1)
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
      setInputs(Array(question.inputCount).fill(""))
      setAnswered(false)
      setIsCorrect(false)
      setWrongAttempts(0)
      onNext()
    } else {
      setInputs(Array(question.inputCount).fill(""))
      setAnswered(false)
      setIsCorrect(false)
    }
  }

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs]
    newInputs[index] = value
    setInputs(newInputs)
  }

  const allFilled = inputs.every(inp => inp.trim().length > 0)

  return (
    <>
      <NoHeartsModal isOpen={showNoHeartsModal} />
      
      <div className="max-w-4xl mx-auto px-6 pb-32">
        <div className="py-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-black text-left leading-relaxed">
            {question.question}
          </h2>
        </div>

        <div className="space-y-4">
          {inputs.map((input, index) => (
            <input
              key={index}
              type="text"
              value={input}
              onChange={(e) => handleInputChange(index, e.target.value)}
              disabled={answered}
              placeholder={question.placeholder || `Answer ${index + 1}...`}
              className={`w-full p-6 rounded-2xl border-2 border-b-4 text-xl font-semibold transition-all ${
                answered
                  ? isCorrect
                    ? "border-green-500 border-b-green-600 bg-green-50 text-black"
                    : "border-red-500 border-b-red-600 bg-red-50 text-black"
                  : "border-gray-200 border-b-gray-300 bg-white text-black focus:border-green-500 focus:outline-none"
              }`}
            />
          ))}
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
                disabled={!allFilled}
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
