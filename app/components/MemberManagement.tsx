"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Member {
  id: number
  name: string
  joinDate: string
  totalSavings: number
}

interface MemberManagementProps {
  vslaId: number
  initialMembers: Member[]
}

export function MemberManagement({ vslaId, initialMembers }: MemberManagementProps) {
  const [members, setMembers] = useState<Member[]>(initialMembers)
  const [open, setOpen] = useState(false)
  const [newMember, setNewMember] = useState({ name: "", joinDate: "" })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewMember((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault()
    const member: Member = {
      id: members.length + 1,
      name: newMember.name,
      joinDate: newMember.joinDate,
      totalSavings: 0,
    }
    setMembers([...members, member])
    setOpen(false)
    setNewMember({ name: "", joinDate: "" })
    // Here you would typically send this data to your backend
    console.log("New member added:", member)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Members</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add New Member</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Member</DialogTitle>
              <DialogDescription>
                Enter the details for the new VSLA member here.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddMember}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={newMember.name}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="joinDate" className="text-right">
                    Join Date
                  </Label>
                  <Input
                    id="joinDate"
                    name="joinDate"
                    type="date"
                    value={newMember.joinDate}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Member</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead>Total Savings</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.joinDate}</TableCell>
              <TableCell>${member.totalSavings}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">View Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

