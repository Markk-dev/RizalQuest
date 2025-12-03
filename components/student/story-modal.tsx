"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface StoryModalProps {
  isOpen: boolean
  onClose: () => void
  chapterId: number
  chapterTitle: string
  story: string
}

export default function StoryModal({ isOpen, onClose, chapterId, chapterTitle, story }: StoryModalProps) {
  const [currentPage, setCurrentPage] = useState(0)
  
  // Split story into exactly 3 pages
  const splitStoryIntoPages = (text: string) => {
    const sentences = text.split('. ')
    const totalSentences = sentences.length
    const sentencesPerPage = Math.ceil(totalSentences / 3)
    
    const pages: string[] = []
    for (let i = 0; i < 3; i++) {
      const start = i * sentencesPerPage
      const end = Math.min(start + sentencesPerPage, totalSentences)
      const pageText = sentences.slice(start, end).join('. ')
      if (pageText.trim()) {
        pages.push(pageText.trim() + (pageText.endsWith('.') ? '' : '.'))
      }
    }
    
    return pages
  }

  const pages = splitStoryIntoPages(story)
  const totalPages = 3

  useEffect(() => {
    if (isOpen) {
      setCurrentPage(0)
    }
  }, [isOpen])

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    } else {
      // Auto close when all pages are read
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl border-4 border-green-500 flex flex-col md:flex-row overflow-hidden max-w-2xl">
        {/* Left side - Image (40% width) - Image determines the height */}
        <div className="bg-green-50 border-b-4 md:border-b-0 md:border-r-4 border-green-500 md:w-[40%]">
          <Image
            src={`/chapters/Chapter${chapterId}.png`}
            alt={chapterTitle}
            width={240}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side - Story (60% width) - Matches image height */}
        <div className="p-4 flex flex-col md:w-[60%]">
          <div className="mb-2 shrink-0">
            <h2 className="text-xl md:text-2xl font-bold text-green-600 mb-2">
              {chapterTitle}
            </h2>
            {/* Dot indicators */}
            <div className="flex gap-2">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentPage ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto mb-2 min-h-0">
            <p className="text-xs text-gray-800 leading-relaxed">
              {pages[currentPage]}
            </p>
          </div>

          <div className="flex justify-end shrink-0">
            <Button
              onClick={handleNext}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl border-2 border-green-600 border-b-4 border-b-green-700 active:border-b-2 transition-all uppercase tracking-wide text-xs"
            >
              {currentPage < totalPages - 1 ? "NEXT" : "FINISH"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
