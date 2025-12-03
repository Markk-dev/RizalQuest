"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import StudentSidebar from "@/components/student/sidebar"
import NavigationGuard from "@/components/shared/navigation-guard"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Hide sidebar on lesson pages (when URL matches /student/learn/[chapterId]/[levelId])
  const isLessonPage = /^\/student\/learn\/\d+\/\d+/.test(pathname)

  return (
    <NavigationGuard requiredRole="student">
      {isLessonPage ? (
        <main className="min-h-screen">{children}</main>
      ) : (
        <div className="flex min-h-screen bg-gray-light">
          <StudentSidebar />
          <main className="flex-1">{children}</main>
        </div>
      )}
    </NavigationGuard>
  )
}
