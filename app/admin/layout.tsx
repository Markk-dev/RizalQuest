import type React from "react"
import AdminSidebar from "@/components/admin/sidebar"
import NavigationGuard from "@/components/shared/navigation-guard"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NavigationGuard requiredRole="admin">
      <div className="flex min-h-screen bg-gray-light">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </NavigationGuard>
  )
}
