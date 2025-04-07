"use client"

import { createContext, useContext, ReactNode } from "react"
import { useSession } from "next-auth/react"

interface AuthContextType {
  isAuthenticated: boolean
  isAdmin: boolean
  user: {
    name?: string | null
    email?: string | null
    role?: "ADMIN" | "USER"
  } | null
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdmin: false,
  user: null,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()

  const value = {
    isAuthenticated: status === "authenticated",
    isAdmin: session?.user?.role === "ADMIN",
    user: session?.user || null,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 