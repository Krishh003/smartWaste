import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const wasteBins = await prisma.wasteBin.findMany()
    return NextResponse.json(wasteBins)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch waste bins' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const wasteBin = await prisma.wasteBin.create({
      data: {
        name: body.name,
        location: body.location,
        latitude: body.latitude,
        longitude: body.longitude,
        capacity: body.capacity,
        currentLevel: body.currentLevel,
        status: body.status,
      },
    })
    return NextResponse.json(wasteBin)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create waste bin' }, { status: 500 })
  }
} 