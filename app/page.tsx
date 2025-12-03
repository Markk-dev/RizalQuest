"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const [role, setRole] = useState<"student" | "admin" | null>(null)
  const router = useRouter()

  const handleRoleSelect = (selectedRole: "student" | "admin") => {
    setRole(selectedRole)
    localStorage.setItem("userRole", selectedRole)

    setTimeout(() => {
      if (selectedRole === "student") {
        router.push("/student/learn")
      } else {
        router.push("/admin")
      }
    }, 500)
  }

  if (role) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-primary-light via-white to-primary-light flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block p-4 bg-white rounded-full mb-4 animate-bounce">
            <div className="text-4xl">🏵️</div>
          </div>
          <p className="text-gray">Redirecting...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-light via-white to-primary-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4 inline-block">🏵️</div>
            <h1 className="text-3xl font-bold text-black mb-2">Rizal Quest</h1>
            <p className="text-gray text-sm">Learn about José Rizal through an interactive game</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => router.push("/auth")}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg border-2 border-b-4 border-green-600 transition-all active:border-b-2 transform hover:scale-105 shadow-md"
            >
              Student Portal
            </button>
            <button
              onClick={() => router.push("/auth/admin")}
              className="w-full bg-gray-dark hover:bg-black text-white font-semibold py-3 rounded-lg border-2 border-b-4 border-gray-800 transition-all active:border-b-2 transform hover:scale-105 shadow-md"
            >
              Teacher / Admin
            </button>
          </div>

          <div className="space-y-2 text-center text-xs text-gray border-t border-gray-200 pt-4">
            <p>Rizal Quest v1.0</p>
            <p>Educational Platform for Philippine History</p>
          </div>
        </div>
      </div>
    </main>
  )
}
