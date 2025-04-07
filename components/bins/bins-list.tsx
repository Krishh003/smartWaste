"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, MapPin } from "lucide-react"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"

interface Bin {
  id: number
  binId: string
  location: string
  coordinates: string
  type: string
  capacity: number
  fillLevel: number
  lastEmptied: string
  status: string
}

export function BinsList() {
  const [bins, setBins] = useState<Bin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isAdmin } = useAuth()

  useEffect(() => {
    const fetchBins = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch('/api/waste-bins/list', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error('Failed to fetch bins list')
        }
        const data = await response.json()
        setBins(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchBins()
  }, [])

  const updateBinStatus = async (binId: number, status: string) => {
    try {
      const token = localStorage.getItem("token")
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      
      const response = await fetch(`/api/waste-bins/${binId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'x-user-id': user.id?.toString() || '',
          'x-user-role': user.role || '',
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update bin status')
      }

      // Refresh the bins list
      const updatedBins = bins.map(bin =>
        bin.id === binId ? { ...bin, status } : bin
      )
      setBins(updatedBins)
    } catch (err) {
      console.error('Error updating bin status:', err)
    }
  }

  const deleteBin = async (binId: number) => {
    try {
      const token = localStorage.getItem("token")
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      
      const response = await fetch(`/api/waste-bins/${binId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'x-user-id': user.id?.toString() || '',
          'x-user-role': user.role || '',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete bin')
      }

      // Remove the deleted bin from the list
      setBins(bins.filter(bin => bin.id !== binId))
    } catch (err) {
      console.error('Error deleting bin:', err)
    }
  }

  if (loading) {
    return <div className="text-center py-4">Loading bins list...</div>
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Bin ID</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Fill Level</TableHead>
          <TableHead>Last Emptied</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bins.map((bin) => (
          <TableRow key={bin.id}>
            <TableCell className="font-medium">{bin.binId}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{bin.location}</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  bin.type === "Recyclable"
                    ? "border-blue-500 text-blue-500"
                    : bin.type === "Organic"
                      ? "border-green-500 text-green-500"
                      : bin.type === "Paper"
                        ? "border-amber-500 text-amber-500"
                        : "border-gray-500 text-gray-500"
                }
              >
                {bin.type}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex flex-col gap-1 w-32">
                <Progress
                  value={bin.fillLevel}
                  className={`h-2 ${
                    bin.fillLevel > 80 ? "bg-red-100" : bin.fillLevel > 60 ? "bg-amber-100" : "bg-green-100"
                  }`}
                  indicatorClassName={
                    bin.fillLevel > 80 ? "bg-red-500" : bin.fillLevel > 60 ? "bg-amber-500" : "bg-green-500"
                  }
                />
                <span className="text-xs text-muted-foreground">{bin.fillLevel}% full</span>
              </div>
            </TableCell>
            <TableCell>{bin.lastEmptied}</TableCell>
            <TableCell>
              <Badge
                variant={bin.status === "Active" ? "outline" : "default"}
                className={bin.status === "Active" ? "border-green-500 text-green-500" : "bg-amber-500"}
              >
                {bin.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {isAdmin && (
                    <DropdownMenuItem 
                      className="text-red-600 focus:text-red-600"
                      onClick={() => deleteBin(bin.id)}
                    >
                      Delete Bin
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

