"use client"

import { useEffect, useState } from "react"
import { CHAPTERS, LEVELS_PER_CHAPTER } from "@/lib/constants"
import { LessonButton } from "./lesson-button"
import { UnitBanner } from "@/components/ui/unit-banner"
import { MapCharacter } from "@/components/ui/map-character"

export default function ChapterGrid() {
  const [completedLevels, setCompletedLevels] = useState<Set<string>>(new Set())
  const [currentLevel, setCurrentLevel] = useState({ chapter: 1, level: 1 })
  const [shouldScroll, setShouldScroll] = useState(false)

  useEffect(() => {
    // Load progress from database
    async function loadUserProgress() {
      try {
        const { loadProgress } = await import("@/lib/progress-sync")
        const progress = await loadProgress()
        
        if (progress) {
          // Load from database
          const completed = progress.completedLevels 
            ? JSON.parse(progress.completedLevels) 
            : []
          setCompletedLevels(new Set(completed))
          setCurrentLevel({
            chapter: progress.currentChapter,
            level: progress.currentLevel,
          })
          setShouldScroll(true)
          
          // Also update localStorage for offline access
          localStorage.setItem("completedLevels", JSON.stringify(completed))
          localStorage.setItem("currentLevel", JSON.stringify({
            chapter: progress.currentChapter,
            level: progress.currentLevel,
          }))
        } else {
          // Fallback to localStorage
          const saved = localStorage.getItem("completedLevels")
          if (saved) {
            setCompletedLevels(new Set(JSON.parse(saved)))
          }

          const savedCurrent = localStorage.getItem("currentLevel")
          if (savedCurrent) {
            setCurrentLevel(JSON.parse(savedCurrent))
            setShouldScroll(true)
          }
        }
      } catch (error) {
        console.error("Error loading progress:", error)
        // Fallback to localStorage
        const saved = localStorage.getItem("completedLevels")
        if (saved) {
          setCompletedLevels(new Set(JSON.parse(saved)))
        }

        const savedCurrent = localStorage.getItem("currentLevel")
        if (savedCurrent) {
          setCurrentLevel(JSON.parse(savedCurrent))
          setShouldScroll(true)
        }
      }
    }

    loadUserProgress()
  }, [])

  // Auto-scroll to current chapter
  useEffect(() => {
    if (shouldScroll && currentLevel.chapter > 1) {
      const timer = setTimeout(() => {
        const chapterElement = document.getElementById(`chapter-${currentLevel.chapter}`)
        if (chapterElement) {
          chapterElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 300) // Small delay to ensure DOM is ready
      
      return () => clearTimeout(timer)
    }
  }, [shouldScroll, currentLevel.chapter])

  return (
    <div className="relative w-full pb-32">
      {CHAPTERS.map((chapter) => (
        <div key={chapter.id} id={`chapter-${chapter.id}`} className="w-full mb-8">
          {/* Chapter Banner */}
          <div className="mb-6">
            <UnitBanner title={`Chapter ${chapter.id}: ${chapter.title}`} description={chapter.description} chapterId={chapter.id} />
          </div>

          {/* Vertical winding path with lesson buttons */}
          <div className="relative w-full flex flex-col items-center gap-2">
            {/* Character for Chapter 1 */}
            {chapter.id === 1 && (
              <MapCharacter 
                characterSrc="/characters/Char02_cheer.png"
                 hoverSrc="/characters/Char02_idle.png"
                position={{ right: "16", top: "300px" }}
                shadowConfig={{ 
                    blur: "5px"
                  }}
              />
            )}
            
            {/* Characters for Chapter 2 */}
            {chapter.id === 2 && (
              <>
                <MapCharacter 
                  characterSrc="/characters/Char01_idle.png"
                  position={{ left: "0", top: "10px" }}
                  hoverSrc="/characters/Char01_interact.png"
                   shadowConfig={{ 
                    top: "top-40.5",
                    width: "w-25",
                    height: "h-8",
                    blur: "2px"
                  }}
                />
                <MapCharacter 
                  characterSrc="/characters/Char02_thinking.png"
                  position={{ right: "20", top: "220px" }}
                  shadowConfig={{ 
                    top: "top-40.5",
                    width: "w-25",
                    height: "h-8",
                    blur: "2px"
                  }}
                />
              </>
            )}
            
            {/* Character for Chapter 3 */}
            {chapter.id === 3 && (
              <MapCharacter 
                characterSrc="/characters/Female_shove.png"
                hoverSrc="/characters/Female_idle.png"
                position={{ right: "35", top: "230px" }}
                 shadowConfig={{ 
                    top: "top-40.5",
                    width: "w-25",
                    height: "h-8",
                    blur: "3px"
                  }}
              /> 
            )}
            
            {/* Characters for Chapter 4 */}
            {chapter.id === 4 && (
              <>
                <MapCharacter 
                  characterSrc="/characters/Char02_switch0.png"
                  hoverSrc="/characters/Char02_switch1.png"
                  position={{ left: "8", top: "120px" }}
                />
              </>
            )}
            
            {/* Character for Chapter 5 */}
            {chapter.id === 5 && (
              <MapCharacter 
                characterSrc="/characters/Female_thinking.png"
                position={{ left: "12", top: "350px" }}
              />
            )}
            
            {/* Character for Chapter 6 */}
            {chapter.id === 6 && (
              <MapCharacter 
                characterSrc="/characters/Char01_cheer.png"
                position={{ right: "16", top: "270px" }}
                hoverSrc="/characters/Char01_idle.png"
              />
            )}
            
            {/* Character for Chapter 7 */}
            {chapter.id === 7 && (
              <MapCharacter 
                characterSrc="/characters/Char02_hold.png"
                position={{ left: "10", top: "50px" }}
              />
            )}
            
            {/* Characters for Chapter 8 */}
            {chapter.id === 8 && (
              <>
                <MapCharacter 
                  characterSrc="/characters/Char01_shove.png"
                  position={{ left: "15", top: "50px" }}
                />
                <MapCharacter 
                  characterSrc="/characters/Char02_thinking.png"
                  position={{ right: "15", top: "400px" }}
                />
              </>
            )}
            
            {Array.from({ length: LEVELS_PER_CHAPTER }).map((_, levelIndex) => {
              const levelId = levelIndex + 1
              const totalLevels = LEVELS_PER_CHAPTER
              const levelKey = `${chapter.id}-${levelId}`

              const isCompleted = completedLevels.has(levelKey)
              const isCurrent = currentLevel.chapter === chapter.id && currentLevel.level === levelId
              const isLocked = !isCompleted && !isCurrent

              // Calculate how many levels are completed in this chapter
              const completedInChapter = Array.from({ length: LEVELS_PER_CHAPTER })
                .filter((_, idx) => completedLevels.has(`${chapter.id}-${idx + 1}`))
                .length

              // Progress percentage: (completed levels / total levels) * 100
              const percentage = (completedInChapter / LEVELS_PER_CHAPTER) * 100

              return (
                <LessonButton
                  key={levelKey}
                  id={chapter.id * 100 + levelId}
                  index={levelIndex}
                  totalCount={totalLevels}
                  locked={isLocked}
                  current={isCurrent}
                  percentage={percentage}
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
