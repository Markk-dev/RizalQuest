import { Zap } from "lucide-react"

import { Progress } from "@/components/ui/progress"

type QuestsProps = {
  points: number
}

export const Quests = ({ points }: QuestsProps) => {
  const quests = [
    {
      title: "Earn 50 XP",
      value: 50,
    },
    {
      title: "Earn 100 XP",
      value: 100,
    },
    {
      title: "Earn 250 XP",
      value: 250,
    },
  ]

  return (
    <div className="space-y-4 rounded-lg border-2 bg-white p-4">
      <div className="flex items-center gap-x-2">
        <Zap className="h-6 w-6 fill-yellow-400 text-yellow-400" />
        <h3 className="text-lg font-bold text-neutral-700">Quests</h3>
      </div>

      <ul className="space-y-4">
        {quests.map((quest) => {
          const progress = (points / quest.value) * 100

          return (
            <div key={quest.title}>
              <p className="text-sm font-bold text-neutral-700">{quest.title}</p>
              <Progress value={Math.min(progress, 100)} className="h-2" />
            </div>
          )
        })}
      </ul>
    </div>
  )
}
