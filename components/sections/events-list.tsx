"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockStore, type Event } from "@/lib/store"
import { EventCreationModal } from "@/components/modals/event-creation-modal"
import { Calendar, MapPin, Users, Trash2 } from "lucide-react"

export function EventsList() {
  const [events, setEvents] = useState<Event[]>(mockStore.events)
  const [showCreation, setShowCreation] = useState(false)

  const handleAddEvent = (newEvent: Event) => {
    const event = { ...newEvent, id: `event-${Date.now()}` }
    mockStore.events.push(event)
    setEvents([...mockStore.events])
    setShowCreation(false)
  }

  const handleDeleteEvent = (id: string) => {
    const filtered = events.filter((e) => e.id !== id)
    setEvents(filtered)
    mockStore.events = filtered
  }

  const handleToggleAttendance = (eventId: string, startupId: string) => {
    const event = events.find((e) => e.id === eventId)
    if (event) {
      if (event.attendees.includes(startupId)) {
        event.attendees = event.attendees.filter((id) => id !== startupId)
      } else {
        event.attendees.push(startupId)
      }
      setEvents([...events])
      mockStore.events = events
    }
  }

  const typeColors = {
    workshop: "bg-blue-100 text-blue-800",
    networking: "bg-purple-100 text-purple-800",
    pitch: "bg-orange-100 text-orange-800",
    mentoring: "bg-green-100 text-green-800",
  }

  const upcomingEvents = events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Events & Workshops</CardTitle>
            <CardDescription>Schedule and manage incubator events</CardDescription>
          </div>
          <Button onClick={() => setShowCreation(true)}>Create Event</Button>
        </CardHeader>
        <CardContent>
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="mb-4">No events scheduled yet</p>
              <Button onClick={() => setShowCreation(true)}>Schedule First Event</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-4 border rounded-lg hover:bg-muted/50 transition">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={typeColors[event.type]}>{event.type}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteEvent(event.id)}
                        title="Delete event"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{event.attendees.length} registered</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Manage Attendees
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {showCreation && <EventCreationModal onClose={() => setShowCreation(false)} onSubmit={handleAddEvent} />}
    </>
  )
}
