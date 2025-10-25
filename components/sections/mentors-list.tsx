"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockStore, type Mentor } from "@/lib/store"
import { MentorAllocationModal } from "@/components/modals/mentor-allocation-modal"
import { MessageSquare, Trash2, Edit2 } from "lucide-react"

export function MentorsList() {
  const [mentors, setMentors] = useState<Mentor[]>(mockStore.mentors)
  const [showAllocation, setShowAllocation] = useState(false)
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null)

  const handleAllocate = (mentor: Mentor) => {
    setSelectedMentor(mentor)
    setShowAllocation(true)
  }

  const handleAllocationSubmit = (mentorId: string, startupIds: string[]) => {
    const mentor = mentors.find((m) => m.id === mentorId)
    if (mentor) {
      mentor.assignedStartups = startupIds
      setMentors([...mentors])
      mockStore.mentors = mentors
      setShowAllocation(false)
      setSelectedMentor(null)
    }
  }

  const handleDeleteMentor = (id: string) => {
    const filtered = mentors.filter((m) => m.id !== id)
    setMentors(filtered)
    mockStore.mentors = filtered
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Mentor Network</CardTitle>
            <CardDescription>Manage mentors and allocate them to startups</CardDescription>
          </div>
          <Button>Add New Mentor</Button>
        </CardHeader>
        <CardContent>
          {mentors.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No mentors in the network yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {mentors.map((mentor) => (
                <div key={mentor.id} className="p-4 border rounded-lg hover:bg-muted/50 transition">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{mentor.name}</h3>
                      <p className="text-sm text-muted-foreground">{mentor.email}</p>
                      <p className="text-sm mt-1">{mentor.bio}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAllocate(mentor)}
                        title="Allocate startups"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Send message">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteMentor(mentor.id)}
                        title="Remove mentor"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs text-muted-foreground mb-2">Expertise</p>
                    <div className="flex gap-2 flex-wrap">
                      {mentor.expertise.map((exp) => (
                        <Badge key={exp} variant="secondary">
                          {exp}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Assigned to {mentor.assignedStartups.length} startup
                      {mentor.assignedStartups.length !== 1 ? "s" : ""}
                    </span>
                    <Button variant="outline" size="sm" onClick={() => handleAllocate(mentor)}>
                      Manage Allocation
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {showAllocation && selectedMentor && (
        <MentorAllocationModal
          mentor={selectedMentor}
          onClose={() => {
            setShowAllocation(false)
            setSelectedMentor(null)
          }}
          onSubmit={handleAllocationSubmit}
        />
      )}
    </>
  )
}
