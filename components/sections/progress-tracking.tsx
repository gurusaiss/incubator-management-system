"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockStore } from "@/lib/store"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

export function ProgressTracking() {
  const startups = mockStore.startups.sort((a, b) => b.progress - a.progress)

  const stageDistribution = {
    idea: mockStore.startups.filter((s) => s.stage === "idea").length,
    mvp: mockStore.startups.filter((s) => s.stage === "mvp").length,
    growth: mockStore.startups.filter((s) => s.stage === "growth").length,
    scaling: mockStore.startups.filter((s) => s.stage === "scaling").length,
  }

  const stageColors = {
    idea: "bg-blue-100 text-blue-800",
    mvp: "bg-purple-100 text-purple-800",
    growth: "bg-green-100 text-green-800",
    scaling: "bg-orange-100 text-orange-800",
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Startup Progress Tracking</CardTitle>
          <CardDescription>Real-time progress metrics for all registered startups</CardDescription>
        </CardHeader>
        <CardContent>
          {startups.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No startups to track yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {startups.map((startup) => (
                <div key={startup.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold">{startup.name}</h3>
                      <p className="text-sm text-muted-foreground">{startup.founderName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={stageColors[startup.stage]}>{startup.stage}</Badge>
                      {startup.progress >= 75 ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : startup.progress >= 50 ? (
                        <TrendingUp className="w-4 h-4 text-yellow-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-orange-600" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Overall Progress</span>
                      <span className="font-semibold">{startup.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${startup.progress}%` }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Funding</p>
                      <p className="font-medium">
                        ${(startup.fundingReceived / 1000).toFixed(0)}K / ${(startup.fundingNeeded / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Mentor</p>
                      <p className="font-medium">{startup.mentorId ? "Assigned" : "Pending"}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Registered</p>
                      <p className="font-medium">{startup.createdAt.toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stage Distribution</CardTitle>
          <CardDescription>Breakdown of startups by development stage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(stageDistribution).map(([stage, count]) => (
              <div key={stage}>
                <div className="flex items-center justify-between mb-2">
                  <span className="capitalize font-medium">{stage}</span>
                  <span className="text-sm text-muted-foreground">{count} startups</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${(count / mockStore.startups.length) * 100 || 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
