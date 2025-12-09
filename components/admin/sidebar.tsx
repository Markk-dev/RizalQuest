"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BarChart3, Users, BookOpen, Activity, LogOut } from "lucide-react"
import { useState, useEffect } from "react"

const MENU_ITEMS = [
  { label: "Dashboard", icon: BarChart3, href: "/admin" },
  { label: "Students", icon: Users, href: "/admin/students" },
  { label: "Levels", icon: BookOpen, href: "/admin/levels" },
  { label: "Analytics", icon: Activity, href: "/admin/analytics" },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [userName, setUserName] = useState("Admin")
  const [userRole, setUserRole] = useState("Manager")

  useEffect(() => {
    // Load user data from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if (user.fullName) setUserName(user.fullName)
    if (user.username) setUserName(user.username)
    if (user.role) setUserRole(user.role === "admin" ? "Administrator" : "Manager")
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <Link href="/admin">
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="text-3xl">⚙️</div>
            <h1 className="text-xl font-bold text-black">Admin Panel</h1>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon
          // For /admin route, only match exact path to avoid matching /admin/students etc.
          const isActive = item.href === "/admin" 
            ? pathname === "/admin"
            : pathname === item.href || pathname.startsWith(item.href + "/")

          return (
            <Link key={item.href} href={item.href}>
              <button
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive ? "bg-primary text-white font-semibold shadow-md" : "text-gray-dark hover:bg-gray-light"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            </Link>
          )
        })}
      </nav>

      {/* Admin profile */}
      <div className="space-y-3 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-3 p-3 bg-gray-light rounded-lg">
          <div className="w-10 h-10 bg-gray-dark rounded-full flex items-center justify-center text-white font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 text-sm">
            <p className="font-semibold text-black">{userName}</p>
            <p className="text-xs text-gray">{userRole}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-dark hover:bg-gray-light transition-all duration-200"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
