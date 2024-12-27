"use client"

import { useState, useEffect } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AddVSLAForm } from "../components/AddVSLAForm"
import { getVSLAs, createVSLA } from '../services/api'
import { useToast } from "@/components/ui/use-toast"

interface VSLA {
  _id: string;
  name: string;
  location: string;
  members: number;
  totalSavings: number;
}

export default function VSLAs() {
  const [vslas, setVslas] = useState<VSLA[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchVSLAs();
  }, []);

  const fetchVSLAs = async () => {
    try {
      setLoading(true);
      const data = await getVSLAs();
      setVslas(data);
    } catch (error) {
      console.error('Error fetching VSLAs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch VSLAs. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddVSLA = async (vslaData: any) => {
    try {
      const newVSLA = await createVSLA(vslaData);
      setVslas([...vslas, newVSLA]);
      toast({
        title: "Success",
        description: "VSLA added successfully.",
      });
    } catch (error) {
      console.error('Error adding VSLA:', error);
      toast({
        title: "Error",
        description: "Failed to add VSLA. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">VSLAs</h1>
        <AddVSLAForm onSubmit={handleAddVSLA} />
      </div>
      {loading ? (
        <p>Loading VSLAs...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Total Savings</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vslas.map((vsla) => (
              <TableRow key={vsla._id}>
                <TableCell>{vsla.name}</TableCell>
                <TableCell>{vsla.location}</TableCell>
                <TableCell>{vsla.members}</TableCell>
                <TableCell>${vsla.totalSavings}</TableCell>
                <TableCell>
                  <Link href={`/vslas/${vsla._id}`} passHref>
                    <Button variant="outline" size="sm">View</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

