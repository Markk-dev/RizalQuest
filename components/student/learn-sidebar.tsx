"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Zap } from "lucide-react"
import { startHeartRegeneration, formatTimeUntilNextHeart } from "@/lib/heart-regeneration"

export default function LearnSidebar() {
  const [hearts, setHearts] = useState(5)
  const [xp, setXp] = useState(0)
  const [timeUntilNext, setTimeUntilNext] = useState("")

  useEffect(() => {
    // Load initial data and fetch fresh from server
    async function initializeData() {
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      
      if (user.$id) {
        // Fetch fresh data from server
        try {
          const response = await fetch(`/api/user/hearts?userId=${user.$id}`)
          if (response.ok) {
            const data = await response.json()
            user.hearts = data.hearts
            user.lastHeartUpdate = data.lastHeartUpdate
            localStorage.setItem("user", JSON.stringify(user))
            setHearts(data.hearts)
          } else {
            // Fallback to localStorage
            setHearts(user.hearts ?? 5)
          }
        } catch (error) {
          console.error("Error fetching hearts:", error)
          setHearts(user.hearts ?? 5)
        }
      } else {
        setHearts(user.hearts ?? 5)
      }
      
      setXp(user.xp || 0)
      setTimeUntilNext(formatTimeUntilNextHeart())
    }

    initializeData()

    // Start heart regeneration
    const regenInterval = startHeartRegeneration()

    // Update timer every second
    const timerInterval = setInterval(() => {
      setTimeUntilNext(formatTimeUntilNextHeart())
    }, 1000)

    // Listen for heart updates
    const handleHeartsUpdated = (event: any) => {
      setHearts(event.detail.hearts)
    }
    window.addEventListener("heartsUpdated", handleHeartsUpdated)

    // Listen for XP updates
    const handleXPUpdated = (event: any) => {
      setXp(event.detail.xp)
    }
    window.addEventListener("xpUpdated", handleXPUpdated)

    const handleStorageChange = () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      setHearts(user.hearts || 5)
      setXp(user.xp || 0)
    }
    window.addEventListener("storage", handleStorageChange)

    return () => {
      clearInterval(regenInterval)
      clearInterval(timerInterval)
      window.removeEventListener("heartsUpdated", handleHeartsUpdated)
      window.removeEventListener("xpUpdated", handleXPUpdated)
      window.removeEventListener("storage", handleStorageChange)
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
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
              <Image src="/heart.svg" alt="Hearts" width={28} height={28} />
              <span className="text-xl font-bold text-rose-500">{hearts}</span>
            </div>
            {hearts < 5 && timeUntilNext && (
              <span className="text-xs text-gray-500 mt-1">+1 in {timeUntilNext}</span>
            )}
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
