"use client"

import { useEffect, useState } from "react"
import { CHAPTERS, LEVELS_PER_CHAPTER } from "@/lib/constants"
import { LessonButton } from "./lesson-button"
import { UnitBanner } from "@/components/ui/unit-banner"

export default function ChapterGrid() {
  const [completedLevels, setCompletedLevels] = useState<Set<string>>(new Set())
  const [currentLevel, setCurrentLevel] = useState({ chapter: 1, level: 1 })

  useEffect(() => {
    // Load progress from localStorage
    const saved = localStorage.getItem("completedLevels")
    if (saved) {
      setCompletedLevels(new Set(JSON.parse(saved)))
    }

    const savedCurrent = localStorage.getItem("currentLevel")
    if (savedCurrent) {
      setCurrentLevel(JSON.parse(savedCurrent))
    }
  }, [])

  return (
    <div className="relative w-full pb-32">
      {CHAPTERS.map((chapter) => (
        <div key={chapter.id} className="w-full mb-8">
          {/* Chapter Banner */}
          <div className="mb-6">
            <UnitBanner title={`Chapter ${chapter.id}: ${chapter.title}`} description={chapter.description} chapterId={chapter.id} />
          </div>

          {/* Vertical winding path with lesson buttons */}
          <div className="relative w-full flex flex-col items-center gap-2">
            {Array.from({ length: LEVELS_PER_CHAPTER }).map((_, levelIndex) => {
              const levelId = levelIndex + 1
              const totalLevels = LEVELS_PER_CHAPTER
              const levelKey = `${chapter.id}-${levelId}`

              const isCompleted = completedLevels.has(levelKey)
              const isCurrent = currentLevel.chapter === chapter.id && currentLevel.level === levelId
              const isLocked = !isCompleted && !isCurrent

              return (
                <LessonButton
                  key={levelKey}
                  id={chapter.id * 100 + levelId}
                  index={levelIndex}
                  totalCount={totalLevels}
                  locked={isLocked}
                  current={isCurrent}
                  percentage={isCompleted ? 100 : isCurrent ? 50 : 0}
                />
              )
            })}
          </div>

          {/* Connecting line between chapters */}
          {chapter.id < CHAPTERS.length && (
            <div className="flex justify-center mt-8 mb-8">
              <div
                className="w-1 h-12 rounded-full"
                style={{
                  backgroundImage: `linear-gradient(to bottom, ${chapter.color}66, transparent)`,
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
