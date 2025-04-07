"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

interface Collection {
  id: number
  date: string
  time: string
  location: string
  weight: number
  type: string
  status: string
}

export function RecentCollections() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch('/api/collections/recent')
        if (!response.ok) {
          throw new Error('Failed to fetch recent collections')
        }
        const data = await response.json()
        setCollections(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [])

  if (loading) {
    return <div>Loading recent collections...</div>
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Weight (kg)</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {collections.map((collection) => (
          <TableRow key={collection.id}>
            <TableCell>{collection.date}</TableCell>
            <TableCell>{collection.time}</TableCell>
            <TableCell>{collection.location}</TableCell>
            <TableCell>{collection.weight}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  collection.type === "Recyclable"
                    ? "border-blue-500 text-blue-500"
                    : collection.type === "Organic"
                      ? "border-green-500 text-green-500"
                      : "border-gray-500 text-gray-500"
                }
              >
                {collection.type}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant={collection.status === "Completed" ? "outline" : "default"}
                className={collection.status === "Completed" ? "border-green-500 text-green-500" : "bg-amber-500"}
              >
                {collection.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

