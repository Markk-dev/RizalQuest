"use client"

import { Edit, Trash2, Plus } from "lucide-react"
import { CHAPTERS } from "@/lib/constants"

const SAMPLE_LEVELS = [
  { id: 1, chapterId: 1, levelNum: 1, topic: "Birth and Early Years", questions: 1, active: true },
  { id: 2, chapterId: 1, levelNum: 2, topic: "Family Background", questions: 1, active: true },
  { id: 3, chapterId: 2, levelNum: 1, topic: "Ateneo Education", questions: 1, active: true },
  { id: 4, chapterId: 2, levelNum: 2, topic: "UST Years", questions: 1, active: true },
]

export default function AdminLevelsPage() {
  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-black mb-2">Manage Levels</h1>
          <p className="text-gray">Create and edit learning levels</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center gap-2">
          <Plus size={20} />
          New Level
        </button>
      </div>

      {/* Levels by Chapter */}
      <div className="space-y-8">
        {CHAPTERS.map((chapter) => {
          const chapterLevels = SAMPLE_LEVELS.filter((l) => l.chapterId === chapter.id)
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
                              <button className="p-2 hover:bg-gray-light rounded-lg transition-colors">
                                <Edit size={18} className="text-primary" />
                              </button>
                              <button className="p-2 hover:bg-gray-light rounded-lg transition-colors">
                                <Trash2 size={18} className="text-red-600" />
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
