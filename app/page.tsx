"use client"

import { useState } from "react"
import { AuthContext } from "@/lib/auth-context"
import { Dashboard } from "@/components/dashboard"
import { LoginPage } from "@/components/auth/login-page"

export default function Home() {
  const [user, setUser] = useState(null)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {user ? <Dashboard /> : <LoginPage onLogin={setUser} />}
    </AuthContext.Provider>
  )
}
