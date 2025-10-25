"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Startup } from "@/lib/store"
import { X } from "lucide-react"

interface StartupRegistrationModalProps {
  onClose: () => void
  onSubmit: (startup: Startup) => void
}

export function StartupRegistrationModal({ onClose, onSubmit }: StartupRegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    founderName: "",
    founderEmail: "",
    industry: "",
    stage: "idea" as const,
    fundingNeeded: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.founderName && formData.founderEmail) {
      onSubmit({
        id: "",
        ...formData,
        fundingReceived: 0,
        progress: 10,
        createdAt: new Date(),
      })
    }
  }

  const industries = ["SaaS", "FinTech", "HealthTech", "EdTech", "E-commerce", "AI/ML", "Other"]
  const stages = ["idea", "mvp", "growth", "scaling"]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Register New Startup</CardTitle>
            <CardDescription>Complete the onboarding form to register your startup</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Startup Information */}
            <div className="space-y-4">
              <h3 className="font-semibold">Startup Information</h3>

              <div>
                <label className="text-sm font-medium">Startup Name</label>
                <Input
                  placeholder="e.g., TechVenture Inc"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-input rounded-md text-sm"
                  placeholder="Brief description of your startup"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Industry</label>
                  <select
                    className="w-full px-3 py-2 border border-input rounded-md text-sm"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  >
                    <option value="">Select industry</option>
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Current Stage</label>
                  <select
                    className="w-full px-3 py-2 border border-input rounded-md text-sm"
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value as any })}
                  >
                    {stages.map((s) => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Founder Information */}
            <div className="space-y-4 border-t pt-4">
              <h3 className="font-semibold">Founder Information</h3>

              <div>
                <label className="text-sm font-medium">Founder Name</label>
                <Input
                  placeholder="Full name"
                  value={formData.founderName}
                  onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email Address</label>
                <Input
                  type="email"
                  placeholder="founder@startup.com"
                  value={formData.founderEmail}
                  onChange={(e) => setFormData({ ...formData, founderEmail: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Funding Information */}
            <div className="space-y-4 border-t pt-4">
              <h3 className="font-semibold">Funding Requirements</h3>

              <div>
                <label className="text-sm font-medium">Funding Needed (USD)</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.fundingNeeded}
                  onChange={(e) => setFormData({ ...formData, fundingNeeded: Number.parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 border-t pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Register Startup
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
