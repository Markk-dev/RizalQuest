// @ts-nocheck
"use client"

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

const CHART_DATA = {
  daily: [
    { date: "Mon", active: 45, completed: 12 },
    { date: "Tue", active: 52, completed: 15 },
    { date: "Wed", active: 48, completed: 14 },
    { date: "Thu", active: 61, completed: 18 },
    { date: "Fri", active: 55, completed: 16 },
    { date: "Sat", active: 42, completed: 10 },
    { date: "Sun", active: 38, completed: 9 },
  ],
  chapter: [
    { name: "Ch1", completion: 95 },
    { name: "Ch2", completion: 82 },
    { name: "Ch3", completion: 68 },
    { name: "Ch4", completion: 45 },
    { name: "Ch5", completion: 28 },
    { name: "Ch6", completion: 15 },
    { name: "Ch7", completion: 8 },
    { name: "Ch8", completion: 2 },
  ],
  engagement: [
    { name: "Very Active", value: 45 },
    { name: "Active", value: 65 },
    { name: "Moderate", value: 28 },
    { name: "Inactive", value: 18 },
  ],
}

const COLORS = ["#22C55E", "#3B82F6", "#F59E0B", "#EF4444"]

export default function AdminAnalyticsPage() {
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
          <LineChart data={CHART_DATA.daily}>
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
            <BarChart data={CHART_DATA.chapter}>
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
                data={CHART_DATA.engagement}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }: { name: string; value: number }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {CHART_DATA.engagement.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
          <p className="text-sm text-green-600 font-semibold mb-2">HIGHEST COMPLETION</p>
          <p className="text-3xl font-bold text-black">Chapter 1</p>
          <p className="text-sm text-gray mt-1">95% of students completed</p>
        </div>
        <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
          <p className="text-sm text-blue-600 font-semibold mb-2">AVG. TIME PER LEVEL</p>
          <p className="text-3xl font-bold text-black">3m 45s</p>
          <p className="text-sm text-gray mt-1">Across all students</p>
        </div>
        <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-6">
          <p className="text-sm text-purple-600 font-semibold mb-2">SUCCESS RATE</p>
          <p className="text-3xl font-bold text-black">78%</p>
          <p className="text-sm text-gray mt-1">Overall question accuracy</p>
        </div>
      </div>
    </div>
  )
}
