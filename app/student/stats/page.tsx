
"use client"

import { useState, useEffect } from "react"
import { Zap, Clock, Flame, CheckCircle } from "lucide-react"
import StatsOverview from "@/components/student/stats-overview"
import TopStudents from "@/components/student/top-students"

export default function StatsPage() {
  const [stats, setStats] = useState({
    totalXP: 0,
    avgTime: "0m 0s",
    streak: 0,
    levelsComplete: 0
  })

  useEffect(() => {
    // Load dynamic stats from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const completedLevels = JSON.parse(localStorage.getItem("completedLevels") || "[]")
    
    // Calculate streak
    const calculateStreak = () => {
      const streakData = JSON.parse(localStorage.getItem("userStreak") || '{"streak": 0, "lastLogin": ""}')
      const today = new Date().toDateString()
      const lastLogin = streakData.lastLogin
      
      if (lastLogin === today) {
        // Already logged in today, keep current streak
        return streakData.streak
      }
      
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toDateString()
      
      let newStreak = streakData.streak
      
      if (lastLogin === yesterdayStr) {
        // Logged in yesterday, increment streak
        newStreak = streakData.streak + 1
      } else if (lastLogin === "") {
        // First time login
        newStreak = 1
      } else {
        // Streak broken, reset to 1
        newStreak = 1
      }
      
      // Update streak data
      localStorage.setItem("userStreak", JSON.stringify({
        streak: newStreak,
        lastLogin: today
      }))
      
      return newStreak
    }
    
    // Calculate average time
    const calculateAvgTime = () => {
      const timeData = JSON.parse(localStorage.getItem("levelTimes") || '{"times": [], "total": 0, "count": 0}')
      
      if (timeData.count === 0) {
        return "No data"
      }
      
      const avgMs = timeData.total / timeData.count
      const avgSeconds = Math.floor(avgMs / 1000)
      const minutes = Math.floor(avgSeconds / 60)
      const seconds = avgSeconds % 60
      
      return `${minutes}m ${seconds}s`
    }
    
    setStats({
      totalXP: user.xp || 0,
      avgTime: calculateAvgTime(),
      streak: calculateStreak(),
      levelsComplete: completedLevels.length
    })
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-black mb-8">Your Statistics</h1>
      
      {/* Quick Stats - Achievement Card Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard 
          icon={Zap}
          label="Total XP" 
          value={stats.totalXP}
          bgColor="bg-yellow-50"
          borderColor="border-yellow-300"
          iconBg="bg-yellow-100"
          iconColor="text-yellow-600"
        />
        <StatCard 
          icon={Clock}
          label="Avg Time" 
          value={stats.avgTime}
          bgColor="bg-purple-50"
          borderColor="border-purple-300"
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
        />
        <StatCard 
          icon={Flame}
          label="Streak" 
          value={`${stats.streak} days`}
          bgColor="bg-red-50"
          borderColor="border-red-300"
          iconBg="bg-red-100"
          iconColor="text-red-600"
        />
        <StatCard 
          icon={CheckCircle}
          label="Levels Complete" 
          value={stats.levelsComplete}
          bgColor="bg-green-50"
          borderColor="border-green-300"
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <StatsOverview />
        <TopStudents />
      </div>
    </div>
  )
}

interface StatCardProps {
  icon: React.ComponentType<{ size: number; className?: string }>
  label: string
  value: string | number
  bgColor: string
  borderColor: string
  iconBg: string
  iconColor: string
}

function StatCard({ icon: Icon, label, value, bgColor, borderColor, iconBg, iconColor }: StatCardProps) {
  return (
    <div className={`${bgColor} border-2 border-b-4 ${borderColor} rounded-2xl p-6 text-center hover:shadow-lg transition-all shadow-md`}>
      <div className={`${iconBg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
        <Icon size={32} className={iconColor} />
      </div>
      <p className="text-sm text-gray-600 mb-2">{label}</p>
      <p className="text-3xl font-bold text-black">{value}</p>
    </div>
  )
}
