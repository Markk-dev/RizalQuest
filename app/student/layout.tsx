"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Menu } from "lucide-react"
import StudentSidebar from "@/components/student/sidebar"
import NavigationGuard from "@/components/shared/navigation-guard"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  // Hide sidebar on lesson pages (when URL matches /student/learn/[chapterId]/[levelId])
  const isLessonPage = /^\/student\/learn\/\d+\/\d+/.test(pathname)
  
  // Hide sidebar on story pages (when URL matches /student/learn/story/[chapterId])
  const isStoryPage = /^\/student\/learn\/story\/\d+/.test(pathname)

  // Close sidebar when route changes
  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])

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
          <StudentSidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
          />
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="fixed top-4 left-4 z-30 lg:hidden p-3 bg-white rounded-lg shadow-lg border-2 border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={24} className="text-gray-700" />
          </button>

          <main className="flex-1">{children}</main>
        </div>
      )}
    </NavigationGuard>
  )
}
