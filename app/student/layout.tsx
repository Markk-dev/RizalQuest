"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"
import StudentSidebar from "@/components/student/sidebar"
import NavigationGuard from "@/components/shared/navigation-guard"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  // Hide sidebar on lesson pages (when URL matches /student/learn/[chapterId]/[levelId])
  const isLessonPage = /^\/student\/learn\/\d+\/\d+/.test(pathname)
  
  // Hide sidebar on story pages (when URL matches /student/learn/story/[chapterId])
  const isStoryPage = /^\/student\/learn\/story\/\d+/.test(pathname)

  useEffect(() => {
    // Initialize background music
    if (!audioRef.current) {
      audioRef.current = new Audio('/sounds/background_music.mp3')
      audioRef.current.loop = true
      audioRef.current.volume = 0.5
      
      // Try to play the audio
      audioRef.current.play().catch((err) => {
        console.log('Background music autoplay prevented:', err)
        // Add click listener to start music on first user interaction
        const startMusic = () => {
          audioRef.current?.play().catch((e) => console.log('Music play failed:', e))
          document.removeEventListener('click', startMusic)
        }
        document.addEventListener('click', startMusic)
      })
    }

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  return (
    <NavigationGuard requiredRole="student">
      {isLessonPage || isStoryPage ? (
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
