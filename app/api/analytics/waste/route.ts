import { NextResponse } from "next/server"
import { prisma } from "../../../../lib/prisma"

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
    })

    // Group data by month
    const monthlyData = analytics.reduce((acc: any[], curr) => {
      const month = curr.date.toLocaleString('default', { month: 'short' })
      const existingMonth = acc.find(item => item.name === month)
      
      if (existingMonth) {
        existingMonth.general += curr.landfillWaste
        existingMonth.recyclable += curr.recycledWaste
        existingMonth.organic += curr.totalWaste - curr.landfillWaste - curr.recycledWaste
      } else {
        acc.push({
          name: month,
          general: curr.landfillWaste,
          recyclable: curr.recycledWaste,
          organic: curr.totalWaste - curr.landfillWaste - curr.recycledWaste
        })
      }
      
      return acc
    }, [])

    // Calculate waste composition percentages
    const totalWaste = analytics.reduce((sum, curr) => sum + curr.totalWaste, 0)
    const totalRecycled = analytics.reduce((sum, curr) => sum + curr.recycledWaste, 0)
    const totalLandfill = analytics.reduce((sum, curr) => sum + curr.landfillWaste, 0)
    const totalOrganic = totalWaste - totalRecycled - totalLandfill

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