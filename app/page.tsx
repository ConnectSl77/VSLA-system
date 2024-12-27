"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart2, Users, PiggyBank, CreditCard, AlertTriangle, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const stats = [
  { name: 'Total VSLAs', value: 25, icon: BarChart2, color: 'text-blue-500' },
  { name: 'Total Members', value: 500, icon: Users, color: 'text-green-500' },
  { name: 'Total Savings', value: '$50,000', icon: PiggyBank, color: 'text-yellow-500' },
  { name: 'Active Loans', value: 75, icon: CreditCard, color: 'text-purple-500' },
  { name: 'Default Loans', value: 5, icon: AlertTriangle, color: 'text-red-500' },
  { name: 'Paid Loans', value: 150, icon: CheckCircle, color: 'text-green-500' },
]

export default function Dashboard() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <div className="space-y-6">
      <motion.h1 
        className="text-3xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Dashboard
      </motion.h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card 
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                <motion.div
                  animate={{
                    scale: hoveredCard === index ? 1.2 : 1,
                    rotate: hoveredCard === index ? 360 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </motion.div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">View Detailed Reports</Button>
      </motion.div>
    </div>
  )
}

