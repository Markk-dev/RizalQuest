"use client"

import { X } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface QuizHeaderProps {
  hearts: number
  progress: number
}

export default function QuizHeader({ hearts, progress }: QuizHeaderProps) {
  const router = useRouter()

  const handleExit = () => {
    router.push("/student/learn")
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        {/* Exit Button */}
        <button
          onClick={handleExit}
          className="text-gray-400 hover:text-gray-500 transition shrink-0"
        >
          <X size={24} strokeWidth={2} />
        </button>

        {/* Progress Bar */}
        <div className="flex-1">
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Hearts */}
        <div className="flex items-center gap-2 shrink-0">
          <Image src="/heart.svg" alt="Hearts" width={28} height={28} />
          <span className="text-rose-500 font-bold text-xl">{hearts}</span>
        </div>
      </div>
    </header>
  )
}
