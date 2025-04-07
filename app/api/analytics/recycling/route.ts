import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

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

    // Calculate recycling trends by material type
    const recyclingTrendsData = analytics.reduce((acc: any[], curr) => {
      const month = curr.date.toLocaleString('default', { month: 'short' })
      const existingMonth = acc.find(item => item.name === month)
      
      if (existingMonth) {
        // Assuming 40% paper, 30% plastic, 20% glass, 10% metal in recycled waste
        existingMonth.paper += curr.recycledWaste * 0.4
        existingMonth.plastic += curr.recycledWaste * 0.3
        existingMonth.glass += curr.recycledWaste * 0.2
        existingMonth.metal += curr.recycledWaste * 0.1
      } else {
        acc.push({
          name: month,
          paper: curr.recycledWaste * 0.4,
          plastic: curr.recycledWaste * 0.3,
          glass: curr.recycledWaste * 0.2,
          metal: curr.recycledWaste * 0.1
        })
      }
      
      return acc
    }, [])

    // Calculate weekly recycling rates
    const recyclingRateData = analytics.reduce((acc: any[], curr, index) => {
      if (index % 7 === 0) {
        const week = Math.floor(index / 7) + 1
        const weekData = analytics.slice(index, index + 7)
        const totalWaste = weekData.reduce((sum, day) => sum + day.totalWaste, 0)
        const recycledWaste = weekData.reduce((sum, day) => sum + day.recycledWaste, 0)
        const rate = totalWaste > 0 ? (recycledWaste / totalWaste) * 100 : 0
        
        acc.push({
          name: `Week ${week}`,
          rate: Math.round(rate)
        })
      }
      return acc
    }, [])

    // Calculate material breakdown percentages
    const totalRecycled = analytics.reduce((sum, curr) => sum + curr.recycledWaste, 0)
    const materialBreakdownData = [
      { name: "Paper", value: (totalRecycled * 0.4 / totalRecycled) * 100 },
      { name: "Plastic", value: (totalRecycled * 0.3 / totalRecycled) * 100 },
      { name: "Glass", value: (totalRecycled * 0.2 / totalRecycled) * 100 },
      { name: "Metal", value: (totalRecycled * 0.1 / totalRecycled) * 100 }
    ]

    return NextResponse.json({
      recyclingTrendsData,
      recyclingRateData,
      materialBreakdownData
    })
  } catch (error) {
    console.error('Error fetching recycling analytics:', error)
    return NextResponse.json({ error: 'Failed to fetch recycling analytics' }, { status: 500 })
  }
} 