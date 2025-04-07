import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const collections = await prisma.collection.findMany({
      select: {
        id: true,
        collectedAt: true,
        amount: true,
        wasteBin: {
          select: {
            location: true,
          }
        },
        route: {
          select: {
            status: true,
          }
        }
      },
      orderBy: {
        collectedAt: 'desc'
      },
      take: 5
    })

    // Transform the data to match the frontend format
    const transformedCollections = collections.map(collection => ({
      id: collection.id,
      date: collection.collectedAt.toISOString().split('T')[0],
      time: collection.collectedAt.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
      location: collection.wasteBin.location,
      weight: collection.amount,
      type: "General", // This could be added to the schema if needed
      status: collection.route.status === 'completed' ? 'Completed' : 'In Progress'
    }))

    return NextResponse.json(transformedCollections)
  } catch (error) {
    console.error('Error fetching recent collections:', error)
    return NextResponse.json({ error: 'Failed to fetch recent collections' }, { status: 500 })
  }
} 