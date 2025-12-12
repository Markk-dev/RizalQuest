"use client"

import { useState, useEffect } from "react"
import { Search, MoreVertical, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"

interface Student {
  id: string
  username: string
  fullName: string
  currentChapter: number
  progress: number
  xp: number
  hearts: number
  streak: number
  status: "Active" | "Inactive"
  completedLevelsCount: number
}

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"xp" | "chapter" | "progress">("xp")
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [editForm, setEditForm] = useState({ username: "", fullName: "" })
  const studentsPerPage = 5

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/students")
      const data = await response.json()
      setStudents(data.students || [])
    } catch (error) {
      console.error("Failed to fetch students:", error)
      toast.error("Failed to load students")
    } finally {
      setLoading(false)
    }
  }

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student)
    setEditForm({ username: student.username, fullName: student.fullName })
    setOpenDropdown(null)
  }

  const handleSaveEdit = async () => {
    if (!editingStudent) return

    if (!editForm.username.trim() || !editForm.fullName.trim()) {
      toast.error("Username and full name are required")
      return
    }

    try {
      const response = await fetch("/api/students", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: editingStudent.id,
          username: editForm.username.trim(),
          fullName: editForm.fullName.trim()
        })
      })

      if (response.ok) {
        toast.success("Student updated successfully")
        fetchStudents()
        setEditingStudent(null)
      } else {
        const data = await response.json()
        toast.error(data.error || "Failed to update student")
      }
    } catch (error) {
      console.error("Update error:", error)
      toast.error("Failed to update student")
    }
  }

  const handleDeleteStudent = async (studentId: string, studentName: string) => {
    if (!confirm(`Are you sure you want to delete ${studentName}? This action cannot be undone.`)) {
      return
    }

    try {
      const response = await fetch("/api/students", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId })
      })

      if (response.ok) {
        toast.success("Student deleted successfully")
        fetchStudents()
      } else {
        toast.error("Failed to delete student")
      }
    } catch (error) {
      console.error("Delete error:", error)
      toast.error("Failed to delete student")
    }
    setOpenDropdown(null)
  }

  const filteredStudents = students.filter(
    (student) =>
      student.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
  ).sort((a, b) => {
    if (sortBy === "xp") return b.xp - a.xp
    if (sortBy === "chapter") return b.currentChapter - a.currentChapter
    return b.progress - a.progress
  })

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage)
  const startIndex = (currentPage - 1) * studentsPerPage
  const endIndex = startIndex + studentsPerPage
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex)

  // Reset to page 1 when search or sort changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, sortBy])

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading students...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-black mb-2">Student Management</h1>
        <p className="text-gray">Monitor student progress and engagement</p>
      </div>

      <div className="border-2 border-primary rounded-xl overflow-visible">
        {/* Header with Search */}
        <div className="p-6 border-b-2 border-primary space-y-4">
          <div className="flex items-center gap-3 bg-gray-light rounded-lg px-4 py-2">
            <Search size={18} className="text-gray" />
            <input
              type="text"
              placeholder="Search students by name or username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent outline-none text-black placeholder-gray"
            />
          </div>

          <div className="flex gap-2">
            {(["xp", "chapter", "progress"] as const).map((option) => (
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
        <div className="overflow-visible">
          <table className="w-full">
            <thead className="border-b-2 border-primary">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black">Student</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black">Current Chapter</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black">Progress</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black">XP</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black">Streak</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black">Status</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray">
                    {searchTerm ? "No students found matching your search" : "No students registered yet"}
                  </td>
                </tr>
              ) : (
                <>
                  {paginatedStudents.map((student, index) => (
                    <tr 
                      key={student.id} 
                      className={`border-b border-primary/20 ${index < studentsPerPage - 1 ? '' : 'border-b-0'}`}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-black">{student.fullName}</p>
                          <p className="text-sm text-gray">@{student.username}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Chapter {student.currentChapter}
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
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            student.status === "Active" ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray"
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center relative">
                        <button 
                          onClick={() => setOpenDropdown(openDropdown === student.id ? null : student.id)}
                          className="text-gray hover:text-black transition-colors"
                        >
                          <MoreVertical size={18} />
                        </button>
                        
                        {openDropdown === student.id && (
                          <>
                            <div 
                              className="fixed inset-0 z-10" 
                              onClick={() => setOpenDropdown(null)}
                            />
                            <div className="absolute right-8 top-12 bg-white border-2 border-gray-200 rounded-lg shadow-lg z-50 min-w-[140px]">
                              <button
                                onClick={() => handleEditStudent(student)}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-light transition-colors flex items-center gap-2 text-black rounded-t-lg"
                              >
                                <Pencil size={14} />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteStudent(student.id, student.fullName)}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 transition-colors flex items-center gap-2 text-red-600 rounded-b-lg"
                              >
                                <Trash2 size={14} />
                                Remove
                              </button>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                  {/* Fill empty rows to maintain consistent height */}
                  {paginatedStudents.length < studentsPerPage && Array.from({ length: studentsPerPage - paginatedStudents.length }).map((_, i) => (
                    <tr key={`empty-${i}`} className="border-b border-primary/20">
                      <td colSpan={7} className="px-6 py-4 h-[73px]">&nbsp;</td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Footer with count and pagination */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray">
          Showing {filteredStudents.length} of {students.length} students
        </p>

        {filteredStudents.length >= 6 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                currentPage === 1
                  ? "bg-gray-200 text-gray cursor-not-allowed"
                  : "bg-white border-2 border-gray-200 text-black hover:bg-gray-light"
              }`}
            >
              Previous
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
                    currentPage === page
                      ? "bg-primary text-white"
                      : "bg-white border-2 border-gray-200 text-black hover:bg-gray-light"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray cursor-not-allowed"
                  : "bg-white border-2 border-gray-200 text-black hover:bg-gray-light"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-black mb-4">Edit Student</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">Username</label>
                <input
                  type="text"
                  value={editForm.username}
                  onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg outline-none focus:border-primary transition-colors"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">Full Name</label>
                <input
                  type="text"
                  value={editForm.fullName}
                  onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg outline-none focus:border-primary transition-colors"
                  placeholder="Enter full name"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditingStudent(null)}
                className="flex-1 px-4 py-2 bg-gray-200 text-black rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
