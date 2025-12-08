"use client"

import { useEffect, useState } from "react"
import { Users, TrendingUp, Award, Heart } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts"

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/stats")
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-4xl font-bold text-black mb-8">Admin Dashboard</h1>
        <div className="text-center py-20 text-gray-600">Loading analytics...</div>
      </div>
    )
  }

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316']

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-black">Admin Dashboard</h1>
        <span className="text-sm text-gray-600">Real-time Analytics</span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border-2 border-b-4 border-blue-300 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Students</p>
              <p className="text-3xl font-bold text-black">{stats?.totalStudents || 0}</p>
            </div>
            <Users className="w-12 h-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl border-2 border-b-4 border-green-300 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg XP per Student</p>
              <p className="text-3xl font-bold text-black">{stats?.avgXP || 0}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl border-2 border-b-4 border-yellow-300 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Levels Completed</p>
              <p className="text-3xl font-bold text-black">{stats?.totalLevelsCompleted || 0}</p>
            </div>
            <Award className="w-12 h-12 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl border-2 border-b-4 border-red-300 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Hearts</p>
              <p className="text-3xl font-bold text-black">{stats?.avgHearts || 0}</p>
            </div>
            <Heart className="w-12 h-12 text-red-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Performing Students */}
        <div className="bg-white rounded-xl border-2 border-gray-300 p-6">
          <h2 className="text-xl font-bold text-black mb-4">Top Performing Students</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats?.topStudents || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="username" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="xp" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chapter Completion Distribution */}
        <div className="bg-white rounded-xl border-2 border-gray-300 p-6">
          <h2 className="text-xl font-bold text-black mb-4">Chapter Completion Rate</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats?.chapterCompletion || []}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `Ch${entry.chapter}: ${entry.completion}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="completion"
              >
                {(stats?.chapterCompletion || []).map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Learning Curve */}
      <div className="bg-white rounded-xl border-2 border-gray-300 p-6 mb-8">
        <h2 className="text-xl font-bold text-black mb-4">Learning Curve (Avg XP Progress)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stats?.learningCurve || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="chapter" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="avgXP" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Student List */}
      <div className="bg-white rounded-xl border-2 border-gray-300 p-6">
        <h2 className="text-xl font-bold text-black mb-4">All Students</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-bold text-gray-700">Username</th>
                <th className="text-left py-3 px-4 font-bold text-gray-700">XP</th>
                <th className="text-left py-3 px-4 font-bold text-gray-700">Hearts</th>
                <th className="text-left py-3 px-4 font-bold text-gray-700">Current Chapter</th>
                <th className="text-left py-3 px-4 font-bold text-gray-700">Chapters Completed</th>
              </tr>
            </thead>
            <tbody>
              {(stats?.allStudents || []).map((student: any, index: number) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{student.username}</td>
                  <td className="py-3 px-4">{student.xp}</td>
                  <td className="py-3 px-4">{student.hearts}</td>
                  <td className="py-3 px-4">Chapter {student.currentChapter}</td>
                  <td className="py-3 px-4">{student.chaptersCompleted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
