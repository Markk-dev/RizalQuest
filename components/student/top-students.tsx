"use client"

import { useState, useEffect } from "react"
import { Trophy, Medal } from "lucide-react"

interface Student {
  id: string
  username: string
  fullName: string
  xp: number
  completedLevels: number
  currentChapter: number
  accuracy: number
}

export default function TopStudents() {
  const [topStudents, setTopStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [currentUserId, setCurrentUserId] = useState<string>("")

  useEffect(() => {
    // Get current user ID once
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    setCurrentUserId(user.$id || "")

    const fetchTopStudents = async () => {
      try {
        const response = await fetch("/api/leaderboard/top-students")
        const data = await response.json()
        setTopStudents(data.topStudents || [])
      } catch (error) {
        console.error("Failed to fetch top students:", error)
      } finally {
        setLoading(false)
      }
    }

    // Initial fetch
    fetchTopStudents()

    // Set up polling every 5 seconds
    const pollInterval = setInterval(() => {
      fetchTopStudents()
    }, 5000)

    // Cleanup interval on unmount
    return () => clearInterval(pollInterval)
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
          <Trophy className="text-yellow-500" size={28} />
          Top 5 Students
        </h2>
        <div className="text-center py-8 text-gray-500">Loading...</div>
      </div>
    )
  }

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="text-yellow-500" size={20} />
    if (index === 1) return <Medal className="text-gray-400" size={20} />
    if (index === 2) return <Medal className="text-orange-600" size={20} />
    return <span className="text-sm font-bold text-gray-500">#{index + 1}</span>
  }

  const getRankColor = (index: number) => {
    if (index === 0) return "border-yellow-400 bg-yellow-50 shadow-md"
    if (index === 1) return "border-gray-300 bg-gray-50 shadow-sm"
    if (index === 2) return "border-orange-400 bg-orange-50 shadow-sm"
    return "border-gray-200 bg-white shadow-sm"
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-b-4 border-gray-200 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-black flex items-center gap-2">
          <Trophy className="text-yellow-500" size={28} />
          Top 5 Students
        </h2>
        <div className="flex items-center gap-2">
        </div>
      </div>

      <div className="space-y-2">
        {/* Always render 5 slots to maintain consistent height */}
        {[0, 1, 2, 3, 4].map((index) => {
          const student = topStudents[index]
          const isCurrentUser = student?.id === currentUserId

          if (!student) {
            // Empty slot placeholder
            return (
              <div
                key={`empty-${index}`}
                className="relative border-2 border-b-4 rounded-lg p-2 border-gray-200 bg-gray-50 opacity-50"
              >
                <div className="flex items-center gap-2">
                  <div className="shrink-0 w-6 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-400">#{index + 1}</span>
                  </div>
                  <div className="shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white text-sm font-bold">
                      ?
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-400 text-xs">No student yet</p>
                    <p className="text-[10px] text-gray-400 mb-1">0 levels • 0 XP</p>
                    <div className="relative w-full h-1.5 bg-gray-200 rounded-full overflow-hidden" />
                  </div>
                </div>
              </div>
            )
          }

          return (
            <div
              key={student.id}
              className={`
                relative border-2 border-b-4 rounded-lg p-2 transition-all hover:shadow-lg
                ${getRankColor(index)}
                ${isCurrentUser ? "ring-2 ring-primary" : ""}
              `}
            >
              <div className="flex items-center gap-2">
                {/* Rank Icon */}
                <div className="shrink-0 w-6 flex items-center justify-center">
                  {getRankIcon(index)}
                </div>

                {/* User Avatar */}
                <div className="shrink-0">
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
                    {student.fullName.charAt(0).toUpperCase()}
                  </div>
                </div>

                {/* Student Info & Progress Bar */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1.5">
                      <p className="font-bold text-black text-xs truncate">
                        {student.fullName}
                      </p>
                      {isCurrentUser && (
                        <span className="text-[10px] bg-green-600 text-white px-1.5 py-0.5 rounded-full font-semibold">
                          You
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">
                        {student.accuracy}%
                      </p>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-600 mb-1">
                    {student.completedLevels} levels • {student.xp} XP
                  </p>

                  {/* Progress Bar */}
                  <div className="relative w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-linear-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
                      style={{ width: `${student.accuracy}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
