"use client"

import type { User } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  LayoutDashboard,
  Users,
  Calendar,
  TrendingUp,
  Settings,
  LogOut,
  Briefcase,
  MessageSquare,
  FileText,
} from "lucide-react"

interface SidebarProps {
  user: User
  currentPage: string
  onPageChange: (page: string) => void
  onLogout: () => void
}

export function Sidebar({ user, currentPage, onPageChange, onLogout }: SidebarProps) {
  const menuItems = {
    admin: [
      { id: "overview", label: "Overview", icon: LayoutDashboard },
      { id: "startups", label: "Startups", icon: Briefcase },
      { id: "mentors", label: "Mentors", icon: Users },
      { id: "events", label: "Events", icon: Calendar },
      { id: "resources", label: "Resources", icon: Settings },
      { id: "funding", label: "Funding", icon: TrendingUp },
      { id: "reports", label: "Reports", icon: FileText },
    ],
    mentor: [
      { id: "overview", label: "Overview", icon: LayoutDashboard },
      { id: "startups", label: "My Startups", icon: Briefcase },
      { id: "messages", label: "Messages", icon: MessageSquare },
      { id: "events", label: "Events", icon: Calendar },
    ],
    founder: [
      { id: "overview", label: "Dashboard", icon: LayoutDashboard },
      { id: "profile", label: "My Profile", icon: Briefcase },
      { id: "mentor", label: "Mentor", icon: Users },
      { id: "resources", label: "Resources", icon: Settings },
      { id: "funding", label: "Funding", icon: TrendingUp },
    ],
  }

  const items = menuItems[user.role]

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-foreground">Incubator Hub</h1>
        <p className="text-sm text-sidebar-foreground/60 mt-1">
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-auto">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={currentPage === item.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => onPageChange(item.id)}
            >
              <Icon className="w-4 h-4 mr-2" />
              {item.label}
            </Button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border space-y-2">
        <Card className="p-3 bg-sidebar-accent/10">
          <p className="text-xs font-medium text-sidebar-foreground">{user.email}</p>
        </Card>
        <Button variant="outline" className="w-full justify-start bg-transparent" onClick={onLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}
