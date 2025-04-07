"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { useEffect, useState } from "react"

const COLORS = ["#6b7280", "#3b82f6", "#10b981"]

interface WasteData {
  monthlyData: Array<{
    name: string
    general: number
    recyclable: number
    organic: number
  }>
  wasteComposition: Array<{
    name: string
    value: number
  }>
}

export function WasteAnalytics() {
  const [data, setData] = useState<WasteData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/analytics/waste')
        if (!response.ok) {
          throw new Error('Failed to fetch waste analytics')
        }
        const result = await response.json()
        console.log('Fetched waste analytics data:', result)
        setData(result)
      } catch (err) {
        console.error('Error fetching waste analytics:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

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

  console.log('Rendering waste analytics with data:', data)

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Monthly Waste Collection</CardTitle>
          <CardDescription>Breakdown of waste collection by type over the past 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="general" name="General Waste" fill="#6b7280" />
              <Bar dataKey="recyclable" name="Recyclable" fill="#3b82f6" />
              <Bar dataKey="organic" name="Organic" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Waste Composition</CardTitle>
          <CardDescription>Distribution of waste types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.wasteComposition}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {data.wasteComposition.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Collection Trends</CardTitle>
          <CardDescription>Total waste collection trends over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="general" name="General Waste" stroke="#6b7280" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="recyclable" name="Recyclable" stroke="#3b82f6" />
                <Line type="monotone" dataKey="organic" name="Organic" stroke="#10b981" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

