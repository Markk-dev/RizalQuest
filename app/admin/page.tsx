"use client"

import { useEffect, useState } from "react"
import { Quests } from "@/components/admin/dashboard"

export default function AdminPage() {
  const [data, setData] = useState<{ students: any; leaderboard: any } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const students = await fetch("/api/students").then((r) => r.json())
        const leaderboard = await fetch("/api/leaderboard?limit=5").then((r) => r.json())
        setData({ students, leaderboard })
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-black mb-8">Admin Dashboard</h1>
      {loading ? (
        <div className="text-center py-20 text-gray">Loading...</div>
      ) : (
        <div className="grid gap-6">
          <Quests points={0} />
        </div>
      )}
    </div>
  )
}
