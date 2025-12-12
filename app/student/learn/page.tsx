"use client"

import ChapterGrid from "@/components/student/chapter-grid"
import LearnSidebar from "@/components/student/learn-sidebar"

export default function LearnPage() {
  return (
    <div className="flex gap-8 py-8 pl-8 pr-8 bg-gray-100 min-h-screen max-w-[1600px] mx-auto">
      {/* Main Content */}
      <div className="flex-1 max-w-4xl mx-auto">
        <ChapterGrid />
      </div>

      {/* Right Sticky Sidebar */}
      <div className="hidden xl:block w-80 flex-shrink-0">
        <div className="sticky top-8">
          <LearnSidebar />
        </div>
      </div>
    </div>
  )
}
