"use client"

import { Heart, Sparkles, Shield } from "lucide-react"

const SHOP_ITEMS = [
  {
    id: 1,
    icon: Heart,
    name: "1 Heart",
    description: "Get 1 extra life",
    cost: "100 XP",
    color: "text-red-600",
  },
  {
    id: 2,
    icon: Shield,
    name: "Shield Boost",
    description: "Protect your streak for 1 day",
    cost: "200 XP",
    color: "text-blue-600",
  },
  {
    id: 3,
    icon: Sparkles,
    name: "2x XP Multiplier",
    description: "Double XP for 1 hour",
    cost: "300 XP",
    color: "text-yellow-600",
  },
]

export default function ShopPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-black mb-2">Reward Shop</h1>
        <p className="text-gray">Use your XP to get awesome rewards</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SHOP_ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <Icon size={40} className={item.color} />
                <span className="text-xs bg-primary text-white px-3 py-1 rounded-full font-semibold">{item.cost}</span>
              </div>

              <h3 className="text-lg font-bold text-black mb-2">{item.name}</h3>
              <p className="text-sm text-gray mb-4">{item.description}</p>

              <button className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primary-dark transition-colors">
                Buy Now
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
