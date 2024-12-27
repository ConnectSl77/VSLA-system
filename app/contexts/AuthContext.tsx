"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import * as jwt_decode from 'jwt-decode';

interface AuthContextType {
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
  user: any
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decodedToken: any = jwt_decode(token)
        setUser(decodedToken.user)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Invalid token:', error)
        logout()
      }
    }
  }, [])

  const login = (token: string) => {
    localStorage.setItem('token', token)
    const decodedToken: any = jwt_decode(token)
    setUser(decodedToken.user)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setIsAuthenticated(false)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

