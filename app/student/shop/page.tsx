"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"

const SHOP_ITEMS = [
  {
    id: "heart",
    image: "/Shop/Heart.png",
    name: "1 Heart",
    description: "Get 1 extra life",
    cost: 50,
    borderColor: "border-red-400",
    borderBottomColor: "border-b-red-500",
    buttonColor: "bg-red-500 border-red-600 border-b-red-700 hover:bg-red-600",
  },
  {
    id: "shield",
    image: "/Shop/Shield.png",
    name: "Shield Boost",
    description: "Protect you from losing hearts for 15 mins",
    cost: 100,
    borderColor: "border-blue-400",
    borderBottomColor: "border-b-blue-500",
    buttonColor: "bg-blue-500 border-blue-600 border-b-blue-700 hover:bg-blue-600",
  },
  {
    id: "xp-multiplier",
    image: "/Shop/Exp.png",
    name: "2x XP Multiplier",
    description: "Double XP for 30 mins",
    cost: 150,
    borderColor: "border-yellow-400",
    borderBottomColor: "border-b-yellow-500",
    buttonColor: "bg-yellow-500 border-yellow-600 border-b-yellow-700 hover:bg-yellow-600",
  },
]

export default function ShopPage() {
  const [xp, setXp] = useState(0)
  const [hearts, setHearts] = useState(5)
  const [activeBoosts, setActiveBoosts] = useState<{shield?: number, xpMultiplier?: number}>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Load user data from localStorage first
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    console.log("User from localStorage:", user)
    console.log("Initial XP:", user.xp, "Initial Hearts:", user.hearts)
    
    setXp(user.xp ?? 0)
    setHearts(user.hearts ?? 5)

    // Fetch fresh data from database (user data, not progress)
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/progress/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.$id,
            action: "getUser"
          })
        })
        
        if (response.ok) {
          const data = await response.json()
          console.log("Fetched user data:", data)
          
          if (data.user) {
            // Update with database values
            const dbXP = data.user.xp ?? 0
            const dbHearts = data.user.hearts ?? 5
            
            console.log("Setting XP to:", dbXP, "Hearts to:", dbHearts)
            
            setXp(dbXP)
            setHearts(dbHearts)
            
            // Update localStorage with fresh data
            user.xp = dbXP
            user.hearts = dbHearts
            localStorage.setItem("user", JSON.stringify(user))
          } else {
            console.warn("No user data in response")
          }
        } else {
          console.error("Failed to fetch user:", response.status, await response.text())
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error)
      }
    }

    if (user.$id) {
      fetchUserData()
    }

    // Load active boosts
    const boosts = JSON.parse(localStorage.getItem("activeBoosts") || "{}")
    setActiveBoosts(boosts)

    // Check if boosts expired
    const now = Date.now()
    let updated = false
    if (boosts.shield && boosts.shield < now) {
      delete boosts.shield
      updated = true
    }
    if (boosts.xpMultiplier && boosts.xpMultiplier < now) {
      delete boosts.xpMultiplier
      updated = true
    }
    if (updated) {
      localStorage.setItem("activeBoosts", JSON.stringify(boosts))
      setActiveBoosts(boosts)
    }

    // Listen for XP and heart updates
    const handleXPUpdated = (event: any) => {
      setXp(event.detail.xp)
    }
    const handleHeartsUpdated = (event: any) => {
      setHearts(event.detail.hearts)
    }

    window.addEventListener("xpUpdated", handleXPUpdated)
    window.addEventListener("heartsUpdated", handleHeartsUpdated)

    return () => {
      window.removeEventListener("xpUpdated", handleXPUpdated)
      window.removeEventListener("heartsUpdated", handleHeartsUpdated)
    }
  }, [])

  const handlePurchase = async (item: typeof SHOP_ITEMS[0]) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const currentXP = user.xp || 0
    const currentHearts = user.hearts ?? 5

    // Check if user has enough XP
    if (currentXP < item.cost) {
      toast.error("Not enough XP!", {
        description: `You need ${item.cost - currentXP} more XP`
      })
      return
    }

    // Check specific item restrictions
    if (item.id === "heart") {
      if (currentHearts >= 5) {
        toast.error("Hearts are full!", {
          description: "You already have maximum hearts"
        })
        return
      }
    } else if (item.id === "shield" || item.id === "xp-multiplier") {
      const boosts = JSON.parse(localStorage.getItem("activeBoosts") || "{}")
      const boostKey = item.id === "shield" ? "shield" : "xpMultiplier"
      
      if (boosts[boostKey] && boosts[boostKey] > Date.now()) {
        toast.error("Boost already active!", {
          description: "Wait for the current boost to expire"
        })
        return
      }
    }

    // Process purchase
    const newXP = currentXP - item.cost
    user.xp = newXP
    
    if (item.id === "heart") {
      // Add 1 heart (max 5)
      const newHearts = Math.min(5, currentHearts + 1)
      user.hearts = newHearts
      setHearts(newHearts)
      
      toast.success("Heart purchased!", {
        description: `You now have ${newHearts} hearts`
      })
      
      // Dispatch event to update UI
      window.dispatchEvent(new CustomEvent("heartsUpdated", { detail: { hearts: newHearts } }))
    } else if (item.id === "shield") {
      // Activate shield for 15 minutes
      const expiresAt = Date.now() + (15 * 60 * 1000)
      const boosts = JSON.parse(localStorage.getItem("activeBoosts") || "{}")
      boosts.shield = expiresAt
      localStorage.setItem("activeBoosts", JSON.stringify(boosts))
      setActiveBoosts(boosts)
      
      toast.success("Shield activated!", {
        description: "You won't lose hearts for 15 minutes"
      })
    } else if (item.id === "xp-multiplier") {
      // Activate XP multiplier for 30 minutes
      const expiresAt = Date.now() + (30 * 60 * 1000)
      const boosts = JSON.parse(localStorage.getItem("activeBoosts") || "{}")
      boosts.xpMultiplier = expiresAt
      localStorage.setItem("activeBoosts", JSON.stringify(boosts))
      setActiveBoosts(boosts)
      
      toast.success("XP Multiplier activated!", {
        description: "You'll earn 2x XP for 30 minutes"
      })
    }

    localStorage.setItem("user", JSON.stringify(user))
    setXp(newXP)

    // Sync to database
    try {
      const xpResponse = await fetch("/api/progress/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.$id,
          action: "updateXP",
          data: { xp: newXP }
        })
      })
      
      if (!xpResponse.ok) {
        console.error("Failed to sync XP:", await xpResponse.text())
      }

      if (item.id === "heart") {
        const heartsResponse = await fetch("/api/progress/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.$id,
            action: "updateHearts",
            data: { hearts: user.hearts }
          })
        })
        
        if (!heartsResponse.ok) {
          console.error("Failed to sync hearts:", await heartsResponse.text())
        }
      }
    } catch (error) {
      console.error("Failed to sync purchase:", error)
    }

    // Dispatch XP update event
    window.dispatchEvent(new CustomEvent("xpUpdated", { detail: { xp: newXP } }))
  }

  const isBoostActive = (boostId: string) => {
    if (boostId === "shield") return activeBoosts.shield && activeBoosts.shield > Date.now()
    if (boostId === "xp-multiplier") return activeBoosts.xpMultiplier && activeBoosts.xpMultiplier > Date.now()
    return false
  }

  if (!mounted) {
    return (
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">Reward Shop</h1>
          <p className="text-gray mb-4">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-black mb-2">Reward Shop</h1>
        <p className="text-gray mb-4">Use your XP to get awesome rewards</p>
        <div className="flex items-center gap-4">
          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg px-4 py-2">
            <span className="text-yellow-700 font-bold">⚡ {xp} XP</span>
          </div>
          <div className="bg-red-100 border-2 border-red-400 rounded-lg px-4 py-2">
            <span className="text-red-700 font-bold">❤️ {hearts} Hearts</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SHOP_ITEMS.map((item) => {
          const active = isBoostActive(item.id)
          const canAfford = xp >= item.cost
          
          return (
            <div 
              key={item.id} 
              className={`bg-white rounded-2xl border-2 border-b-4 ${item.borderColor} ${item.borderBottomColor} overflow-hidden hover:shadow-lg transition-all ${
                active ? 'animate-pulse-glow' : ''
              }`}
              style={active ? {
                color: item.id === 'shield' ? '#3b82f6' : item.id === 'xp-multiplier' ? '#eab308' : '#ef4444'
              } : undefined}
            >
              {/* Image background with gradient overlay */}
              <div 
                className="relative w-full h-64 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/70"></div>
                
                {/* Text overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                  <p className="text-sm text-white/90">{item.description}</p>
                </div>
              </div>

              {/* Bottom section with price and button */}
              <div className="p-4">
                {/* Price and button row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="shrink-0">
                    <span className="text-gray-700 font-bold text-lg">{item.cost} XP</span>
                  </div>
                  
                  <button 
                    onClick={() => handlePurchase(item)}
                    disabled={!canAfford || (active && item.id !== "heart") || (item.id === "heart" && hearts >= 5)}
                    className={`flex-1 font-bold py-3 rounded-xl border-2 border-b-4 transition-all active:border-b-2 ${
                      !canAfford 
                        ? 'bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed'
                        : (active && item.id !== "heart") || (item.id === "heart" && hearts >= 5)
                          ? 'bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed'
                          : `${item.buttonColor} text-white`
                    }`}
                  >
                    {!canAfford 
                      ? 'Not Enough XP' 
                      : item.id === "heart" && hearts >= 5
                        ? 'Hearts Full'
                        : active && item.id !== "heart" 
                          ? 'Active' 
                          : 'Buy Now'}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
