"use client"

import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface WasteBin {
  id: number
  location: string
  fillLevel: number
  status: string
}

export function WasteBinStatus() {
  const [bins, setBins] = useState<WasteBin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBins = async () => {
      try {
        const response = await fetch('/api/waste-bins/status')
        if (!response.ok) {
          throw new Error('Failed to fetch waste bin status')
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

  if (loading) {
    return <div className="space-y-4">Loading waste bin status...</div>
  }

  if (error) {
    return <div className="space-y-4 text-red-500">Error: {error}</div>
  }

  return (
    <div className="flex flex-col border rounded-lg">
      <div className="flex-none p-4 border-b">
        <h3 className="text-lg font-semibold">Waste Bin Status</h3>
      </div>
      <ScrollArea className="h-[300px]">
        <div className="p-4 space-y-4">
          {bins.map((bin) => (
            <div key={bin.id} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{bin.location}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  bin.status === 'Normal' ? 'bg-green-100 text-green-800' :
                  bin.status === 'Critical' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {bin.status}
                </span>
              </div>
              <Progress 
                value={bin.fillLevel} 
                className={`h-2 ${
                  bin.status === 'Critical' ? 'bg-red-100' :
                  bin.status === 'Maintenance' ? 'bg-yellow-100' :
                  'bg-green-100'
                }`}
                indicatorClassName={
                  bin.status === 'Critical' ? 'bg-red-500' :
                  bin.status === 'Maintenance' ? 'bg-yellow-500' :
                  'bg-green-500'
                }
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

