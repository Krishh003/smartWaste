"use client"

import React, { useEffect, useState } from "react"
import { WormIcon as Waste, Truck, BarChart3, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/dashboard/overview"
import { RecentCollections } from "@/components/dashboard/recent-collections"
import { WasteBinStatus } from "@/components/dashboard/waste-bin-status"

interface DashboardMetrics {
  totalWaste: number
  activeBins: number
  totalBins: number
  recyclingRate: number
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/dashboard/metrics')
        if (!response.ok) {
          throw new Error('Failed to fetch metrics')
        }
        const data = await response.json() as DashboardMetrics
        setMetrics(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [])

  const renderMetricCard = (
    title: string,
    value: string | number,
    icon: React.ReactNode,
    description: string
  ) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array(4).fill(0).map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-4 animate-pulse rounded bg-muted" />
                </CardHeader>
                <CardContent>
                  <div className="h-8 w-16 animate-pulse rounded bg-muted" />
                  <div className="mt-2 h-4 w-24 animate-pulse rounded bg-muted" />
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center text-red-500">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {renderMetricCard(
            "Total Waste Collected",
            `${metrics?.totalWaste.toFixed(1) || 0} kg`,
            <Waste className="h-4 w-4 text-green-600" />,
            "Last 30 days"
          )}
          {renderMetricCard(
            "Active Bins",
            `${metrics?.activeBins || 0}/${metrics?.totalBins || 0}`,
            <MapPin className="h-4 w-4 text-green-600" />,
            `${metrics ? Math.round((metrics.activeBins / metrics.totalBins) * 100) : 0}% operational`
          )}
          {renderMetricCard(
            "Recycling Rate",
            `${metrics?.recyclingRate.toFixed(1) || 0}%`,
            <BarChart3 className="h-4 w-4 text-green-600" />,
            "Current rate"
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Waste Collection Overview</CardTitle>
              <CardDescription>Daily waste collection in kilograms over the past 30 days</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Bin Status</CardTitle>
              <CardDescription>Current fill levels of waste bins</CardDescription>
            </CardHeader>
            <CardContent>
              <WasteBinStatus />
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-1">
          <Card>
            <CardHeader>
              <CardTitle>Recent Collections</CardTitle>
              <CardDescription>Details of the most recent waste collections</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentCollections />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

