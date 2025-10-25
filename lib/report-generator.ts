import { mockStore } from "./store"

export interface ReportData {
  title: string
  generatedDate: Date
  period: string
  metrics: {
    totalStartups: number
    activeMentors: number
    averageProgress: number
    totalFunding: number
    allocatedFunding: number
  }
  startupDetails: Array<{
    name: string
    founder: string
    stage: string
    progress: number
    funding: { received: number; needed: number }
  }>
  fundingDetails: Array<{
    roundName: string
    total: number
    allocated: number
    status: string
  }>
}

export function generateReport(
  type: "performance" | "progress" | "funding" | "comprehensive",
  period: string,
): ReportData {
  const startups = mockStore.startups
  const mentors = mockStore.mentors
  const fundingRounds = mockStore.fundingRounds

  const totalFunding = fundingRounds.reduce((sum, r) => sum + r.totalAmount, 0)
  const allocatedFunding = fundingRounds.reduce((sum, r) => sum + r.allocatedAmount, 0)
  const averageProgress =
    startups.length > 0 ? Math.round(startups.reduce((sum, s) => sum + s.progress, 0) / startups.length) : 0

  return {
    title: `${type.charAt(0).toUpperCase() + type.slice(1)} Report`,
    generatedDate: new Date(),
    period,
    metrics: {
      totalStartups: startups.length,
      activeMentors: mentors.length,
      averageProgress,
      totalFunding,
      allocatedFunding,
    },
    startupDetails: startups.map((s) => ({
      name: s.name,
      founder: s.founderName,
      stage: s.stage,
      progress: s.progress,
      funding: { received: s.fundingReceived, needed: s.fundingNeeded },
    })),
    fundingDetails: fundingRounds.map((r) => ({
      roundName: r.name,
      total: r.totalAmount,
      allocated: r.allocatedAmount,
      status: r.status,
    })),
  }
}

export function exportReportAsCSV(report: ReportData): string {
  let csv = `${report.title}\n`
  csv += `Generated: ${report.generatedDate.toLocaleDateString()}\n`
  csv += `Period: ${report.period}\n\n`

  csv += `Metrics\n`
  csv += `Total Startups,${report.metrics.totalStartups}\n`
  csv += `Active Mentors,${report.metrics.activeMentors}\n`
  csv += `Average Progress,${report.metrics.averageProgress}%\n`
  csv += `Total Funding,$${(report.metrics.totalFunding / 1000).toFixed(0)}K\n`
  csv += `Allocated Funding,$${(report.metrics.allocatedFunding / 1000).toFixed(0)}K\n\n`

  csv += `Startup Details\n`
  csv += `Name,Founder,Stage,Progress,Funding Received,Funding Needed\n`
  report.startupDetails.forEach((s) => {
    csv += `${s.name},${s.founder},${s.stage},${s.progress}%,$${(s.funding.received / 1000).toFixed(0)}K,$${(s.funding.needed / 1000).toFixed(0)}K\n`
  })

  return csv
}
