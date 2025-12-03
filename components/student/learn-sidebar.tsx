"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Zap } from "lucide-react"

export default function LearnSidebar() {
  const [hearts, setHearts] = useState(5)
  const [xp, setXp] = useState(0)

  useEffect(() => {
    // Load from localStorage
    const savedHearts = localStorage.getItem("hearts")
    if (savedHearts) {
      setHearts(Number(savedHearts))
    }

    const savedXP = localStorage.getItem("xp")
    if (savedXP) {
      setXp(Number(savedXP))
    }
  }, [])

  const quests = [
    { title: "Earn 20 XP", current: xp, target: 20 },
    { title: "Earn 100 XP", current: xp, target: 100 },
    { title: "Earn 200 XP", current: xp, target: 200 },
  ]

  return (
    <div className="w-full space-y-6">
      {/* Stats Section */}
      <div className="rounded-2xl border border-gray-300/80 p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          {/* XP */}
          <div className="flex items-center gap-2">
            <Zap className="w-7 h-7 text-orange-500 fill-orange-500" />
            <span className="text-xl font-bold text-gray-800">{xp}</span>
          </div>

          {/* Hearts */}
          <div className="flex items-center gap-2">
            <Image src="/heart.svg" alt="Hearts" width={28} height={28} />
            <span className="text-xl font-bold text-rose-500">{hearts}</span>
          </div>
        </div>
      </div>

      {/* Quests Section */}
      <div className="rounded-2xl border border-gray-300/80 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Quests</h3>
          <Link href="/student/quests" className="text-sm font-bold text-blue-500 hover:text-blue-600">
            VIEW ALL
          </Link>
        </div>

        <div className="space-y-6">
          {quests.map((quest, index) => {
            const progress = Math.min((quest.current / quest.target) * 100, 100)

            return (
              <div key={index} className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-orange-500 fill-orange-500 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-700 mb-2">{quest.title}</p>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
