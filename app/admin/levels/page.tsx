"use client"

import { Edit, Plus } from "lucide-react"
import { CHAPTERS } from "@/lib/constants"
import { QUESTION_BANK } from "@/lib/questions"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLevelsPage() {
  const router = useRouter()
  const [syncing, setSyncing] = useState(false)
  
  const handleSyncQuestions = async () => {
    if (!confirm("This will sync all questions from the code to the database. Continue?")) {
      return
    }
    
    setSyncing(true)
    try {
      console.log("Starting sync...")
      const response = await fetch("/api/admin/sync-questions", {
        method: "POST"
      })
      const data = await response.json()
      
      console.log("Sync response:", data)
      
      if (data.success) {
        alert(`Questions synced successfully! ${data.count || 0} questions added.`)
        window.location.reload() // Reload to show updated data
      } else {
        alert("Failed to sync questions: " + data.error)
        console.error("Sync error:", data.error)
      }
    } catch (error) {
      alert("Error syncing questions: " + error)
      console.error("Sync exception:", error)
    }
    setSyncing(false)
  }
  
  // Generate levels from question bank
  const getLevelsForChapter = (chapterId: number) => {
    const chapterQuestions = QUESTION_BANK[chapterId as keyof typeof QUESTION_BANK]
    if (!chapterQuestions) return []
    
    return Object.keys(chapterQuestions).map((levelKey) => {
      const levelNum = parseInt(levelKey)
      const questions = chapterQuestions[levelNum as keyof typeof chapterQuestions]
      return {
        id: `${chapterId}-${levelNum}`,
        chapterId,
        levelNum,
        topic: `Level ${levelNum}`,
        questions: Array.isArray(questions) ? questions.length : 0,
        active: true,
      }
    })
  }
  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-black mb-2">Manage Levels</h1>
          <p className="text-gray">Create and edit learning levels</p>
        </div>
        <button 
          onClick={handleSyncQuestions}
          disabled={syncing}
          className="bg-blue-500 text-white px-6 py-3 rounded-xl border-2 border-blue-600 border-b-4 border-b-blue-700 font-semibold hover:bg-blue-600 transition-all active:border-b-2 flex items-center gap-2 disabled:opacity-50"
        >
          <Plus size={20} />
          {syncing ? "Syncing..." : "Sync Questions to DB"}
        </button>
      </div>

      {/* Levels by Chapter */}
      <div className="space-y-8">
        {CHAPTERS.map((chapter) => {
          const chapterLevels = getLevelsForChapter(chapter.id)
          return (
            <div key={chapter.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div
                className="px-6 py-4 text-white font-bold text-lg flex items-center gap-2"
                style={{ backgroundColor: chapter.color }}
              >
                {chapter.title}
              </div>

              {chapterLevels.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-light border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-black">Level</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-black">Topic</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-black">Questions</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-black">Status</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-black">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {chapterLevels.map((level) => (
                        <tr key={level.id} className="border-b border-gray-200 hover:bg-gray-light transition-colors">
                          <td className="px-6 py-4 font-semibold text-black">Level {level.levelNum}</td>
                          <td className="px-6 py-4 text-black">{level.topic}</td>
                          <td className="px-6 py-4 text-black">{level.questions}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                level.active ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray"
                              }`}
                            >
                              {level.active ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button 
                                onClick={() => router.push(`/admin/levels/${chapter.id}/${level.levelNum}`)}
                                className="p-2 hover:bg-gray-light rounded-lg transition-colors"
                                title="Edit questions"
                              >
                                <Edit size={18} className="text-primary" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 text-center text-gray">No levels created yet</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
