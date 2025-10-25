"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { mockStore, type Mentor } from "@/lib/store"
import { X } from "lucide-react"

interface MentorAllocationModalProps {
  mentor: Mentor
  onClose: () => void
  onSubmit: (mentorId: string, startupIds: string[]) => void
}

export function MentorAllocationModal({ mentor, onClose, onSubmit }: MentorAllocationModalProps) {
  const [selectedStartups, setSelectedStartups] = useState<string[]>(mentor.assignedStartups)

  const handleToggleStartup = (startupId: string) => {
    setSelectedStartups((prev) =>
      prev.includes(startupId) ? prev.filter((id) => id !== startupId) : [...prev, startupId],
    )
  }

  const handleSubmit = () => {
    onSubmit(mentor.id, selectedStartups)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Allocate Startups to {mentor.name}</CardTitle>
            <CardDescription>Select which startups this mentor will work with</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-3">
            {mockStore.startups.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No startups available for allocation</p>
            ) : (
              mockStore.startups.map((startup) => (
                <div key={startup.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50">
                  <Checkbox
                    id={startup.id}
                    checked={selectedStartups.includes(startup.id)}
                    onCheckedChange={() => handleToggleStartup(startup.id)}
                    className="mt-1"
                  />
                  <label htmlFor={startup.id} className="flex-1 cursor-pointer">
                    <p className="font-medium">{startup.name}</p>
                    <p className="text-sm text-muted-foreground">{startup.founderName}</p>
                    <p className="text-xs text-muted-foreground mt-1">{startup.industry}</p>
                  </label>
                </div>
              ))
            )}
          </div>

          <div className="flex gap-3 border-t pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmit} className="flex-1">
              Save Allocation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
