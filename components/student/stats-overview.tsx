"use client"

import type React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

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
    <div className="bg-white rounded-2xl border-2 border-b-4 border-gray-200 p-6 h-full flex flex-col">
      <h3 className="text-2xl font-bold text-black mb-4">Performance by Chapter</h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceByChapter}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="chapter" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="accuracy" 
              stroke="#22c55e" 
              strokeWidth={3}
              dot={{ fill: '#22c55e', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
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
