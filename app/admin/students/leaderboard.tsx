"use client"

import { useEffect, useState } from "react"
import { Award } from "lucide-react"

interface LeaderboardEntry {
  rank: number
  name: string
  xp: number
  level: number
  streak: number
}

export default function StudentLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await fetch("/api/leaderboard?limit=10").then((r) => r.json())
        setLeaderboard(data.leaderboard)
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error)
      }
    }

    fetchLeaderboard()
  }, [])

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Award size={24} className="text-primary" />
        <h2 className="text-2xl font-bold text-black">Top Students</h2>
      </div>

      <div className="space-y-3">
        {leaderboard.map((entry) => (
          <div
            key={entry.rank}
            className={`flex items-center justify-between p-4 rounded-lg ${
              entry.rank === 1
                ? "bg-yellow-50 border-2 border-yellow-300"
                : entry.rank === 2
                  ? "bg-gray-100 border-2 border-gray-300"
                  : entry.rank === 3
                    ? "bg-orange-50 border-2 border-orange-300"
                    : "bg-gray-light"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-white ${
                  entry.rank === 1
                    ? "bg-yellow-500"
                    : entry.rank === 2
                      ? "bg-gray-400"
                      : entry.rank === 3
                        ? "bg-orange-500"
                        : "bg-gray"
                }`}
              >
                {entry.rank}
              </div>
              <div>
                <p className="font-bold text-black">{entry.name}</p>
                <p className="text-sm text-gray">Level {entry.level}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm text-gray">Streak</p>
                <p className="font-bold text-black flex items-center gap-1">
                  <span>🔥</span> {entry.streak}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray">XP</p>
                <p className="font-bold text-primary text-lg">{entry.xp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
