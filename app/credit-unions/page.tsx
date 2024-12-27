"use client"
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const creditUnions = [
  { id: 1, name: 'Community CU', members: 500, totalAssets: 1000000, location: 'City A' },
  { id: 2, name: 'Rural Savings CU', members: 300, totalAssets: 750000, location: 'Town B' },
  { id: 3, name: 'Farmers CU', members: 200, totalAssets: 500000, location: 'Village C' },
]

const AddCreditUnionDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button>Add New Credit Union</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Credit Union</DialogTitle>
      </DialogHeader>
      <form className="space-y-4">
        <div>
          <Label htmlFor="name">Credit Union Name</Label>
          <Input id="name" placeholder="Enter credit union name" />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="Enter location" />
        </div>
        <div>
          <Label htmlFor="district">District</Label>
          <Input id="district" placeholder="Enter district" />
        </div>
        <Button type="submit">Create Credit Union</Button>
      </form>
    </DialogContent>
  </Dialog>
)

export default function CreditUnions() {
  // const [showForm, setShowForm] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Credit Unions</h1>
        <AddCreditUnionDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Credit Union Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold">{creditUnions.length}</h3>
              <p className="text-sm text-gray-600">Total Credit Unions</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">{creditUnions.reduce((acc, cu) => acc + cu.members, 0)}</h3>
              <p className="text-sm text-gray-600">Total Members</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">${creditUnions.reduce((acc, cu) => acc + cu.totalAssets, 0).toLocaleString()}</h3>
              <p className="text-sm text-gray-600">Total Assets</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>Total Assets</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {creditUnions.map((cu) => (
            <TableRow key={cu.id}>
              <TableCell>{cu.name}</TableCell>
              <TableCell>{cu.members}</TableCell>
              <TableCell>${cu.totalAssets.toLocaleString()}</TableCell>
              <TableCell>{cu.location}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">View Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* {showForm && <AddCreditUnionForm />} */}
    </div>
  )
}

