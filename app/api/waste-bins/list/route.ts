import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const bins = await prisma.wasteBin.findMany({
      select: {
        id: true,
        name: true,
        location: true,
        latitude: true,
        longitude: true,
        capacity: true,
        currentLevel: true,
        status: true,
        lastCollected: true,
      },
      orderBy: {
        id: 'asc'
      }
    })

    // Transform the data to match the frontend format
    const transformedBins = bins.map(bin => ({
      id: bin.id,
      binId: `BIN-${bin.id.toString().padStart(3, '0')}`,
      location: bin.location,
      coordinates: `${bin.latitude}, ${bin.longitude}`,
      type: "General", // This could be added to the schema if needed
      capacity: bin.capacity,
      fillLevel: bin.currentLevel,
      lastEmptied: bin.lastCollected ? bin.lastCollected.toISOString().split('T')[0] : 'Never',
      status: bin.status === 'active' ? 'Active' : 
              bin.status === 'full' ? 'Full' : 'Maintenance'
    }))

    return NextResponse.json(transformedBins)
  } catch (error) {
    console.error('Error fetching bins list:', error)
    return NextResponse.json({ error: 'Failed to fetch bins list' }, { status: 500 })
  }
} 