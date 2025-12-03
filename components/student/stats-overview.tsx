"use client"

import type React from "react"

import { Activity, Zap, Flame, Target, TrendingUp, Calendar } from "lucide-react"
import PerformanceChart from "./performance-chart"

export default function StatsOverview() {
  // Sample student stats data
  const stats = {
    totalPlays: 24,
    successRate: 85,
    currentStreak: 7,
    totalXP: 2450,
    averageTime: "3m 45s",
    chaptersCompleted: 2,
  }

  const performanceByChapter = [
    { chapter: "Ch1", accuracy: 92, attempts: 4 },
    { chapter: "Ch2", accuracy: 88, attempts: 6 },
    { chapter: "Ch3", accuracy: 78, attempts: 3 },
    { chapter: "Ch4", accuracy: 0, attempts: 0 },
    { chapter: "Ch5", accuracy: 0, attempts: 0 },
    { chapter: "Ch6", accuracy: 0, attempts: 0 },
    { chapter: "Ch7", accuracy: 0, attempts: 0 },
    { chapter: "Ch8", accuracy: 0, attempts: 0 },
  ]

  return (
    <div className="space-y-8">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <StatCard icon={Activity} label="Total Plays" value={stats.totalPlays} color="bg-blue-100 text-blue-600" />
        <StatCard
          icon={Target}
          label="Success Rate"
          value={`${stats.successRate}%`}
          color="bg-green-100 text-green-600"
        />
        <StatCard icon={Flame} label="Streak" value={`${stats.currentStreak}d`} color="bg-red-100 text-red-600" />
        <StatCard icon={Zap} label="Total XP" value={stats.totalXP} color="bg-yellow-100 text-yellow-600" />
        <StatCard icon={Calendar} label="Avg Time" value={stats.averageTime} color="bg-purple-100 text-purple-600" />
        <StatCard
          icon={TrendingUp}
          label="Chapters"
          value={stats.chaptersCompleted}
          color="bg-teal-100 text-teal-600"
        />
      </div>

      {/* Performance by Chapter */}
      <PerformanceChart data={performanceByChapter} />

      {/* Weekly Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-black mb-4">Weekly Activity</h3>
        <div className="grid grid-cols-7 gap-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
            const activity = (Math.random() * 100) | 0
            return (
              <div key={day} className="text-center">
                <p className="text-xs text-gray mb-2">{day}</p>
                <div className="h-24 bg-gray-light rounded-lg relative group cursor-pointer">
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-primary rounded-b-lg transition-all duration-300 group-hover:opacity-80"
                    style={{ height: `${activity}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-bold text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                      {activity}%
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-black mb-4">Recent Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: "🏆", title: "First Steps", desc: "Completed Chapter 1" },
            { icon: "🔥", title: "7 Day Streak", desc: "Played for 7 consecutive days" },
            { icon: "⭐", title: "50 XP Club", desc: "Earned 50 total XP" },
          ].map((achievement, idx) => (
            <div
              key={idx}
              className="border-2 border-primary rounded-lg p-4 text-center hover:bg-primary-light transition-colors"
            >
              <div className="text-4xl mb-2">{achievement.icon}</div>
              <h4 className="font-bold text-black mb-1">{achievement.title}</h4>
              <p className="text-sm text-gray">{achievement.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  icon: React.ComponentType<{ size: number }>
  label: string
  value: string | number
  color: string
}

function StatCard({ icon: Icon, label, value, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className={`inline-block p-2 rounded-lg ${color} mb-3`}>
        <Icon size={20} />
      </div>
      <p className="text-gray text-xs mb-1">{label}</p>
      <p className="text-2xl font-bold text-black">{value}</p>
    </div>
  )
}
