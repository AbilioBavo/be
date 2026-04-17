"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

import { api } from "@/lib/api"
import type { LoginPayload, RegisterPayload, UserProfile } from "@/lib/types"

type AuthContextValue = {
  user: UserProfile | null
  isLoading: boolean
  login: (payload: LoginPayload) => Promise<void>
  register: (payload: RegisterPayload) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const AUTH_STORAGE_KEY = "be-auth-user"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) {
      setIsLoading(false)
      return
    }

    try {
      setUser(JSON.parse(raw) as UserProfile)
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = async (payload: LoginPayload) => {
    const response = await api.login(payload)
    setUser(response.user)
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(response.user))
  }

  const register = async (payload: RegisterPayload) => {
    const response = await api.register(payload)
    setUser(response.user)
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(response.user))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login,
      register,
      logout,
    }),
    [user, isLoading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
