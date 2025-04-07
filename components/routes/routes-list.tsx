"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Truck } from "lucide-react"
import { useEffect, useState } from "react"

interface Route {
  id: number
  name: string
  status: string
  startTime: string
  endTime: string | null
  collections: any[]
}

export function RoutesList() {
  const [routes, setRoutes] = useState<Route[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch('/api/collection-routes')
        if (!response.ok) {
          throw new Error('Failed to fetch routes')
        }
        const data = await response.json()
        setRoutes(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchRoutes()
  }, [])

  const formatTime = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  if (loading) {
    return <div className="text-center py-4">Loading routes...</div>
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Route ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Bins</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {routes.map((route) => (
            <TableRow key={route.id}>
              <TableCell className="font-medium">ROUTE-{route.id.toString().padStart(3, '0')}</TableCell>
              <TableCell>{route.name}</TableCell>
              <TableCell>
                <Badge variant={
                  route.status === 'completed' ? 'default' :
                  route.status === 'in_progress' ? 'secondary' :
                  'outline'
                }>
                  {route.status.charAt(0).toUpperCase() + route.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{formatTime(route.startTime)}</TableCell>
              <TableCell>{route.endTime ? formatTime(route.endTime) : '-'}</TableCell>
              <TableCell>{route.collections.length}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Route</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Delete Route</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

