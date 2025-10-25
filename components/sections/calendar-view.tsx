"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockStore } from "@/lib/store"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

export function CalendarView() {
  const events = mockStore.events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const typeColors = {
    workshop: "bg-blue-100 text-blue-800",
    networking: "bg-purple-100 text-purple-800",
    pitch: "bg-orange-100 text-orange-800",
    mentoring: "bg-green-100 text-green-800",
  }

  const groupedByDate = events.reduce(
    (acc, event) => {
      const dateKey = new Date(event.date).toLocaleDateString()
      if (!acc[dateKey]) acc[dateKey] = []
      acc[dateKey].push(event)
      return acc
    },
    {} as Record<string, typeof events>,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Event Calendar
        </CardTitle>
        <CardDescription>Upcoming events and activities</CardDescription>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No events scheduled</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedByDate).map(([date, dateEvents]) => (
              <div key={date}>
                <h3 className="font-semibold text-sm mb-3 text-muted-foreground">{date}</h3>
                <div className="space-y-2">
                  {dateEvents.map((event) => (
                    <div key={event.id} className="p-3 border rounded-lg bg-muted/30">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{event.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(event.date).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}{" "}
                            • {event.location}
                          </p>
                        </div>
                        <Badge className={typeColors[event.type]} variant="secondary">
                          {event.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
