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

  const playExitSound = () => {
    const audio = new Audio('/sounds/platform_clicked.ogg')
    audio.volume = 0.5
    audio.play().catch((err) => console.log('Audio play failed:', err))
  }

  const handleExit = () => {
    playExitSound()
    router.push("/student/learn")
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50">
      <div className="flex items-center gap-4 px-4 py-4">
        {/* Exit Button - In corner */}
        <button
          onClick={handleExit}
          className="p-2 rounded-xl bg-red-500 hover:bg-red-600 text-white border-2 border-red-600 border-b-4 border-b-red-700 active:translate-y-[2px] active:border-b-2 transition-all shrink-0"
        >
          <X size={20} strokeWidth={3} />
        </button>

        {/* Progress Bar */}
        <div className="flex-1 max-w-3xl mx-auto">
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
