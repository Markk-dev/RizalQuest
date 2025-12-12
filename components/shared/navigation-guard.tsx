"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface NavigationGuardProps {
  children: React.ReactNode
  requiredRole?: "student" | "admin"
}

export default function NavigationGuard({ children, requiredRole }: NavigationGuardProps) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      try {
        // Get user data from localStorage
        const userRole = localStorage.getItem("userRole")
        const user = JSON.parse(localStorage.getItem("user") || "{}")

        // If no user data, redirect to login
        if (!userRole || !user.$id) {
          console.log("No user data found, redirecting to home")
          router.push("/")
          return
        }

        // Check if user role matches required role
        if (requiredRole && userRole !== requiredRole) {
          console.log(`Access denied: User role '${userRole}' does not match required role '${requiredRole}'`)
          
          // Redirect based on actual role
          if (userRole === "student") {
            router.push("/student/learn")
          } else if (userRole === "admin") {
            router.push("/admin")
          } else {
            router.push("/")
          }
          return
        }

        // Verify the role matches what's stored in user object
        if (user.role !== userRole) {
          console.log("Role mismatch detected, clearing session")
          localStorage.clear()
          router.push("/")
          return
        }

        // All checks passed
        setIsAuthorized(true)
      } catch (error) {
        console.error("Auth check error:", error)
        router.push("/")
      } finally {
        setIsChecking(false)
      }
    }

    checkAuth()
  }, [requiredRole, router])

  // Show loading state while checking
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    )
  }

  // Only render children if authorized
  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
}
