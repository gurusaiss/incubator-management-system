"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Resource } from "@/lib/store"
import { X } from "lucide-react"

interface ResourceAllocationModalProps {
  resource: Resource
  onClose: () => void
  onSubmit: (resourceId: string, newAllocated: number) => void
}

export function ResourceAllocationModal({ resource, onClose, onSubmit }: ResourceAllocationModalProps) {
  const [allocated, setAllocated] = useState(resource.allocated)

  const handleSubmit = () => {
    onSubmit(resource.id, allocated)
  }

  const utilization = (allocated / resource.availability) * 100

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Allocate {resource.name}</CardTitle>
            <CardDescription>Adjust resource allocation</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Current Allocation</label>
              <Input
                type="number"
                min="0"
                max={resource.availability}
                value={allocated}
                onChange={(e) => setAllocated(Number.parseInt(e.target.value) || 0)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Available: {resource.availability} | Remaining: {Math.max(0, resource.availability - allocated)}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Utilization</p>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    utilization > 100 ? "bg-red-500" : utilization >= 80 ? "bg-yellow-500" : "bg-green-500"
                  }`}
                  style={{ width: `${Math.min(utilization, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{utilization.toFixed(0)}%</p>
            </div>

            {utilization > 100 && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">
                  Warning: Allocation exceeds available quantity by {allocated - resource.availability}
                </p>
              </div>
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
