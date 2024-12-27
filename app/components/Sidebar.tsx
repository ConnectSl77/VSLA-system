"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, Users2, PiggyBank, CreditCard, History, FileText, UserCog, Menu, Building } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { User, UserRole } from "../types/user"
import permissions from "../data/permissions"
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'

interface SidebarProps {
  currentUser: User;
}

const navItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Member Management', href: '/members', icon: Users },
  { name: 'Groups', href: '/groups', icon: Users2 },
  { name: 'Savings', href: '/savings', icon: PiggyBank },
  { name: 'Loans', href: '/loans', icon: CreditCard },
  { name: 'Credit Unions', href: '/credit-unions', icon: Building },
  { name: 'Transaction History', href: '/transactions', icon: History },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Users', href: '/users', icon: UserCog },
]

export default function Sidebar({ currentUser }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  const userPermissions = permissions[currentUser.role]

  if (!isAuthenticated) {
    return null
  }

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-20 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-4 w-4" />
      </Button>
      <AnimatePresence>
        {(isOpen || typeof window !== 'undefined' && window.innerWidth >= 768) && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-card text-card-foreground w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 mt-16"
          >
            <nav className="space-y-2">
              {navItems.map((item) => {
                if(userPermissions.includes(item.href)){
                  return (
                    <motion.div
                      key={item.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link 
                        href={item.href}
                        className={`flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-primary hover:text-primary-foreground ${pathname === item.href ? 'bg-primary text-primary-foreground' : ''}`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    </motion.div>
                  )
                } else {
                  return null;
                }
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

