// @ts-nocheck
"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const COLORS = ["#22C55E", "#3B82F6", "#F59E0B", "#EF4444"]

interface AnalyticsData {
  dailyActivity: Array<{ date: string; active: number; completed: number }>
  chapterCompletion: Array<{ name: string; completion: number }>
  engagement: Array<{ name: string; value: number }>
  insights: {
    highestCompletion: { chapter: string; rate: number }
    avgTimePerLevel: string
    successRate: number
  }
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/analytics")
      const analyticsData = await response.json()
      setData(analyticsData)
    } catch (error) {
      console.error("Failed to fetch analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 text-center">
          <p className="text-red-600 font-semibold">Failed to load analytics data</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-black mb-2">Analytics</h1>
        <p className="text-gray">Comprehensive insights into student learning patterns</p>
      </div>

      {/* Daily Activity Chart */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-black mb-4">Daily Activity & Completions</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.dailyActivity}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", border: "2px solid #22C55E" }} />
            <Legend />
            <Line type="monotone" dataKey="active" stroke="#22C55E" strokeWidth={2} name="Active Students" />
            <Line type="monotone" dataKey="completed" stroke="#3B82F6" strokeWidth={2} name="Lessons Completed" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chapter Completion */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-black mb-4">Chapter Completion Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.chapterCompletion}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", border: "2px solid #22C55E" }} />
              <Bar dataKey="completion" fill="#22C55E" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Engagement Distribution */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-black mb-4">Student Engagement Levels</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.engagement}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
                label={({ name, value, percent }: { name: string; value: number; percent: number }) => 
                  `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {data.engagement.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#FFFFFF", 
                  border: "2px solid #22C55E",
                  borderRadius: "8px"
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
          <p className="text-sm text-green-600 font-semibold mb-2">HIGHEST COMPLETION</p>
          <p className="text-3xl font-bold text-black">{data.insights.highestCompletion.chapter}</p>
          <p className="text-sm text-gray mt-1">{data.insights.highestCompletion.rate}% of students completed</p>
        </div>
        <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
          <p className="text-sm text-blue-600 font-semibold mb-2">AVG. TIME PER LEVEL</p>
          <p className="text-3xl font-bold text-black">{data.insights.avgTimePerLevel}</p>
          <p className="text-sm text-gray mt-1">Across all students</p>
        </div>
        <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-6">
          <p className="text-sm text-purple-600 font-semibold mb-2">SUCCESS RATE</p>
          <p className="text-3xl font-bold text-black">{data.insights.successRate}%</p>
          <p className="text-sm text-gray mt-1">Overall question accuracy</p>
        </div>
      </div>
    </div>
  )
}
