import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const routes = await prisma.collectionRoute.findMany({
      include: {
        collections: {
          include: {
            wasteBin: true,
          },
        },
      },
    })

    // Transform the data to include formatted dates and simplify collections
    const transformedRoutes = routes.map(route => ({
      id: route.id,
      name: route.name,
      status: route.status,
      startTime: route.startTime.toISOString(),
      endTime: route.endTime?.toISOString() || null,
      collections: route.collections.map(collection => ({
        id: collection.id,
        amount: collection.amount,
        collectedAt: collection.collectedAt.toISOString(),
        wasteBin: {
          id: collection.wasteBin.id,
          name: collection.wasteBin.name,
          location: collection.wasteBin.location,
        }
      }))
    }))

    return NextResponse.json(transformedRoutes)
  } catch (error) {
    console.error('Error fetching collection routes:', error)
    return NextResponse.json({ error: 'Failed to fetch collection routes' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const route = await prisma.collectionRoute.create({
      data: {
        name: body.name,
        status: body.status,
        startTime: body.startTime,
        endTime: body.endTime,
      },
    })
    return NextResponse.json(route)
  } catch (error) {
    console.error('Error creating collection route:', error)
    return NextResponse.json({ error: 'Failed to create collection route' }, { status: 500 })
  }
} 