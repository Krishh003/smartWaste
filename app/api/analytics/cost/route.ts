import { NextResponse } from "next/server"
import { prisma } from "../../../../lib/prisma"

interface Analytics {
  id: number
  date: Date
  totalWaste: number
  recycledWaste: number
  landfillWaste: number
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
    }) as Analytics[]

    // Calculate monthly cost breakdown
    const monthlyCostData = analytics.reduce((acc: any[], curr) => {
      const month = curr.date.toLocaleString('default', { month: 'short' })
      const existingMonth = acc.find(item => item.name === month)
      
      if (existingMonth) {
        existingMonth.collection += curr.collectionCost
        existingMonth.processing += curr.processingCost
        existingMonth.transportation += curr.transportationCost
        existingMonth.maintenance += curr.maintenanceCost
      } else {
        acc.push({
          name: month,
          collection: curr.collectionCost,
          processing: curr.processingCost,
          transportation: curr.transportationCost,
          maintenance: curr.maintenanceCost
        })
      }
      
      return acc
    }, [])

    // Calculate cost per kg trends
    const costPerKgData = analytics.reduce((acc: any[], curr) => {
      const month = curr.date.toLocaleString('default', { month: 'short' })
      const existingMonth = acc.find(item => item.name === month)
      
      if (existingMonth) {
        const totalCost = curr.collectionCost + curr.processingCost + 
                         curr.transportationCost + curr.maintenanceCost
        existingMonth.costPerKg = totalCost / curr.totalWaste
      } else {
        const totalCost = curr.collectionCost + curr.processingCost + 
                         curr.transportationCost + curr.maintenanceCost
        acc.push({
          name: month,
          costPerKg: totalCost / curr.totalWaste
        })
      }
      
      return acc
    }, [])

    // Calculate cost savings from recycling
    const recyclingSavingsData = analytics.reduce((acc: any[], curr) => {
      const month = curr.date.toLocaleString('default', { month: 'short' })
      const existingMonth = acc.find(item => item.name === month)
      
      if (existingMonth) {
        // Calculate savings based on recycled waste and average cost per kg
        const totalCostPerKg = (curr.collectionCost + curr.processingCost + 
                              curr.transportationCost + curr.maintenanceCost) / curr.totalWaste
        existingMonth.savings += curr.recycledWaste * totalCostPerKg * 0.5 // 50% savings for recycled waste
      } else {
        const totalCostPerKg = (curr.collectionCost + curr.processingCost + 
                              curr.transportationCost + curr.maintenanceCost) / curr.totalWaste
        acc.push({
          name: month,
          savings: curr.recycledWaste * totalCostPerKg * 0.5
        })
      }
      
      return acc
    }, [])

    return NextResponse.json({
      monthlyCostData,
      costPerKgData,
      recyclingSavingsData
    })
  } catch (error) {
    console.error('Error fetching cost analytics:', error)
    return NextResponse.json({ error: 'Failed to fetch cost analytics' }, { status: 500 })
  }
} 