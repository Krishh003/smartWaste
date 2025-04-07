import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

interface Analytics {
  id: number
  date: Date
  totalWaste: number
  recycledWaste: number
  landfillWaste: number
  createdAt: Date
  updatedAt: Date
}

export async function GET() {
  try {
    // Get the last 30 days of analytics data
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const analytics = await prisma.analytics.findMany({
      where: {
        date: {
          gte: thirtyDaysAgo
        }
      },
      orderBy: {
        date: 'asc'
      }
    })

    // Transform the data to match the frontend format
    const transformedData = analytics.map((analytics: Analytics) => ({
      name: analytics.date.getDate().toString().padStart(2, '0'),
      total: analytics.totalWaste
    }))

    return NextResponse.json(transformedData)
  } catch (error) {
    console.error('Error fetching overview data:', error)
    return NextResponse.json({ error: 'Failed to fetch overview data' }, { status: 500 })
  }
} 