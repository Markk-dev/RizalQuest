
"use client"

import StatsOverview from "@/components/student/stats-overview"

export default function StatsPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-black mb-8">Your Statistics</h1>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4">
          <div className="text-3xl">📚</div>
          <div>
            <p className="text-xs text-gray">Current Level</p>
            <p className="text-2xl font-bold text-black">3</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4">
          <div className="text-3xl">⭐</div>
          <div>
            <p className="text-xs text-gray">Success Rate</p>
            <p className="text-2xl font-bold text-black">85%</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4">
          <div className="text-3xl">🔥</div>
          <div>
            <p className="text-xs text-gray">Streak</p>
            <p className="text-2xl font-bold text-black">7 days</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4">
          <div className="text-3xl">⚡</div>
          <div>
            <p className="text-xs text-gray">Total XP</p>
            <p className="text-2xl font-bold text-black">2,450</p>
          </div>
        </div>
      </div>

      <StatsOverview />
    </div>
  )
}
