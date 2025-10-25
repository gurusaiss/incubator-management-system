"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { mockStore, type FundingRound } from "@/lib/store"
import { X } from "lucide-react"

interface FundingAllocationModalProps {
  round: FundingRound
  onClose: () => void
  onSubmit: (roundId: string, allocations: { startupId: string; amount: number }[]) => void
}

export function FundingAllocationModal({ round, onClose, onSubmit }: FundingAllocationModalProps) {
  const [allocations, setAllocations] = useState<Record<string, number>>(
    round.startupAllocations.reduce(
      (acc, a) => {
        acc[a.startupId] = a.amount
        return acc
      },
      {} as Record<string, number>,
    ),
  )

  const handleAmountChange = (startupId: string, amount: number) => {
    setAllocations({ ...allocations, [startupId]: amount })
  }

  const handleSubmit = () => {
    const allocationArray = Object.entries(allocations)
      .filter(([, amount]) => amount > 0)
      .map(([startupId, amount]) => ({ startupId, amount }))
    onSubmit(round.id, allocationArray)
  }

  const totalAllocated = Object.values(allocations).reduce((sum, a) => sum + a, 0)
  const remaining = round.totalAmount - totalAllocated

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Allocate Funding - {round.name}</CardTitle>
            <CardDescription>Distribute ${(round.totalAmount / 1000).toFixed(0)}K among startups</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-3">
            {mockStore.startups.map((startup) => (
              <div key={startup.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium">{startup.name}</p>
                    <p className="text-xs text-muted-foreground">{startup.founderName}</p>
                  </div>
                  <div className="w-32">
                    <Input
                      type="number"
                      min="0"
                      max={round.totalAmount}
                      value={allocations[startup.id] || 0}
                      onChange={(e) => handleAmountChange(startup.id, Number.parseInt(e.target.value) || 0)}
                      placeholder="Amount"
                      className="text-right"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Allocated:</span>
              <span className="font-semibold">${(totalAllocated / 1000).toFixed(0)}K</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Remaining:</span>
              <span className={`font-semibold ${remaining < 0 ? "text-red-600" : ""}`}>
                ${(remaining / 1000).toFixed(0)}K
              </span>
            </div>
            {remaining < 0 && (
              <div className="p-2 bg-red-50 border border-red-200 rounded text-xs text-red-800">
                Over-allocated by ${(Math.abs(remaining) / 1000).toFixed(0)}K
              </div>
            )}
          </div>

          <div className="flex gap-3 border-t pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmit} className="flex-1" disabled={remaining < 0}>
              Save Allocations
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
