"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to /auth immediately
    router.push("/auth")
  }, [router])

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center">
        <div className="inline-block p-4 bg-white rounded-full mb-4 animate-bounce">
          <div className="text-4xl">🏵️</div>
        </div>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </main>
  )
}
