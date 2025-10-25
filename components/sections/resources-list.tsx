"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockStore, type Resource } from "@/lib/store"
import { ResourceAllocationModal } from "@/components/modals/resource-allocation-modal"
import { AlertCircle, Trash2 } from "lucide-react"

export function ResourcesList() {
  const [resources, setResources] = useState<Resource[]>(mockStore.resources)
  const [showAllocation, setShowAllocation] = useState(false)
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)

  const handleAllocate = (resource: Resource) => {
    setSelectedResource(resource)
    setShowAllocation(true)
  }

  const handleAllocationUpdate = (resourceId: string, newAllocated: number) => {
    const resource = resources.find((r) => r.id === resourceId)
    if (resource) {
      resource.allocated = Math.min(newAllocated, resource.availability)
      setResources([...resources])
      mockStore.resources = resources
      setShowAllocation(false)
      setSelectedResource(null)
    }
  }

  const handleDeleteResource = (id: string) => {
    const filtered = resources.filter((r) => r.id !== id)
    setResources(filtered)
    mockStore.resources = filtered
  }

  const typeColors = {
    "office-space": "bg-blue-100 text-blue-800",
    software: "bg-purple-100 text-purple-800",
    equipment: "bg-orange-100 text-orange-800",
    service: "bg-green-100 text-green-800",
  }

  const getUtilizationStatus = (utilization: number) => {
    if (utilization >= 80) return "text-red-600"
    if (utilization >= 60) return "text-yellow-600"
    return "text-green-600"
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Resource Management</CardTitle>
            <CardDescription>Track available resources and allocations</CardDescription>
          </div>
          <Button>Add Resource</Button>
        </CardHeader>
        <CardContent>
          {resources.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No resources available</p>
            </div>
          ) : (
            <div className="space-y-4">
              {resources.map((resource) => {
                const utilization = (resource.allocated / resource.availability) * 100
                const isOverallocated = resource.allocated > resource.availability

                return (
                  <div key={resource.id} className="p-4 border rounded-lg hover:bg-muted/50 transition">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{resource.name}</h3>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className={typeColors[resource.type]}>
                          {resource.type}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteResource(resource.id)}
                          title="Delete resource"
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Allocation</span>
                        <span className={`font-semibold ${getUtilizationStatus(utilization)}`}>
                          {resource.allocated} / {resource.availability}
                          {isOverallocated && (
                            <AlertCircle className="w-4 h-4 inline ml-1 text-red-600" title="Over-allocated" />
                          )}
                        </span>
                      </div>

                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            isOverallocated ? "bg-red-500" : utilization >= 80 ? "bg-yellow-500" : "bg-green-500"
                          }`}
                          style={{ width: `${Math.min(utilization, 100)}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Utilization: {Math.min(utilization, 100).toFixed(0)}%</span>
                        <span>Available: {Math.max(0, resource.availability - resource.allocated)}</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 w-full bg-transparent"
                      onClick={() => handleAllocate(resource)}
                    >
                      Manage Allocation
                    </Button>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {showAllocation && selectedResource && (
        <ResourceAllocationModal
          resource={selectedResource}
          onClose={() => {
            setShowAllocation(false)
            setSelectedResource(null)
          }}
          onSubmit={handleAllocationUpdate}
        />
      )}
    </>
  )
}
