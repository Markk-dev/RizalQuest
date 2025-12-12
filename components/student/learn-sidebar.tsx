"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Zap, Shield, Sparkles } from "lucide-react"
import { startHeartRegeneration, formatTimeUntilNextHeart } from "@/lib/heart-regeneration"

export default function LearnSidebar() {
  const [hearts, setHearts] = useState(5)
  const [xp, setXp] = useState(0)
  const [timeUntilNext, setTimeUntilNext] = useState("")
  const [activeBoosts, setActiveBoosts] = useState<{shield?: number, xpMultiplier?: number}>({})
  const [timeRemaining, setTimeRemaining] = useState<{shield?: string, xpMultiplier?: string}>({})

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

    // Update boosts and timers
    const updateBoosts = () => {
      const boosts = JSON.parse(localStorage.getItem("activeBoosts") || "{}")
      const now = Date.now()
      
      const activeBoostsFiltered: {shield?: number, xpMultiplier?: number} = {}
      const newTimeRemaining: {shield?: string, xpMultiplier?: string} = {}
      
      if (boosts.shield && boosts.shield > now) {
        activeBoostsFiltered.shield = boosts.shield
        const diff = boosts.shield - now
        const minutes = Math.floor(diff / 60000)
        const seconds = Math.floor((diff % 60000) / 1000)
        newTimeRemaining.shield = `${minutes}:${seconds.toString().padStart(2, '0')}`
      }
      
      if (boosts.xpMultiplier && boosts.xpMultiplier > now) {
        activeBoostsFiltered.xpMultiplier = boosts.xpMultiplier
        const diff = boosts.xpMultiplier - now
        const minutes = Math.floor(diff / 60000)
        const seconds = Math.floor((diff % 60000) / 1000)
        newTimeRemaining.xpMultiplier = `${minutes}:${seconds.toString().padStart(2, '0')}`
      }
      
      setActiveBoosts(activeBoostsFiltered)
      setTimeRemaining(newTimeRemaining)
    }
    
    updateBoosts()
    const boostInterval = setInterval(updateBoosts, 1000)

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
      clearInterval(boostInterval)
      window.removeEventListener("heartsUpdated", handleHeartsUpdated)
      window.removeEventListener("xpUpdated", handleXPUpdated)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const [dailyQuests, setDailyQuests] = useState<any[]>([])

  // Load daily quests
  useEffect(() => {
    const loadDailyQuests = () => {
      const today = new Date().toDateString()
      const savedQuests = localStorage.getItem("dailyQuests")
      const savedDate = localStorage.getItem("dailyQuestsDate")
      
      // Check if we need to generate new quests
      if (savedDate !== today || !savedQuests) {
        // Generate 3 random quests
        import("@/missions.json").then((missions) => {
          const allMissions = missions.dailyMissions
          const shuffled = [...allMissions].sort(() => Math.random() - 0.5)
          const selected = shuffled.slice(0, 3)
          
          localStorage.setItem("dailyQuests", JSON.stringify(selected))
          localStorage.setItem("dailyQuestsDate", today)
          setDailyQuests(selected)
        })
      } else {
        setDailyQuests(JSON.parse(savedQuests))
      }
    }
    
    loadDailyQuests()
  }, [])

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

      {/* Daily Quests Section */}
      <div className="rounded-2xl border border-gray-300/80 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Daily Quests</h3>

        <div className="space-y-6">
          {dailyQuests.map((quest, index) => {
            const today = new Date().toDateString()
            let current = 0
            
            if (quest.type === "xp") {
              // Get XP earned today only
              const dailyXpData = JSON.parse(localStorage.getItem("dailyXP") || '{"date": "", "xp": 0}')
              if (dailyXpData.date === today) {
                current = dailyXpData.xp
              }
            } else if (quest.type === "spend_xp") {
              // Get XP spent today only
              const dailySpentData = JSON.parse(localStorage.getItem("dailyXPSpent") || '{"date": "", "xp": 0}')
              if (dailySpentData.date === today) {
                current = dailySpentData.xp
              }
            } else if (quest.type === "levels") {
              // Get levels completed today only
              const dailyLevelsData = JSON.parse(localStorage.getItem("dailyLevels") || '{"date": "", "count": 0}')
              if (dailyLevelsData.date === today) {
                current = dailyLevelsData.count
              }
            } else if (quest.type === "perfect") {
              // Get perfect levels completed today (can replay old levels)
              const dailyPerfectData = JSON.parse(localStorage.getItem("dailyPerfect") || '{"date": "", "count": 0}')
              if (dailyPerfectData.date === today) {
                current = dailyPerfectData.count
              }
            } else if (quest.type === "chapter") {
              // Get chapters completed today (can replay old chapters)
              const dailyChapterData = JSON.parse(localStorage.getItem("dailyChapter") || '{"date": "", "count": 0}')
              if (dailyChapterData.date === today) {
                current = dailyChapterData.count
              }
            }
            
            const progress = Math.min((current / quest.target) * 100, 100)
            const isCompleted = current >= quest.target

            return (
              <div key={index} className="flex items-start gap-3">
                <Image src="/heart.svg" alt="Heart" width={24} height={24} className="flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-700">{quest.title}</p>
                    {isCompleted && <span className="text-xs text-green-600 font-bold">+{quest.reward}</span>}
                  </div>
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

      {/* Active Effects Section */}
      {(activeBoosts.shield || activeBoosts.xpMultiplier) && (
        <div className="rounded-2xl border border-gray-300/80 p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Active Effects</h3>
          
          <div className="space-y-2">
            {activeBoosts.shield && (
              <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="bg-blue-100 border border-blue-300 rounded-md p-1.5">
                  <Shield className="w-4 h-4 text-blue-600" strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-800">Shield Boost</p>
                  <p className="text-[10px] text-gray-600">No hearts lost</p>
                </div>
                <span className="text-xs font-bold text-blue-600 shrink-0">{timeRemaining.shield}</span>
              </div>
            )}
            
            {activeBoosts.xpMultiplier && (
              <div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="bg-yellow-100 border border-yellow-300 rounded-md p-1.5">
                  <Sparkles className="w-4 h-4 text-yellow-600" strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-800">2x XP Multiplier</p>
                  <p className="text-[10px] text-gray-600">Double XP earned</p>
                </div>
                <span className="text-xs font-bold text-yellow-600 shrink-0">{timeRemaining.xpMultiplier}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
