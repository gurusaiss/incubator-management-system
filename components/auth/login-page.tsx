"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { User } from "@/lib/auth-context"

interface LoginPageProps {
  onLogin: (user: User) => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<"admin" | "mentor" | "founder">("founder")

  const handleLogin = () => {
    if (email) {
      onLogin({
        id: Math.random().toString(),
        email,
        name: email.split("@")[0],
        role,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Incubator Management System</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <div className="grid grid-cols-3 gap-2">
              {(["admin", "mentor", "founder"] as const).map((r) => (
                <Button
                  key={r}
                  variant={role === r ? "default" : "outline"}
                  onClick={() => setRole(r)}
                  className="capitalize"
                >
                  {r}
                </Button>
              ))}
            </div>
          </div>

          <Button onClick={handleLogin} className="w-full" size="lg">
            Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
