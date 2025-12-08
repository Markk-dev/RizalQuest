"use client"

import { useState, useEffect } from "react"
import { Crown, Star, Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CircularProgressbarWithChildren } from "react-circular-progressbar"
import { cn } from "@/lib/utils"
import NoHeartsModal from "./no-hearts-modal"

import "react-circular-progressbar/dist/styles.css"

type LessonButtonProps = {
  id: number
  index: number
  totalCount: number
  locked?: boolean
  current?: boolean
  percentage: number
}

export const LessonButton = ({ id, index, totalCount, locked, current, percentage }: LessonButtonProps) => {
  const router = useRouter()
  const [hasHearts, setHasHearts] = useState(true)
  const [showNoHeartsModal, setShowNoHeartsModal] = useState(false)
  
  useEffect(() => {
    // Check hearts on client side only
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    setHasHearts((user.hearts ?? 5) > 0)
    
    // Listen for heart updates
    const handleHeartsUpdated = (event: any) => {
      setHasHearts(event.detail.hearts > 0)
    }
    window.addEventListener("heartsUpdated", handleHeartsUpdated)
    
    return () => {
      window.removeEventListener("heartsUpdated", handleHeartsUpdated)
    }
  }, [])
  
  const isClickable = !locked && hasHearts
  const cycleLength = 8
  const cycleIndex = index % cycleLength

  let indentationLevel

  if (cycleIndex <= 2) indentationLevel = cycleIndex
  else if (cycleIndex <= 4) indentationLevel = 4 - cycleIndex
  else if (cycleIndex <= 6) indentationLevel = 4 - cycleIndex
  else indentationLevel = cycleIndex - 8

  const rightPosition = indentationLevel * 40

  const isFirst = index === 0
  const isLast = index === totalCount - 1
  const isCompleted = !current && !locked

  // Icon logic: Check for completed, Crown for last, Star for others
  const Icon = isCompleted ? Check : isLast ? Crown : Star

  // Extract chapter and level from id (format: chapterId * 100 + levelId)
  const chapterId = Math.floor(id / 100)
  const levelId = id % 100
  const href = locked ? "#" : `/student/learn/${chapterId}/${levelId}`

  // Chapter color mapping
  const chapterColors = {
    1: { bg: "bg-green-500", border: "bg-green-600", hover: "hover:bg-green-600", stroke: "#22c55e", text: "text-green-500" },
    2: { bg: "bg-blue-500", border: "bg-blue-600", hover: "hover:bg-blue-600", stroke: "#3b82f6", text: "text-blue-500" },
    3: { bg: "bg-orange-500", border: "bg-orange-600", hover: "hover:bg-orange-600", stroke: "#f97316", text: "text-orange-500" },
    4: { bg: "bg-purple-500", border: "bg-purple-600", hover: "hover:bg-purple-600", stroke: "#a855f7", text: "text-purple-500" },
    5: { bg: "bg-red-500", border: "bg-red-600", hover: "hover:bg-red-600", stroke: "#ef4444", text: "text-red-500" },
    6: { bg: "bg-teal-500", border: "bg-teal-600", hover: "hover:bg-teal-600", stroke: "#14b8a6", text: "text-teal-500" },
    7: { bg: "bg-yellow-500", border: "bg-yellow-600", hover: "hover:bg-yellow-600", stroke: "#eab308", text: "text-yellow-500" },
    8: { bg: "bg-amber-500", border: "bg-amber-600", hover: "hover:bg-amber-600", stroke: "#f59e0b", text: "text-amber-500" },
  }

  const colors = chapterColors[chapterId as keyof typeof chapterColors] || chapterColors[1]
  
  const playClickSound = () => {
    const audio = new Audio('/sounds/platform_clicked.ogg')
    audio.volume = 0.5
    audio.play().catch(err => console.log('Audio play failed:', err))
  }
  
  const handleClick = (e: React.MouseEvent) => {
    if (!hasHearts && !locked) {
      e.preventDefault()
      setShowNoHeartsModal(true)
      return
    }
    
    if (isClickable) {
      playClickSound()
    }
  }

  return (
    <>
      <NoHeartsModal isOpen={showNoHeartsModal} />
      
      <Link href={href} aria-disabled={!isClickable} style={{ pointerEvents: isClickable ? "auto" : "none" }} onClick={handleClick}>
      <div
        className="relative"
        style={{
          right: `${rightPosition}px`,
          marginTop: isFirst && !isCompleted ? 60 : 24,
        }}
      >
        {current ? (
          <div className="relative h-[102px] w-[102px]">
            <div className={cn("absolute -top-6 left-2.5 z-10 animate-bounce rounded-xl border-2 bg-white px-3 py-2.5 font-bold uppercase tracking-wide", colors.text)}>
              Start
              <div
                className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 transform border-x-8 border-t-8 border-x-transparent"
                aria-hidden
              />
            </div>
            <CircularProgressbarWithChildren
              value={Number.isNaN(percentage) ? 0 : percentage}
              styles={{
                path: {
                  stroke: colors.stroke,
                },
                trail: {
                  stroke: "#e5e7eb",
                },
              }}
            >
              <button
                className={cn(
                  "h-[70px] w-[70px] rounded-full border-2 border-b-[6px] transition-all flex items-center justify-center active:border-b-2",
                  colors.bg, colors.border, colors.hover
                )}
              >
                <Icon className="h-10 w-10 fill-white stroke-white text-white stroke-3" />
              </button>
            </CircularProgressbarWithChildren>
          </div>
        ) : (
          <button
            className={cn(
              "h-[70px] w-[70px] rounded-full border-2 border-b-[6px] flex items-center justify-center transition-all active:border-b-2",
              isCompleted
                ? cn(colors.bg, colors.border, colors.hover)
                : "bg-gray-200 border-gray-300 cursor-not-allowed opacity-60"
            )}
            disabled={locked}
          >
            <Icon
              className={cn(
                "h-10 w-10",
                isCompleted
                  ? "fill-none stroke-white text-white stroke-4"
                  : "fill-gray-400 stroke-gray-400 text-gray-400"
              )}
            />
          </button>
        )}
      </div>
    </Link>
    </>
  )
}
