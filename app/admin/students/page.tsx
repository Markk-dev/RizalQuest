"use client"

import { useState } from "react"
import { Search, MoreVertical } from "lucide-react"

interface Student {
  id: number
  name: string
  email: string
  level: number
  progress: number
  xp: number
  status: "Active" | "Inactive"
  streak: number
  lastActive: string
}

const STUDENTS_DATA: Student[] = [
  {
    id: 1,
    name: "Maria Santos",
    email: "maria@school.com",
    level: 3,
    progress: 65,
    xp: 1200,
    status: "Active",
    streak: 7,
    lastActive: "Today",
  },
  {
    id: 2,
    name: "Juan Cruz",
    email: "juan@school.com",
    level: 5,
    progress: 82,
    xp: 2100,
    status: "Active",
    streak: 14,
    lastActive: "Today",
  },
  {
    id: 3,
    name: "Rosa Garcia",
    email: "rosa@school.com",
    level: 2,
    progress: 45,
    xp: 850,
    status: "Inactive",
    streak: 0,
    lastActive: "3 days ago",
  },
  {
    id: 4,
    name: "Pedro Lopez",
    email: "pedro@school.com",
    level: 4,
    progress: 71,
    xp: 1800,
    status: "Active",
    streak: 5,
    lastActive: "Today",
  },
  {
    id: 5,
    name: "Ana Reyes",
    email: "ana@school.com",
    level: 6,
    progress: 91,
    xp: 2850,
    status: "Active",
    streak: 21,
    lastActive: "Today",
  },
]

export default function AdminStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"xp" | "level" | "progress">("xp")

  const filteredStudents = STUDENTS_DATA.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()),
  ).sort((a, b) => {
    if (sortBy === "xp") return b.xp - a.xp
    if (sortBy === "level") return b.level - a.level
    return b.progress - a.progress
  })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-black mb-2">Student Management</h1>
        <p className="text-gray">Monitor student progress and engagement</p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header with Search */}
        <div className="p-6 border-b border-gray-200 space-y-4">
          <div className="flex items-center gap-3 bg-gray-light rounded-lg px-4 py-2">
            <Search size={18} className="text-gray" />
            <input
              type="text"
              placeholder="Search students by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent outline-none text-black placeholder-gray"
            />
          </div>

          <div className="flex gap-2">
            {(["xp", "level", "progress"] as const).map((option) => (
              <button
                key={option}
                onClick={() => setSortBy(option)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  sortBy === option ? "bg-primary text-white" : "bg-gray-light text-black hover:bg-gray-200"
                }`}
              >
                Sort by {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-light border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black">Student</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black">Level</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black">Progress</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black">XP</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black">Streak</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black">Last Active</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black">Status</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-light transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-black">{student.name}</p>
                      <p className="text-sm text-gray">{student.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Lvl {student.level}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-32 bg-gray-light rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray mt-1">{student.progress}%</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-black">{student.xp} XP</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <span className="text-xl">🔥</span>
                      <span className="font-semibold text-black">{student.streak}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray">{student.lastActive}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        student.status === "Active" ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-gray hover:text-black transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-light text-sm text-gray">
          Showing {filteredStudents.length} of {STUDENTS_DATA.length} students
        </div>
      </div>
    </div>
  )
}
