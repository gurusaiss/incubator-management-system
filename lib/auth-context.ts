import { createContext } from "react"

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "mentor" | "founder"
}

export const AuthContext = createContext<{
  user: User | null
  setUser: (user: User | null) => void
}>({
  user: null,
  setUser: () => {},
})
