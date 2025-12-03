"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface NoHeartsModalProps {
  isOpen: boolean
}

export default function NoHeartsModal({ isOpen }: NoHeartsModalProps) {
  const router = useRouter()

  if (!isOpen) return null

  const handleGoHome = () => {
    router.push("/student/learn")
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center border-2 border-green-500">
        <div className="mb-6">
          <svg 
            className="w-20 h-20 mx-auto text-red-500 fill-red-500" 
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          You're out of hearts!
        </h2>
        
        <p className="text-gray-600 mb-6">
          Hearts regenerate over time. Come back later to continue learning!
        </p>

        <button 
          onClick={handleGoHome}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl border-2 border-green-600 border-b-4 border-b-green-700 active:border-b-2 transition-all uppercase tracking-wide"
        >
          Go Home
        </button>
      </div>
    </div>
  )
}
