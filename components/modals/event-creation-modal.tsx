"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Event } from "@/lib/store"
import { X } from "lucide-react"

interface EventCreationModalProps {
  onClose: () => void
  onSubmit: (event: Event) => void
}

export function EventCreationModal({ onClose, onSubmit }: EventCreationModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    type: "workshop" as const,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title && formData.date && formData.location) {
      onSubmit({
        id: "",
        ...formData,
        date: new Date(formData.date),
        attendees: [],
      })
    }
  }

  const eventTypes = ["workshop", "networking", "pitch", "mentoring"]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Create New Event</CardTitle>
            <CardDescription>Schedule a workshop, networking session, or mentoring event</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Event Details</h3>

              <div>
                <label className="text-sm font-medium">Event Title</label>
                <Input
                  placeholder="e.g., Product Strategy Workshop"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-input rounded-md text-sm"
                  placeholder="Event description and agenda"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Event Type</label>
                  <select
                    className="w-full px-3 py-2 border border-input rounded-md text-sm"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  >
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Date & Time</label>
                  <Input
                    type="datetime-local"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Location</label>
                <Input
                  placeholder="e.g., Conference Room A or Virtual"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="flex gap-3 border-t pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Create Event
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
