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

const COLORS = ["#4ade80", "#3b82f6", "#f59e0b", "#6366f1"]

interface RecyclingData {
  recyclingTrendsData: Array<{
    name: string
    paper: number
    plastic: number
    glass: number
    metal: number
  }>
  recyclingRateData: Array<{
    name: string
    rate: number
  }>
  materialBreakdownData: Array<{
    name: string
    value: number
  }>
}

export function RecyclingRates() {
  const [data, setData] = useState<RecyclingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/analytics/recycling')
        if (!response.ok) {
          throw new Error('Failed to fetch recycling analytics')
        }
        const result = await response.json() as RecyclingData
        setData(result)
      } catch (err) {
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

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Recycling Trends</CardTitle>
          <CardDescription>Monthly recycling volumes by material type</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data.recyclingTrendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="paper" name="Paper" fill="#4ade80" />
              <Bar dataKey="plastic" name="Plastic" fill="#3b82f6" />
              <Bar dataKey="glass" name="Glass" fill="#f59e0b" />
              <Bar dataKey="metal" name="Metal" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recycling Rate</CardTitle>
          <CardDescription>Weekly recycling rate as percentage of total waste</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.recyclingRateData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="rate" name="Recycling Rate (%)" stroke="#4ade80" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Material Breakdown</CardTitle>
          <CardDescription>Breakdown of recycled materials by type</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.materialBreakdownData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.materialBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

