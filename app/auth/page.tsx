"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function StudentAuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState("")
  const [fullName, setFullName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!isLogin) {
      // Signup validation
      if (password !== confirmPassword) {
        setError("Passwords do not match")
        return
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters")
        return
      }
      if (username.length < 3) {
        setError("Username must be at least 3 characters")
        return
      }
    }

    setLoading(true)

    try {
      // TODO: Implement actual authentication with Appwrite
      if (username && password) {
        const userData = isLogin 
          ? { username, role: "student" }
          : { username, fullName, role: "student" }
        
        localStorage.setItem("user", JSON.stringify(userData))
        localStorage.setItem("userRole", "student")
        router.push("/student/learn")
      } else {
        setError("Please fill in all fields")
      }
    } catch (err) {
      setError(isLogin ? "Login failed. Please try again." : "Signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border-2 border-b-4 border-gray-200">
          <div className="text-center">
            <div className="text-6xl mb-4 inline-block">🏵️</div>
            <h1 className="text-3xl font-bold text-black mb-2">
              {isLogin ? "Welcome Back!" : "Join Rizal Quest!"}
            </h1>
            <p className="text-gray-600 text-sm">
              {isLogin ? "Login to continue your adventure" : "Create your account to start learning"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-b-4 border-gray-300 focus:border-green-500 focus:outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-b-4 border-gray-300 focus:border-green-500 focus:outline-none transition-all"
                placeholder={isLogin ? "Enter your username" : "Choose a username"}
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
                className="w-full px-4 py-3 rounded-xl border-2 border-b-4 border-gray-300 focus:border-green-500 focus:outline-none transition-all"
                placeholder={isLogin ? "Enter your password" : "Create a password"}
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-b-4 border-gray-300 focus:border-green-500 focus:outline-none transition-all"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 border-2 border-red-300 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl border-2 border-b-4 border-green-600 transition-all active:border-b-2 disabled:opacity-50"
            >
              {loading ? (isLogin ? "Logging in..." : "Creating account...") : (isLogin ? "Login" : "Sign Up")}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setError("")
              }}
              className="text-green-500 font-semibold hover:text-green-600"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </div>

          <div className="text-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
