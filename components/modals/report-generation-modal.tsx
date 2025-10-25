"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface ReportGenerationModalProps {
  onClose: () => void
  onSubmit: (reportType: string, period: string) => void
}

export function ReportGenerationModal({ onClose, onSubmit }: ReportGenerationModalProps) {
  const [reportType, setReportType] = useState("comprehensive")
  const [period, setPeriod] = useState("October 2024")

  const handleSubmit = () => {
    onSubmit(reportType, period)
  }

  const reportTypes = [
    { id: "performance", label: "Performance Report", description: "Key metrics overview" },
    { id: "progress", label: "Progress Report", description: "Startup progress tracking" },
    { id: "funding", label: "Funding Report", description: "Funding allocation analysis" },
    { id: "comprehensive", label: "Comprehensive Report", description: "Complete overview" },
  ]

  const periods = ["October 2024", "Q3 2024", "Q2 2024", "Q1 2024", "2024 YTD"]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Generate Report</CardTitle>
            <CardDescription>Select report type and period</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium">Report Type</label>
            <div className="space-y-2">
              {reportTypes.map((type) => (
                <div
                  key={type.id}
                  className={`p-3 border rounded-lg cursor-pointer transition ${
                    reportType === type.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setReportType(type.id)}
                >
                  <p className="font-medium text-sm">{type.label}</p>
                  <p className="text-xs text-muted-foreground">{type.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Period</label>
            <select
              className="w-full px-3 py-2 border border-input rounded-md text-sm"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              {periods.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 border-t pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmit} className="flex-1">
              Generate
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
