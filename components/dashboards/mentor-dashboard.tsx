"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockStore } from "@/lib/store"
import { MessageSquare, Calendar } from "lucide-react"

interface MentorDashboardProps {
  currentPage: string
}

export function MentorDashboard({ currentPage }: MentorDashboardProps) {
  const [mentor] = useState(mockStore.mentors[0])

  if (!mentor) {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">No Mentor Profile</h2>
              <p className="text-muted-foreground">Contact admin to set up your mentor profile</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const assignedStartups = mockStore.startups.filter((s) => mentor.assignedStartups.includes(s.id))

  const renderContent = () => {
    switch (currentPage) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Assigned Startups</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{assignedStartups.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Expertise Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mentor.expertise.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg Startup Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {assignedStartups.length > 0
                      ? Math.round(assignedStartups.reduce((sum, s) => sum + s.progress, 0) / assignedStartups.length)
                      : 0}
                    %
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Profile Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-semibold text-lg">{mentor.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold">{mentor.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Bio</p>
                  <p>{mentor.bio}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Expertise</p>
                  <div className="flex gap-2 flex-wrap">
                    {mentor.expertise.map((exp) => (
                      <Badge key={exp}>{exp}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "startups":
        return (
          <Card>
            <CardHeader>
              <CardTitle>My Assigned Startups</CardTitle>
              <CardDescription>Startups you are mentoring</CardDescription>
            </CardHeader>
            <CardContent>
              {assignedStartups.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No startups assigned yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {assignedStartups.map((startup) => (
                    <div key={startup.id} className="p-4 border rounded-lg hover:bg-muted/50">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{startup.name}</h3>
                          <p className="text-sm text-muted-foreground">{startup.founderName}</p>
                        </div>
                        <Badge className="capitalize">{startup.stage}</Badge>
                      </div>
                      <p className="text-sm mb-3">{startup.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress: {startup.progress}%</span>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )

      case "messages":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Messages
              </CardTitle>
              <CardDescription>Communicate with your assigned startups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <p>Messaging system coming soon</p>
              </div>
            </CardContent>
          </Card>
        )

      case "events":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Events
              </CardTitle>
              <CardDescription>Upcoming mentoring sessions and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <p>No events scheduled</p>
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
        <h1 className="text-3xl font-bold">Mentor Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage your mentoring activities and startups</p>
      </div>
      {renderContent()}
    </div>
  )
}
