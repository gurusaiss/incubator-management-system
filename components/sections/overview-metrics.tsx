"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockStore } from "@/lib/store"
import { Users, Briefcase, Calendar, TrendingUp, Target, DollarSign } from "lucide-react"

export function OverviewMetrics() {
  const totalFunding = mockStore.fundingRounds.reduce((sum, r) => sum + r.totalAmount, 0)
  const allocatedFunding = mockStore.fundingRounds.reduce((sum, r) => sum + r.allocatedAmount, 0)
  const avgProgress =
    mockStore.startups.length > 0
      ? Math.round(mockStore.startups.reduce((sum, s) => sum + s.progress, 0) / mockStore.startups.length)
      : 0

  const metrics = [
    {
      title: "Total Startups",
      value: mockStore.startups.length,
      icon: Briefcase,
      color: "bg-blue-100 text-blue-600",
      trend: "+2 this month",
    },
    {
      title: "Active Mentors",
      value: mockStore.mentors.length,
      icon: Users,
      color: "bg-green-100 text-green-600",
      trend: "100% assigned",
    },
    {
      title: "Avg Progress",
      value: `${avgProgress}%`,
      icon: Target,
      color: "bg-purple-100 text-purple-600",
      trend: "On track",
    },
    {
      title: "Total Funding",
      value: `$${(totalFunding / 1000).toFixed(0)}K`,
      icon: DollarSign,
      color: "bg-orange-100 text-orange-600",
      trend: `$${(allocatedFunding / 1000).toFixed(0)}K allocated`,
    },
    {
      title: "Upcoming Events",
      value: mockStore.events.length,
      icon: Calendar,
      color: "bg-pink-100 text-pink-600",
      trend: "This month",
    },
    {
      title: "Resources Available",
      value: mockStore.resources.length,
      icon: TrendingUp,
      color: "bg-indigo-100 text-indigo-600",
      trend: "Active resources",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <div className={`p-2 rounded-lg ${metric.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{metric.trend}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
