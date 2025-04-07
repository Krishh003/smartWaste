"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { useEffect, useState } from "react"

interface CostData {
  monthlyCostData: Array<{
    name: string
    collection: number
    processing: number
    transportation: number
    maintenance: number
  }>
  costPerKgData: Array<{
    name: string
    costPerKg: number
  }>
  recyclingSavingsData: Array<{
    name: string
    savings: number
  }>
}

export function CostAnalysis() {
  const [data, setData] = useState<CostData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const fetchData = async () => {
      try {
        const response = await fetch('/api/analytics/cost')
        if (!response.ok) {
          throw new Error('Failed to fetch cost analytics')
        }
        const result = await response.json() as CostData
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Don't render anything until the component is mounted on the client
  if (!mounted) {
    return null
  }

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {Array(3).fill(0).map((_, i) => (
          <Card key={i} className={i === 0 ? "col-span-2" : ""}>
            <CardHeader>
              <div className="h-6 w-48 animate-pulse rounded bg-muted" />
              <div className="mt-2 h-4 w-64 animate-pulse rounded bg-muted" />
            </CardHeader>
            <CardContent>
              <div className="h-[300px] animate-pulse rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-2">
          <CardContent className="flex h-[300px] items-center justify-center text-red-500">
            Error: {error}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!data) {
    return null
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Monthly Cost Breakdown</CardTitle>
          <CardDescription>Detailed breakdown of waste management costs</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data.monthlyCostData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="collection" name="Collection" fill="#3b82f6" />
              <Bar dataKey="processing" name="Processing" fill="#10b981" />
              <Bar dataKey="transportation" name="Transportation" fill="#f59e0b" />
              <Bar dataKey="maintenance" name="Maintenance" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cost per Kilogram</CardTitle>
          <CardDescription>Average cost per kilogram of waste processed</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.costPerKgData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="costPerKg"
                name="Cost per kg ($)"
                stroke="#3b82f6"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recycling Savings</CardTitle>
          <CardDescription>Cost savings from recycling initiatives</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.recyclingSavingsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="savings"
                name="Savings ($)"
                stroke="#10b981"
                fill="#a7f3d0"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

