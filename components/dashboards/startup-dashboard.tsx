"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockStore } from "@/lib/store"

interface StartupDashboardProps {
  currentPage: string
}

export function StartupDashboard({ currentPage }: StartupDashboardProps) {
  const [startup, setStartup] = useState(mockStore.startups[0])

  if (!startup) {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">No Startup Profile</h2>
              <p className="text-muted-foreground mb-4">You haven't registered a startup yet</p>
              <Button>Register Your Startup</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderContent = () => {
    switch (currentPage) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{startup.progress}%</div>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${startup.progress}%` }} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Funding Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${(startup.fundingReceived / 1000).toFixed(0)}K</div>
                  <p className="text-xs text-muted-foreground">
                    of ${(startup.fundingNeeded / 1000).toFixed(0)}K needed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Stage</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge className="capitalize">{startup.stage}</Badge>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Startup Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-semibold">{startup.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p>{startup.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Industry</p>
                    <p className="font-semibold">{startup.industry}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Founder</p>
                    <p className="font-semibold">{startup.founderName}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "profile":
        return (
          <Card>
            <CardHeader>
              <CardTitle>My Startup Profile</CardTitle>
              <CardDescription>View and manage your startup information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Startup Name</p>
                  <p className="font-semibold text-lg">{startup.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Industry</p>
                  <p className="font-semibold text-lg">{startup.industry}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Stage</p>
                  <Badge className="capitalize">{startup.stage}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Registration Date</p>
                  <p className="font-semibold">{startup.createdAt.toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Description</p>
                <p className="text-base">{startup.description}</p>
              </div>
              <Button variant="outline">Edit Profile</Button>
            </CardContent>
          </Card>
        )

      case "mentor":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Assigned Mentor</CardTitle>
              <CardDescription>Your dedicated mentor for guidance and support</CardDescription>
            </CardHeader>
            <CardContent>
              {startup.mentorId ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Mentor assigned</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No mentor assigned yet</p>
                  <Button>Request Mentor Assignment</Button>
                </div>
              )}
            </CardContent>
          </Card>
        )

      case "resources":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Allocated Resources</CardTitle>
              <CardDescription>Resources available to your startup</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>No resources allocated yet</p>
              </div>
            </CardContent>
          </Card>
        )

      case "funding":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Funding Status</CardTitle>
              <CardDescription>Track your funding progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Funding Progress</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">${(startup.fundingReceived / 1000).toFixed(0)}K received</span>
                  <span className="text-muted-foreground">${(startup.fundingNeeded / 1000).toFixed(0)}K needed</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-primary h-3 rounded-full"
                    style={{ width: `${(startup.fundingReceived / startup.fundingNeeded) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{startup.name}</h1>
        <p className="text-muted-foreground mt-1">Manage your startup profile and progress</p>
      </div>
      {renderContent()}
    </div>
  )
}
