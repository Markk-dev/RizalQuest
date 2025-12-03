"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

// Chapter data from storyline.txt
const CHAPTERS = [
  {
    chapter: 1,
    title: "Childhood and Early Life",
    description: "The beginning of a national hero's journey",
    story: "In the peaceful town of Calamba, a boy named José Protasio Rizal Mercado y Alonso Realonda lived in a big family with 11 children. Everyone called him Pepe, but his full name was very long and special! He was the 7th child in the middle of his big family. His older brother Paciano guided him, and his mother Teodora was his very first teacher. When Pepe was only three years old, his mother taught him the alphabet and told him the story of the moth that flew too close to the flame and got burned. Pepe believed his talents came from God, who gave him a special gift.\nPepe loved reading, drawing, and making little clay figures like a sculptor. He surprised his family with his art. He rode his pony Alipato around town, while his big black dog Usman ran happily beside him. His parents also taught him good manners and to be kind to everyone, even his younger siblings. His younger sisters Trinidad and Narcisa loved to play with him and learn from him too. These happy days in Calamba helped shape José Rizal, a smart, kind, and curious boy who would later become a great hero for his country."
  },
  {
    chapter: 2,
    title: "Student Years",
    description: "Education and intellectual awakening",
    story: "When Pepe grew older, he went to school in Manila. He studied at Ateneo, a school run by Jesuit priests, and later at the University of Santo Tomas, run by the Dominican priests. At first he was shy and small, and some boys teased him. But Pepe worked very hard, learned Spanish, and often earned the grade \"sobresaliente,\" which means excellent. He even learned fencing, wrestling, and how to measure land like a land surveyor, showing he was strong in body and mind.\nPepe decided to study medicine and become a doctor for the eyes, an eye doctor, because he wanted to help cure his mother's poor eyesight. In school he also loved writing poems and essays. He wrote a poem telling the youth that they are the \"hope of the fatherland.\" He studied science, math, and many other subjects, always polite and disciplined. His school years prepared him for the bigger challenges he would face for his country."
  }
]

export default function StoryPage() {
  const params = useParams()
  const router = useRouter()
  const chapterId = Number(params.chapterId)
  const [currentPage, setCurrentPage] = useState(0)

  const chapterData = CHAPTERS.find((c) => c.chapter === chapterId)

  if (!chapterData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <p className="text-gray-500">Chapter not found</p>
      </div>
    )
  }

  // Split story into 3 pages
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

  const pages = splitStoryIntoPages(chapterData.story)
  const totalPages = 3

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    } else {
      router.push("/student/learn")
    }
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleClose = () => {
    router.push("/student/learn")
  }

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-200 shrink-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={handleClose}
            className="p-2 rounded-xl bg-red-500 hover:bg-red-600 text-white border-2 border-red-600 border-b-4 border-b-red-700 active:translate-y-[2px] active:border-b-2 transition-all"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-6 py-8">
          <div className="h-full flex flex-col md:flex-row gap-8">
            {/* Left side - Image */}
            <div className="md:w-[400px] shrink-0">
              <Image
                src={`/chapters/Chapter${chapterId}.png`}
                alt={chapterData.title}
                width={400}
                height={500}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Right side - Story */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-green-600">
                  Chapter {chapterId}: {chapterData.title}
                </h2>
                <p className="text-lg text-gray-600 mt-2">
                  {chapterData.description}
                </p>
              </div>

              <div className="flex-1 overflow-y-auto mb-6 pr-2">
                <p className="text-lg md:text-xl text-gray-800 leading-relaxed whitespace-pre-line">
                  {pages[currentPage]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons - Full width at bottom */}
      <div className="border-t-2 border-gray-200 bg-white shrink-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
                <Button
                  onClick={handlePrevious}
                  disabled={currentPage === 0}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl border-2 border-gray-600 border-b-4 border-b-gray-700 active:translate-y-[2px] active:border-b-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} />
                  Previous
                </Button>
                
                {/* Dot indicators */}
                <div className="flex gap-2">
                  {[0, 1, 2].map((index) => (
                    <div
                      key={index}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        index === currentPage ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                
                <Button
                  onClick={handleNext}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl border-2 border-green-600 border-b-4 border-b-green-700 active:translate-y-[2px] active:border-b-2 transition-all"
                >
                  {currentPage < totalPages - 1 ? (
                    <>
                      Next
                      <ChevronRight size={20} />
                    </>
                  ) : (
                    "Finish"
                  )}
                </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
