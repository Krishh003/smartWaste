import { NextResponse } from "next/server"
import { prisma } from "../../../../lib/prisma"

interface AnalyticsData {
  id: number
  date: Date
  totalWaste: number
  recycledWaste: number
  landfillWaste: number
  organicWaste: number
  collectionCost: number
  processingCost: number
  transportationCost: number
  maintenanceCost: number
  createdAt: Date
  updatedAt: Date
}

export async function GET() {
  try {
    // Get the last 6 months of analytics data
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const analytics = await prisma.analytics.findMany({
      where: {
        date: {
          gte: sixMonthsAgo
        }
      },
      orderBy: {
        date: 'asc'
      }
    }) as AnalyticsData[]

    // Group data by month
    const monthlyData = analytics.reduce((acc: any[], curr) => {
      const month = curr.date.toLocaleString('default', { month: 'short' })
      const existingMonth = acc.find(item => item.name === month)
      
      if (existingMonth) {
        existingMonth.general += curr.landfillWaste
        existingMonth.recyclable += curr.recycledWaste
        existingMonth.organic += curr.organicWaste
      } else {
        acc.push({
          name: month,
          general: curr.landfillWaste,
          recyclable: curr.recycledWaste,
          organic: curr.organicWaste
        })
      }
      
      return acc
    }, [])

    // Calculate waste composition percentages
    const totalWaste = analytics.reduce((sum, curr) => sum + curr.totalWaste, 0)
    const totalRecycled = analytics.reduce((sum, curr) => sum + curr.recycledWaste, 0)
    const totalLandfill = analytics.reduce((sum, curr) => sum + curr.landfillWaste, 0)
    const totalOrganic = analytics.reduce((sum, curr) => sum + curr.organicWaste, 0)

    const wasteComposition = [
      { name: "General", value: (totalLandfill / totalWaste) * 100 },
      { name: "Recyclable", value: (totalRecycled / totalWaste) * 100 },
      { name: "Organic", value: (totalOrganic / totalWaste) * 100 }
    ]

    return NextResponse.json({
      monthlyData,
      wasteComposition
    })
  } catch (error) {
    console.error('Error fetching waste analytics:', error)
    return NextResponse.json({ error: 'Failed to fetch waste analytics' }, { status: 500 })
  }
} 