"use client"
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddVSLAForm } from '../components/AddVSLAForm'

interface Signatory {
  name: string;
  phoneNumber: string;
  position: string;
}

interface Group {
  id: number;
  name: string;
  members: number;
  totalSavings: number;
  location: string;
  chiefdom: string;
  district: string;
  signatories: Signatory[];
}

const initialGroups: Group[] = [
  { 
    id: 1, 
    name: 'VSLA Group A', 
    members: 25, 
    totalSavings: 5000, 
    location: 'Location 1',
    chiefdom: 'Chiefdom 1',
    district: 'District 1',
    signatories: [
      { name: 'John Doe', phoneNumber: '1234567890', position: 'Chairman' },
      { name: 'Jane Smith', phoneNumber: '0987654321', position: 'Secretary' },
      { name: 'Bob Johnson', phoneNumber: '1122334455', position: 'Treasurer' },
    ]
  },
  { 
    id: 2, 
    name: 'VSLA Group B', 
    members: 30, 
    totalSavings: 7500, 
    location: 'Location 2',
    chiefdom: 'Chiefdom 2',
    district: 'District 2',
    signatories: [
      { name: 'Alice Brown', phoneNumber: '2233445566', position: 'Chairman' },
      { name: 'Charlie Davis', phoneNumber: '3344556677', position: 'Secretary' },
      { name: 'Eva Wilson', phoneNumber: '4455667788', position: 'Treasurer' },
    ]
  },
  { 
    id: 3, 
    name: 'VSLA Group C', 
    members: 20, 
    totalSavings: 4000, 
    location: 'Location 3',
    chiefdom: 'Chiefdom 1',
    district: 'District 1',
    signatories: [
      { name: 'Frank Miller', phoneNumber: '5566778899', position: 'Chairman' },
      { name: 'Grace Taylor', phoneNumber: '6677889900', position: 'Secretary' },
      { name: 'Henry Clark', phoneNumber: '7788990011', position: 'Treasurer' },
    ]
  },
]

export default function Groups() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [groups, setGroups] = useState<Group[]>(initialGroups)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCriteria, setFilterCriteria] = useState('name')
  const [filteredGroups, setFilteredGroups] = useState<Group[]>(groups)

  const handleAddVSLA = (formData: any) => {
    console.log("New VSLA data:", formData)
    // Here you would typically send this data to your backend
    // and then update the groups list
    setShowAddForm(false)
  }

  useEffect(() => {
    const lowercasedSearch = searchTerm.toLowerCase()
    const filtered = groups.filter(group => {
      switch (filterCriteria) {
        case 'name':
          return group.name.toLowerCase().includes(lowercasedSearch)
        case 'location':
          return group.location.toLowerCase().includes(lowercasedSearch)
        case 'chiefdom':
          return group.chiefdom.toLowerCase().includes(lowercasedSearch)
        case 'district':
          return group.district.toLowerCase().includes(lowercasedSearch)
        case 'signatory':
          return group.signatories.some(sig => 
            sig.name.toLowerCase().includes(lowercasedSearch) ||
            sig.phoneNumber.includes(searchTerm) ||
            sig.position.toLowerCase().includes(lowercasedSearch)
          )
        default:
          return true
      }
    })
    setFilteredGroups(filtered)
  }, [searchTerm, filterCriteria, groups])

  if (showAddForm) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Add New VSLA Group</h1>
          <Button onClick={() => setShowAddForm(false)}>Back to Groups</Button>
        </div>
        <AddVSLAForm onSubmit={handleAddVSLA} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Groups</h1>
        <Button onClick={() => setShowAddForm(true)}>Add New Group</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Group Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold">{groups.length}</h3>
              <p className="text-sm text-gray-600">Total Groups</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">{groups.reduce((acc, group) => acc + group.members, 0)}</h3>
              <p className="text-sm text-gray-600">Total Members</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">${groups.reduce((acc, group) => acc + group.totalSavings, 0)}</h3>
              <p className="text-sm text-gray-600">Total Savings</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-4">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filterCriteria} onValueChange={setFilterCriteria}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Group Name</SelectItem>
            <SelectItem value="location">Location</SelectItem>
            <SelectItem value="chiefdom">Chiefdom</SelectItem>
            <SelectItem value="district">District</SelectItem>
            <SelectItem value="signatory">Signatory</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>Total Savings</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Chiefdom</TableHead>
            <TableHead>District</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredGroups.map((group) => (
            <TableRow key={group.id}>
              <TableCell>{group.name}</TableCell>
              <TableCell>{group.members}</TableCell>
              <TableCell>${group.totalSavings}</TableCell>
              <TableCell>{group.location}</TableCell>
              <TableCell>{group.chiefdom}</TableCell>
              <TableCell>{group.district}</TableCell>
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

