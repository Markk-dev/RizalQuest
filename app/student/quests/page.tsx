"use client"

import { useState, useEffect } from "react"
import { Trophy } from "lucide-react"

export default function QuestsPage() {
  const [achievements, setAchievements] = useState<any[]>([])

  useEffect(() => {
    // Load completed levels from localStorage
    const completedLevels = JSON.parse(localStorage.getItem("completedLevels") || "[]")
    
    // Define all achievements
    const allAchievements = [
      {
        id: "chapter_1",
        title: "Chapter 1: Childhood",
        description: "Complete all 5 levels in Chapter 1",
        chapter: 1,
        completed: ["1-1", "1-2", "1-3", "1-4", "1-5"].every(level => completedLevels.includes(level))
      },
      {
        id: "chapter_2",
        title: "Chapter 2: Student Years",
        description: "Complete all 5 levels in Chapter 2",
        chapter: 2,
        completed: ["2-1", "2-2", "2-3", "2-4", "2-5"].every(level => completedLevels.includes(level))
      },
      {
        id: "chapter_3",
        title: "Chapter 3: Travels Abroad",
        description: "Complete all 5 levels in Chapter 3",
        chapter: 3,
        completed: ["3-1", "3-2", "3-3", "3-4", "3-5"].every(level => completedLevels.includes(level))
      },
      {
        id: "chapter_4",
        title: "Chapter 4: Noli Me Tangere",
        description: "Complete all 5 levels in Chapter 4",
        chapter: 4,
        completed: ["4-1", "4-2", "4-3", "4-4", "4-5"].every(level => completedLevels.includes(level))
      },
      {
        id: "chapter_5",
        title: "Chapter 5: Return to Philippines",
        description: "Complete all 5 levels in Chapter 5",
        chapter: 5,
        completed: ["5-1", "5-2", "5-3", "5-4", "5-5"].every(level => completedLevels.includes(level))
      },
      {
        id: "chapter_6",
        title: "Chapter 6: El Filibusterismo",
        description: "Complete all 5 levels in Chapter 6",
        chapter: 6,
        completed: ["6-1", "6-2", "6-3", "6-4", "6-5"].every(level => completedLevels.includes(level))
      },
      {
        id: "chapter_7",
        title: "Chapter 7: Exile in Dapitan",
        description: "Complete all 5 levels in Chapter 7",
        chapter: 7,
        completed: ["7-1", "7-2", "7-3", "7-4", "7-5"].every(level => completedLevels.includes(level))
      },
      {
        id: "chapter_8",
        title: "Chapter 8: Final Days",
        description: "Complete all 5 levels in Chapter 8",
        chapter: 8,
        completed: ["8-1", "8-2", "8-3", "8-4", "8-5"].every(level => completedLevels.includes(level))
      },
      {
        id: "half_way",
        title: "Halfway There",
        description: "Complete 4 chapters",
        chapter: null,
        completed: [1, 2, 3, 4].every(ch => 
          ["1", "2", "3", "4", "5"].every(lv => completedLevels.includes(`${ch}-${lv}`))
        )
      },
      {
        id: "master",
        title: "Rizal Master",
        description: "Complete all 8 chapters",
        chapter: null,
        completed: [1, 2, 3, 4, 5, 6, 7, 8].every(ch => 
          ["1", "2", "3", "4", "5"].every(lv => completedLevels.includes(`${ch}-${lv}`))
        )
      }
    ]
    
    setAchievements(allAchievements)
  }, [])

  const getChapterTheme = (chapter: number | null) => {
    if (!chapter) {
      return {
        bg: 'bg-yellow-50',
        border: 'border-yellow-400',
        borderBottom: 'border-b-yellow-500',
        iconBg: 'bg-yellow-200',
        iconColor: 'text-yellow-600',
        badge: 'bg-yellow-500'
      }
    }

    const themes: Record<number, any> = {
      1: {
        bg: 'bg-green-50',
        border: 'border-green-400',
        borderBottom: 'border-b-green-500',
        iconBg: 'bg-green-200',
        iconColor: 'text-green-600',
        badge: 'bg-green-500'
      },
      2: {
        bg: 'bg-blue-50',
        border: 'border-blue-400',
        borderBottom: 'border-b-blue-500',
        iconBg: 'bg-blue-200',
        iconColor: 'text-blue-600',
        badge: 'bg-blue-500'
      },
      3: {
        bg: 'bg-orange-50',
        border: 'border-orange-400',
        borderBottom: 'border-b-orange-500',
        iconBg: 'bg-orange-200',
        iconColor: 'text-orange-600',
        badge: 'bg-orange-500'
      },
      4: {
        bg: 'bg-purple-50',
        border: 'border-purple-400',
        borderBottom: 'border-b-purple-500',
        iconBg: 'bg-purple-200',
        iconColor: 'text-purple-600',
        badge: 'bg-purple-500'
      },
      5: {
        bg: 'bg-pink-50',
        border: 'border-pink-400',
        borderBottom: 'border-b-pink-500',
        iconBg: 'bg-pink-200',
        iconColor: 'text-pink-600',
        badge: 'bg-pink-500'
      },
      6: {
        bg: 'bg-red-50',
        border: 'border-red-400',
        borderBottom: 'border-b-red-500',
        iconBg: 'bg-red-200',
        iconColor: 'text-red-600',
        badge: 'bg-red-500'
      },
      7: {
        bg: 'bg-teal-50',
        border: 'border-teal-400',
        borderBottom: 'border-b-teal-500',
        iconBg: 'bg-teal-200',
        iconColor: 'text-teal-600',
        badge: 'bg-teal-500'
      },
      8: {
        bg: 'bg-indigo-50',
        border: 'border-indigo-400',
        borderBottom: 'border-b-indigo-500',
        iconBg: 'bg-indigo-200',
        iconColor: 'text-indigo-600',
        badge: 'bg-indigo-500'
      }
    }

    return themes[chapter] || themes[1]
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-black mb-8">Achievements</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => {
          const theme = getChapterTheme(achievement.chapter)
          const isCompleted = achievement.completed
          
          return (
            <div 
              key={achievement.id} 
              className={`rounded-xl border-2 border-b-4 p-6 transition-all ${
                isCompleted 
                  ? `${theme.bg} ${theme.border} ${theme.borderBottom}` 
                  : 'bg-white border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`p-4 rounded-full mb-3 ${
                  isCompleted ? theme.iconBg : 'bg-gray-200'
                }`}>
                  <Trophy size={32} className={isCompleted ? theme.iconColor : 'text-gray-400'} />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">{achievement.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                {isCompleted && (
                  <div className="mt-2">
                    <span className={`inline-block ${theme.badge} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                      ✓ Completed
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
