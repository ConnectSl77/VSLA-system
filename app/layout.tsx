"use client"

import './globals.css'
import { Inter } from 'next/font/google'
import Sidebar from './components/Sidebar'
import { UserProfile } from './components/UserProfile'
import { useState, useEffect } from 'react'
import { User, UserRole } from './types/user'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isAuthenticated && pathname !== '/login') {
      router.push('/login')
    }
  }, [isAuthenticated, router, pathname])

  if (!isAuthenticated && pathname !== '/login') {
    return null
  }

  return <>{children}</>
}

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, logout } = useAuth()
  const pathname = usePathname()

  if (pathname === '/login') {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-background">
      {isAuthenticated && <Sidebar currentUser={user} />}
      <div className="flex-1 flex flex-col">
        {isAuthenticated && (
          <header className="bg-primary text-primary-foreground shadow-md z-10">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
              <motion.h1 
                className="text-3xl font-bold text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                VSLA Management System
              </motion.h1>
            </div>
          </header>
        )}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {isAuthenticated && (
              <div className="flex justify-end mb-4">
                <div className="flex items-center space-x-4">
                  <ModeToggle />
                  <UserProfile user={user} onLogout={logout} />
                </div>
              </div>
            )}
            <AnimatePresence mode="wait">
              <motion.div
                key={children?.toString()}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ProtectedRoute>
              <RootLayoutContent>{children}</RootLayoutContent>
            </ProtectedRoute>
          </AuthProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}

