"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockStore } from "@/lib/store"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export function AnalyticsDashboard() {
  // Prepare data for charts
  const fundingData = mockStore.fundingRounds.map((round) => ({
    name: round.name,
    total: round.totalAmount / 1000,
    allocated: round.allocatedAmount / 1000,
  }))

  const stageData = [
    { name: "Idea", value: mockStore.startups.filter((s) => s.stage === "idea").length },
    { name: "MVP", value: mockStore.startups.filter((s) => s.stage === "mvp").length },
    { name: "Growth", value: mockStore.startups.filter((s) => s.stage === "growth").length },
    { name: "Scaling", value: mockStore.startups.filter((s) => s.stage === "scaling").length },
  ]

  const COLORS = ["#3b82f6", "#a855f7", "#10b981", "#f97316"]

  const progressData = mockStore.startups.slice(0, 5).map((s) => ({
    name: s.name.substring(0, 10),
    progress: s.progress,
  }))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Funding Overview</CardTitle>
            <CardDescription>Total vs Allocated funding by round</CardDescription>
          </CardHeader>
          <CardContent>
            {fundingData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={fundingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#3b82f6" name="Total" />
                  <Bar dataKey="allocated" fill="#10b981" name="Allocated" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No funding data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Startup Stage Distribution</CardTitle>
            <CardDescription>Breakdown by development stage</CardDescription>
          </CardHeader>
          <CardContent>
            {stageData.some((d) => d.value > 0) ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No startup data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Startups</CardTitle>
          <CardDescription>Progress comparison of leading startups</CardDescription>
        </CardHeader>
        <CardContent>
          {progressData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="progress" stroke="#3b82f6" name="Progress %" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              No startup data available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
