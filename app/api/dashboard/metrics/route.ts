import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Get total waste collected from Analytics table (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const totalWaste = await prisma.analytics.aggregate({
      where: {
        date: {
          gte: thirtyDaysAgo
        }
      },
      _sum: {
        totalWaste: true
      }
    })

    // Get active bins count
    const activeBins = await prisma.wasteBin.count({
      where: {
        status: "active"
      }
    })

    const totalBins = await prisma.wasteBin.count()

    // Get recycling rate from analytics
    const latestAnalytics = await prisma.analytics.findFirst({
      orderBy: {
        date: 'desc'
      }
    })

    const recyclingRate = latestAnalytics ? 
      (latestAnalytics.recycledWaste / latestAnalytics.totalWaste) * 100 : 0

    return NextResponse.json({
      totalWaste: totalWaste._sum.totalWaste || 0,
      activeBins,
      totalBins,
      recyclingRate
    })
  } catch (error) {
    console.error("Error fetching dashboard metrics:", error)
    return NextResponse.json(
      { error: "Failed to fetch dashboard metrics" },
      { status: 500 }
    )
  }
} 