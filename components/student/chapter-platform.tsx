"use client"

import { useState } from "react"
import Link from "next/link"

interface ChapterPlatformProps {
  chapterId: number
  levelIndex: number
  chapterColor: string
  chapterTitle: string
  isCompleted?: boolean
  isEven?: boolean // For zigzag positioning
}

export default function ChapterPlatform({
  chapterId,
  levelIndex,
  chapterColor,
  chapterTitle,
  isCompleted = false,
  isEven = false,
}: ChapterPlatformProps) {
  const [isHovered, setIsHovered] = useState(false)
  const progressPercentage = levelIndex * 16.67

  return (
    <Link href={`/student/learn/${chapterId}/${levelIndex}`}>
      <div
        className={`relative group cursor-pointer my-8 flex justify-center transition-transform duration-300 z-20 ${
          isEven ? "mr-24" : "ml-24"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-32 h-24">
          {/* Base shadow layers for depth */}
          <div
            className="absolute inset-0 rounded-full blur-3xl opacity-25"
            style={{
              backgroundColor: chapterColor,
              transform: "perspective(800px) rotateX(75deg) translateZ(-20px)",
            }}
          />

          {/* White bottom edge for 3D effect */}
          <div
            className="absolute bottom-0 left-2 right-2 h-2 rounded-full"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              transform: "perspective(800px) rotateX(60deg)",
            }}
          />

          {/* Main circle with isometric perspective and tilt */}
          <div
            className={`absolute inset-0 rounded-full flex items-center justify-center font-bold text-2xl text-white transition-all duration-300 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            style={{
              backgroundColor: isCompleted ? "#F4D03F" : chapterColor,
              boxShadow: `
                0 12px 24px rgba(0, 0, 0, 0.2),
                0 6px 12px rgba(0, 0, 0, 0.15),
                inset -2px -2px 4px rgba(0, 0, 0, 0.1)
              `,
              transform: "perspective(1200px) rotateX(8deg) rotateZ(-5deg)",
              borderWidth: "2px",
              borderStyle: "solid",
              borderColor: "rgba(255, 255, 255, 0.3)",
            }}
          >
            {isCompleted ? "✓" : "⭐"}
          </div>

          {/* Progress ring for incomplete levels */}
          {!isCompleted && (
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 128 96"
              style={{
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
              }}
            >
              {/* Background ring */}
              <ellipse cx="64" cy="48" rx="56" ry="42" fill="none" stroke="#E0E0E0" strokeWidth="2" />
              {/* Progress ring */}
              <ellipse
                cx="64"
                cy="48"
                rx="56"
                ry="42"
                fill="none"
                stroke={chapterColor}
                strokeWidth="2"
                strokeDasharray={`${2 * Math.PI * 49}`}
                strokeDashoffset={`${2 * Math.PI * 49 * (1 - progressPercentage / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-500"
                style={{
                  transform: "perspective(800px) rotateX(8deg) rotateZ(-5deg)",
                  transformOrigin: "50% 50%",
                }}
              />
            </svg>
          )}
        </div>

        {/* Hover tooltip */}
        {isHovered && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 bg-black text-white px-3 py-2 rounded-md text-xs whitespace-nowrap z-10 pointer-events-none">
            <p className="font-semibold">Level {levelIndex}</p>
            {!isCompleted && <p className="text-gray-300">{progressPercentage.toFixed(0)}% Progress</p>}
            {isCompleted && <p className="text-green-300">Completed!</p>}
          </div>
        )}
      </div>
    </Link>
  )
}
