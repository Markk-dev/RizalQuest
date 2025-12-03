"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AdminAuthPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      // Check if user is admin
      if (data.user.role !== "admin") {
        throw new Error("Access denied. Admin credentials required.")
      }

      // Store user data
      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("userId", data.user.$id)
      localStorage.setItem("userRole", data.user.role)
      
      router.push("/admin")
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border-2 border-b-4 border-gray-300">
          <div className="text-center">
            <div className="text-6xl mb-4 inline-block">👨‍🏫</div>
            <h1 className="text-3xl font-bold text-black mb-2">Admin Login</h1>
            <p className="text-gray-600 text-sm">Access the teacher dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-b-4 border-gray-300 focus:border-gray-500 focus:outline-none transition-all"
                placeholder="Enter admin username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-b-4 border-gray-300 focus:border-gray-500 focus:outline-none transition-all"
                placeholder="Enter admin password"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border-2 border-red-300 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-800 hover:bg-black text-white font-bold py-3 rounded-xl border-2 border-b-4 border-gray-900 transition-all active:border-b-2 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login as Admin"}
            </Button>
          </form>

          <div className="text-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
              ← Back to home
            </Link>
          </div>

          <div className="text-xs text-center text-gray-400 border-t border-gray-200 pt-4">
            Admin access only. Contact your administrator if you need access.
          </div>
        </div>
      </div>
    </main>
  )
}
