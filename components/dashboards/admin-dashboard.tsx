"use client"

import { useState, useEffect } from "react"
import { mockStore, type Startup, initializeMockData } from "@/lib/store"
import { StartupsList } from "@/components/sections/startups-list"
import { MentorsList } from "@/components/sections/mentors-list"
import { EventsList } from "@/components/sections/events-list"
import { ResourcesList } from "@/components/sections/resources-list"
import { FundingManagement } from "@/components/sections/funding-management"
import { ReportsSection } from "@/components/sections/reports-section"
import { OverviewMetrics } from "@/components/sections/overview-metrics"
import { ProgressTracking } from "@/components/sections/progress-tracking"
import { AnalyticsDashboard } from "@/components/sections/analytics-dashboard"

interface AdminDashboardProps {
  currentPage: string
}

export function AdminDashboard({ currentPage }: AdminDashboardProps) {
  const [startups, setStartups] = useState<Startup[]>([])

  useEffect(() => {
    initializeMockData()
    setStartups(mockStore.startups)
  }, [])

  const renderContent = () => {
    switch (currentPage) {
      case "overview":
        return (
          <div className="space-y-6">
            <OverviewMetrics />
            <ProgressTracking />
          </div>
        )
      case "startups":
        return <StartupsList />
      case "mentors":
        return <MentorsList />
      case "events":
        return <EventsList />
      case "resources":
        return <ResourcesList />
      case "funding":
        return <FundingManagement />
      case "reports":
        return <ReportsSection />
      default:
        return (
          <div className="space-y-6">
            <OverviewMetrics />
            <AnalyticsDashboard />
          </div>
        )
    }
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage all incubator operations and activities</p>
      </div>
      {renderContent()}
    </div>
  )
}
