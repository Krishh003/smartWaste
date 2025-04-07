import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const bins = await prisma.wasteBin.findMany({
      select: {
        id: true,
        location: true,
        currentLevel: true,
        status: true,
      },
      orderBy: {
        currentLevel: 'desc'
      }
    })

    // Transform the data to match the frontend format
    const transformedBins = bins.map(bin => ({
      id: bin.id,
      location: bin.location,
      fillLevel: bin.currentLevel,
      status: bin.status === 'full' ? 'Critical' : 
              bin.status === 'maintenance' ? 'Maintenance' : 'Normal'
    }))

    return NextResponse.json(transformedBins)
  } catch (error) {
    console.error('Error fetching waste bin status:', error)
    return NextResponse.json({ error: 'Failed to fetch waste bin status' }, { status: 500 })
  }
} 