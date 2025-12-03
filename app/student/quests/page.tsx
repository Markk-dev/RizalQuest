"use client"

import { Target, Zap, Award } from "lucide-react"

const QUESTS = [
  {
    id: 1,
    title: "Quick Learner",
    description: "Complete 5 levels in one day",
    reward: "50 XP",
    progress: 3,
    total: 5,
    icon: Zap,
  },
  {
    id: 2,
    title: "Chapter Master",
    description: "Complete all levels in a chapter",
    reward: "100 XP + 1 Heart",
    progress: 2,
    total: 1,
    icon: Award,
  },
  {
    id: 3,
    title: "Accuracy Expert",
    description: "Get 10 consecutive correct answers",
    reward: "75 XP",
    progress: 7,
    total: 10,
    icon: Target,
  },
]

export default function QuestsPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-black mb-8">Daily Quests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {QUESTS.map((quest) => {
          const Icon = quest.icon
          const percentage = (quest.progress / quest.total) * 100

          return (
            <div key={quest.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col">
              <div className="flex flex-col items-center text-center mb-4">
                <div className="p-4 bg-primary-light rounded-full mb-3">
                  <Icon size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">{quest.title}</h3>
                <p className="text-sm text-gray mb-3">{quest.description}</p>
                <p className="text-sm font-semibold text-primary">{quest.reward}</p>
              </div>

              <div className="mt-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray">Progress</span>
                  <span className="text-xs font-semibold text-black">
                    {quest.progress}/{quest.total}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-light rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-500" style={{ width: `${percentage}%` }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
