"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BookOpen, Award, Target, ShoppingBag, LogOut } from "lucide-react"

const MENU_ITEMS = [
  { label: "Learn", icon: BookOpen, href: "/student/learn" },
  { label: "Stats", icon: Award, href: "/student/stats" },
  { label: "Achievements", icon: Target, href: "/student/quests" },
  { label: "Shop", icon: ShoppingBag, href: "/student/shop" },
]

export default function StudentSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const playClickSound = () => {
    const audio = new Audio('/sounds/platform_clicked.ogg')
    audio.volume = 0.5
    audio.play().catch((err) => console.log('Click sound failed:', err))
  }

  const handleLogout = () => {
    playClickSound()
    localStorage.removeItem("userRole")
    router.push("/")
  }

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 p-6 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <Link href="/student/learn">
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="text-3xl">🏵️</div>
            <h1 className="text-xl font-bold text-black">Rizal Quest</h1>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

          return (
            <Link key={item.href} href={item.href}>
              <button
                onClick={playClickSound}
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

      {/* User Profile */}
      <div className="space-y-3 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-3 p-3 bg-gray-light rounded-lg">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
            S
          </div>
          <div className="flex-1 text-sm">
            <p className="font-semibold text-black">Student</p>
            <p className="text-xs text-gray">Level 1</p>
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
