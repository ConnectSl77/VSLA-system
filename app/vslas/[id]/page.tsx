import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MemberManagement } from "@/app/components/MemberManagement"

const vslas = [
  { 
    id: 1, 
    name: 'VSLA Group A', 
    location: 'District 1', 
    members: [
      { id: 1, name: 'John Doe', joinDate: '2023-01-15', totalSavings: 500 },
      { id: 2, name: 'Jane Smith', joinDate: '2023-02-01', totalSavings: 750 },
    ],
    totalSavings: 5000, 
    meetingDay: 'Monday', 
    interestRate: 5 
  },
  { 
    id: 2, 
    name: 'VSLA Group B', 
    location: 'District 2', 
    members: [
      { id: 1, name: 'Alice Johnson', joinDate: '2023-03-10', totalSavings: 600 },
      { id: 2, name: 'Bob Williams', joinDate: '2023-03-15', totalSavings: 450 },
    ],
    totalSavings: 7500, 
    meetingDay: 'Wednesday', 
    interestRate: 4 
  },
  { 
    id: 3, 
    name: 'VSLA Group C', 
    location: 'District 1', 
    members: [
      { id: 1, name: 'Charlie Brown', joinDate: '2023-04-01', totalSavings: 300 },
      { id: 2, name: 'Diana Clark', joinDate: '2023-04-05', totalSavings: 400 },
    ],
    totalSavings: 4000, 
    meetingDay: 'Friday', 
    interestRate: 6 
  },
]

export default function VSLADetails({ params }: { params: { id: string } }) {
  const vsla = vslas.find(v => v.id === parseInt(params.id))

  if (!vsla) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/vslas" passHref>
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to VSLAs
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">{vsla.name}</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="font-medium">Location</dt>
                <dd>{vsla.location}</dd>
              </div>
              <div>
                <dt className="font-medium">Members</dt>
                <dd>{vsla.members.length}</dd>
              </div>
              <div>
                <dt className="font-medium">Total Savings</dt>
                <dd>${vsla.totalSavings}</dd>
              </div>
              <div>
                <dt className="font-medium">Meeting Day</dt>
                <dd>{vsla.meetingDay}</dd>
              </div>
              <div>
                <dt className="font-medium">Interest Rate</dt>
                <dd>{vsla.interestRate}%</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Recent activity will be displayed here.</p>
          </CardContent>
        </Card>
      </div>
      <MemberManagement vslaId={vsla.id} initialMembers={vsla.members} />
    </div>
  )
}

