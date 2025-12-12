"use client"

import { useEffect, useState } from "react"
import Confetti from "react-confetti"
import Image from "next/image"

interface ChapterCompleteModalProps {
  isOpen: boolean
  chapterNumber: number
  chapterTitle: string
  onNext: () => void
}

const CHEER_CHARACTERS = [
  "/characters/Char01_cheer.png",
  "/characters/Char02_cheer.png",
  "/characters/Female_cheer.png",
]

export default function ChapterCompleteModal({
  isOpen,
  chapterNumber,
  chapterTitle,
  onNext,
}: ChapterCompleteModalProps) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [randomCharacter, setRandomCharacter] = useState("")

  useEffect(() => {
    if (isOpen) {
      // Set window size for confetti
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })

      // Pick random character
      const randomIndex = Math.floor(Math.random() * CHEER_CHARACTERS.length)
      setRandomCharacter(CHEER_CHARACTERS[randomIndex])

      // Play celebration sound when modal opens
      try {
        const celebrationAudio = new Audio("/sounds/success.ogg")
        celebrationAudio.volume = 0.7
        celebrationAudio
          .play()
          .catch((err) =>
            console.error("Celebration audio play failed:", err)
          )
      } catch (error) {
        console.error("Celebration audio error:", error)
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Confetti Effect */}
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        numberOfPieces={500}
        gravity={0.3}
      />

      {/* Modal Overlay - Higher z-index and darker */}
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]">
        <div className="bg-white rounded-3xl p-8 max-w-[480px] w-full mx-4 text-center border-2 border-b-8 border-green-500 shadow-2xl">
          {/* Character with Shadow */}
          <div className="relative mb-4 flex justify-center">
            <div className="relative">
              {/* Character Shadow */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-7 rounded-full"
                style={{
                  background:
                    "radial-gradient(ellipse, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.15) 40%, transparent 70%)",
                  filter: "blur(6px)",
                }}
              />
              {/* Character Image */}
              {randomCharacter && (
                <Image
                  src={randomCharacter}
                  alt="Celebrating character"
                  width={180}
                  height={180}
                  className="relative"
                />
              )}
            </div>
          </div>

          {/* Congratulations Text */}
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Congratulations!
          </h2>

          {/* Chapter Info */}
          <p className="text-xl font-bold text-green-600 mb-3">
            Chapter {chapterNumber}: {chapterTitle}
          </p>
          
          {/* Encouraging Message */}
          <p className="text-sm text-gray-500 mb-6">
            Great job! Keep learning about José Rizal's inspiring journey.
          </p>

          {/* Next Button */}
          <button
            onClick={onNext}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl border-2 border-green-600 border-b-4 border-b-green-700 active:border-b-2 transition-all uppercase tracking-wide"
          >
            Next Chapter
          </button>
        </div>
      </div>
    </>
  )
}
