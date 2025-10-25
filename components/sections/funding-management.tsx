"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockStore, type FundingRound } from "@/lib/store"
import { FundingAllocationModal } from "@/components/modals/funding-allocation-modal"
import { DollarSign, Trash2 } from "lucide-react"

export function FundingManagement() {
  const [fundingRounds, setFundingRounds] = useState<FundingRound[]>(mockStore.fundingRounds)
  const [showAllocation, setShowAllocation] = useState(false)
  const [selectedRound, setSelectedRound] = useState<FundingRound | null>(null)

  const handleAllocate = (round: FundingRound) => {
    setSelectedRound(round)
    setShowAllocation(true)
  }

  const handleAllocationUpdate = (roundId: string, allocations: { startupId: string; amount: number }[]) => {
    const round = fundingRounds.find((r) => r.id === roundId)
    if (round) {
      round.startupAllocations = allocations
      round.allocatedAmount = allocations.reduce((sum, a) => sum + a.amount, 0)
      setFundingRounds([...fundingRounds])
      mockStore.fundingRounds = fundingRounds
      setShowAllocation(false)
      setSelectedRound(null)
    }
  }

  const handleDeleteRound = (id: string) => {
    const filtered = fundingRounds.filter((r) => r.id !== id)
    setFundingRounds(filtered)
    mockStore.fundingRounds = filtered
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Funding Management
            </CardTitle>
            <CardDescription>Manage funding rounds and allocations</CardDescription>
          </div>
          <Button>Create Funding Round</Button>
        </CardHeader>
        <CardContent>
          {fundingRounds.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No funding rounds created yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {fundingRounds.map((round) => {
                const utilization = (round.allocatedAmount / round.totalAmount) * 100
                const remaining = round.totalAmount - round.allocatedAmount

                return (
                  <div key={round.id} className="p-4 border rounded-lg hover:bg-muted/50 transition">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{round.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Total: ${(round.totalAmount / 1000).toFixed(0)}K
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge>{round.status}</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteRound(round.id)}
                          title="Delete round"
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Allocation</span>
                        <span className="font-semibold">
                          ${(round.allocatedAmount / 1000).toFixed(0)}K / ${(round.totalAmount / 1000).toFixed(0)}K
                        </span>
                      </div>

                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${Math.min(utilization, 100)}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Utilization: {utilization.toFixed(0)}%</span>
                        <span>Remaining: ${(remaining / 1000).toFixed(0)}K</span>
                      </div>

                      <div className="text-sm">
                        <p className="text-muted-foreground mb-1">
                          Allocated to {round.startupAllocations.length} startup
                          {round.startupAllocations.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 w-full bg-transparent"
                      onClick={() => handleAllocate(round)}
                    >
                      Manage Allocations
                    </Button>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {showAllocation && selectedRound && (
        <FundingAllocationModal
          round={selectedRound}
          onClose={() => {
            setShowAllocation(false)
            setSelectedRound(null)
          }}
          onSubmit={handleAllocationUpdate}
        />
      )}
    </>
  )
}
