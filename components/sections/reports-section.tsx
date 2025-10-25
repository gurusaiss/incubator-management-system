"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockStore } from "@/lib/store"
import { ReportGenerationModal } from "@/components/modals/report-generation-modal"
import { FileText, Download, Calendar, BarChart3 } from "lucide-react"

interface Report {
  id: string
  name: string
  type: "performance" | "funding" | "progress" | "comprehensive"
  generatedDate: Date
  period: string
}

export function ReportsSection() {
  const [reports, setReports] = useState<Report[]>([
    {
      id: "report-1",
      name: "Monthly Performance Report - October 2024",
      type: "performance",
      generatedDate: new Date("2024-10-25"),
      period: "October 2024",
    },
    {
      id: "report-2",
      name: "Startup Progress Summary - Q3 2024",
      type: "progress",
      generatedDate: new Date("2024-10-20"),
      period: "Q3 2024",
    },
    {
      id: "report-3",
      name: "Funding Allocation Report - October 2024",
      type: "funding",
      generatedDate: new Date("2024-10-15"),
      period: "October 2024",
    },
  ])

  const [showGeneration, setShowGeneration] = useState(false)

  const handleGenerateReport = (reportType: string, period: string) => {
    const newReport: Report = {
      id: `report-${Date.now()}`,
      name: `${reportType} Report - ${period}`,
      type: reportType as any,
      generatedDate: new Date(),
      period,
    }
    setReports([newReport, ...reports])
    setShowGeneration(false)
  }

  const typeColors = {
    performance: "bg-blue-100 text-blue-800",
    funding: "bg-green-100 text-green-800",
    progress: "bg-purple-100 text-purple-800",
    comprehensive: "bg-orange-100 text-orange-800",
  }

  const typeIcons = {
    performance: BarChart3,
    funding: FileText,
    progress: Calendar,
    comprehensive: BarChart3,
  }

  const generateReportContent = (report: Report) => {
    const startups = mockStore.startups
    const mentors = mockStore.mentors
    const totalFunding = mockStore.fundingRounds.reduce((sum, r) => sum + r.totalAmount, 0)
    const avgProgress =
      startups.length > 0 ? Math.round(startups.reduce((sum, s) => sum + s.progress, 0) / startups.length) : 0

    let content = `# ${report.name}\n\n`
    content += `Generated: ${report.generatedDate.toLocaleDateString()}\n`
    content += `Period: ${report.period}\n\n`

    if (report.type === "performance" || report.type === "comprehensive") {
      content += `## Performance Metrics\n\n`
      content += `- Total Startups: ${startups.length}\n`
      content += `- Active Mentors: ${mentors.length}\n`
      content += `- Average Progress: ${avgProgress}%\n`
      content += `- Total Funding Available: $${(totalFunding / 1000).toFixed(0)}K\n\n`
    }

    if (report.type === "progress" || report.type === "comprehensive") {
      content += `## Startup Progress\n\n`
      startups.forEach((startup) => {
        content += `### ${startup.name}\n`
        content += `- Founder: ${startup.founderName}\n`
        content += `- Stage: ${startup.stage}\n`
        content += `- Progress: ${startup.progress}%\n`
        content += `- Funding: $${(startup.fundingReceived / 1000).toFixed(0)}K / $${(startup.fundingNeeded / 1000).toFixed(0)}K\n\n`
      })
    }

    if (report.type === "funding" || report.type === "comprehensive") {
      content += `## Funding Summary\n\n`
      mockStore.fundingRounds.forEach((round) => {
        content += `### ${round.name}\n`
        content += `- Total: $${(round.totalAmount / 1000).toFixed(0)}K\n`
        content += `- Allocated: $${(round.allocatedAmount / 1000).toFixed(0)}K\n`
        content += `- Status: ${round.status}\n\n`
      })
    }

    return content
  }

  const downloadReport = (report: Report) => {
    const content = generateReportContent(report)
    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content))
    element.setAttribute("download", `${report.id}.txt`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <>
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Automated Reports</CardTitle>
              <CardDescription>Generate and download system reports</CardDescription>
            </div>
            <Button onClick={() => setShowGeneration(true)}>Generate Report</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reports.map((report) => {
                const Icon = typeIcons[report.type]
                return (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-2 rounded-lg ${typeColors[report.type]}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{report.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Generated on {report.generatedDate.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={typeColors[report.type]}>
                        {report.type}
                      </Badge>
                      <Button variant="ghost" size="sm" onClick={() => downloadReport(report)} title="Download report">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Report Templates</CardTitle>
            <CardDescription>Available report types for generation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Performance Report</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Overview of key metrics including startups, mentors, and funding
                </p>
                <Button variant="outline" size="sm" className="bg-transparent">
                  Generate
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Progress Report</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Detailed startup progress tracking and stage distribution
                </p>
                <Button variant="outline" size="sm" className="bg-transparent">
                  Generate
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Funding Report</h3>
                <p className="text-sm text-muted-foreground mb-3">Funding allocation and distribution analysis</p>
                <Button variant="outline" size="sm" className="bg-transparent">
                  Generate
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Comprehensive Report</h3>
                <p className="text-sm text-muted-foreground mb-3">Complete overview combining all metrics and data</p>
                <Button variant="outline" size="sm" className="bg-transparent">
                  Generate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {showGeneration && (
        <ReportGenerationModal onClose={() => setShowGeneration(false)} onSubmit={handleGenerateReport} />
      )}
    </>
  )
}
