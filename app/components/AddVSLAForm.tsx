"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

interface VSLAFormData {
  name: string;
  location: string;
  members: number;
  totalSavings: number;
}

export function AddVSLAForm({ onSubmit }: { onSubmit: (data: VSLAFormData) => void }) {
  const [formData, setFormData] = useState<VSLAFormData>({
    name: "",
    location: "",
    members: 0,
    totalSavings: 0,
  })
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.location && formData.members > 0) {
      onSubmit(formData)
      setFormData({
        name: "",
        location: "",
        members: 0,
        totalSavings: 0,
      })
    } else {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive",
      })
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-8 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-4">
        <motion.h2
          className="text-2xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Add New VSLA Group
        </motion.h2>
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Label htmlFor="name">VSLA Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Label htmlFor="members">Number of Members</Label>
            <Input
              id="members"
              name="members"
              type="number"
              value={formData.members}
              onChange={handleInputChange}
              required
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Label htmlFor="totalSavings">Total Savings</Label>
            <Input
              id="totalSavings"
              name="totalSavings"
              type="number"
              value={formData.totalSavings}
              onChange={handleInputChange}
              required
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Button type="submit" className="w-full">Add VSLA Group</Button>
      </motion.div>
    </motion.form>
  )
}

