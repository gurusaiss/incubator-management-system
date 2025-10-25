"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockStore, type Startup } from "@/lib/store"
import { StartupRegistrationModal } from "@/components/modals/startup-registration-modal"
import { Users, DollarSign } from "lucide-react"

export function StartupsList() {
  const [showRegistration, setShowRegistration] = useState(false)
  const [startups, setStartups] = useState<Startup[]>(mockStore.startups)

  const handleAddStartup = (newStartup: Startup) => {
    const startup = { ...newStartup, id: `startup-${Date.now()}`, createdAt: new Date() }
    mockStore.startups.push(startup)
    setStartups([...mockStore.startups])
    setShowRegistration(false)
  }

  const stageColors = {
    idea: "bg-blue-100 text-blue-800",
    mvp: "bg-purple-100 text-purple-800",
    growth: "bg-green-100 text-green-800",
    scaling: "bg-orange-100 text-orange-800",
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Registered Startups</CardTitle>
            <CardDescription>Manage and track all registered startups in the incubator</CardDescription>
          </div>
          <Button onClick={() => setShowRegistration(true)}>Register New Startup</Button>
        </CardHeader>
        <CardContent>
          {startups.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="mb-4">No startups registered yet</p>
              <Button onClick={() => setShowRegistration(true)}>Register First Startup</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {startups.map((startup) => (
                <div key={startup.id} className="p-4 border rounded-lg hover:bg-muted/50 transition">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{startup.name}</h3>
                      <p className="text-sm text-muted-foreground">{startup.description}</p>
                    </div>
                    <Badge className={stageColors[startup.stage]}>{startup.stage.toUpperCase()}</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Founder</p>
                      <p className="font-medium">{startup.founderName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Industry</p>
                      <p className="font-medium">{startup.industry}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Progress</p>
                      <p className="font-medium">{startup.progress}%</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm mb-3">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span>
                        Funding: ${(startup.fundingReceived / 1000).toFixed(0)}K / $
                        {(startup.fundingNeeded / 1000).toFixed(0)}K
                      </span>
                    </div>
                    {startup.mentorId && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>Mentor Assigned</span>
                      </div>
                    )}
                  </div>

                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${startup.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {showRegistration && (
        <StartupRegistrationModal onClose={() => setShowRegistration(false)} onSubmit={handleAddStartup} />
      )}
    </>
  )
}
