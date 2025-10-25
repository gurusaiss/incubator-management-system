"use client"

import { useContext, useState, useEffect } from "react"
import { AuthContext } from "@/lib/auth-context"
import { initializeMockData } from "@/lib/store"
import { Sidebar } from "@/components/layout/sidebar"
import { StartupDashboard } from "@/components/dashboards/startup-dashboard"
import { MentorDashboard } from "@/components/dashboards/mentor-dashboard"
import { AdminDashboard } from "@/components/dashboards/admin-dashboard"

export function Dashboard() {
  const { user, setUser } = useContext(AuthContext)
  const [currentPage, setCurrentPage] = useState("overview")

  useEffect(() => {
    initializeMockData()
  }, [])

  if (!user) return null

  const renderDashboard = () => {
    switch (user.role) {
      case "admin":
        return <AdminDashboard currentPage={currentPage} />
      case "mentor":
        return <MentorDashboard currentPage={currentPage} />
      case "founder":
        return <StartupDashboard currentPage={currentPage} />
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar user={user} currentPage={currentPage} onPageChange={setCurrentPage} onLogout={() => setUser(null)} />
      <main className="flex-1 overflow-auto">{renderDashboard()}</main>
    </div>
  )
}
