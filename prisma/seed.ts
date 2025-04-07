import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Generate sample analytics data for the last 30 days
  const today = new Date()
  for (let i = 0; i < 30; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    // Generate random waste amounts
    const totalWaste = Math.floor(Math.random() * 100) + 20 // Random number between 20 and 120
    const recycledWaste = Math.floor(totalWaste * 0.6) // 60% recycled
    const landfillWaste = totalWaste - recycledWaste // Remaining goes to landfill

    // Generate cost data based on waste amounts
    const collectionCost = totalWaste * 2.5 // $2.5 per kg for collection
    const processingCost = totalWaste * 1.8 // $1.8 per kg for processing
    const transportationCost = totalWaste * 1.2 // $1.2 per kg for transportation
    const maintenanceCost = totalWaste * 0.5 // $0.5 per kg for maintenance

    await prisma.analytics.create({
      data: {
        date,
        totalWaste,
        recycledWaste,
        landfillWaste,
        collectionCost,
        processingCost,
        transportationCost,
        maintenanceCost
      },
    })
  }

  // Create sample waste bins
  const wasteBins = [
    {
      name: "Downtown Bin 1",
      location: "123 Main St",
      latitude: 40.7128,
      longitude: -74.0060,
      capacity: 100,
      currentLevel: 75,
      status: "active",
    },
    {
      name: "Downtown Bin 2",
      location: "456 Market St",
      latitude: 40.7129,
      longitude: -74.0061,
      capacity: 100,
      currentLevel: 90,
      status: "full",
    },
    {
      name: "Suburban Bin 1",
      location: "789 Oak Ave",
      latitude: 40.7130,
      longitude: -74.0062,
      capacity: 100,
      currentLevel: 60,
      status: "active",
    },
    {
      name: "Industrial Bin 1",
      location: "321 Factory Rd",
      latitude: 40.7131,
      longitude: -74.0063,
      capacity: 200,
      currentLevel: 85,
      status: "active",
    },
    {
      name: "Residential Bin 1",
      location: "654 Home St",
      latitude: 40.7132,
      longitude: -74.0064,
      capacity: 100,
      currentLevel: 40,
      status: "active",
    },
  ]

  const createdBins = []
  for (const bin of wasteBins) {
    const createdBin = await prisma.wasteBin.create({
      data: bin,
    })
    createdBins.push(createdBin)
  }

  // Create sample collection routes
  const routes = [
    {
      name: "Downtown Route",
      status: "scheduled",
      startTime: new Date("2024-04-08T09:00:00Z"),
      endTime: new Date("2024-04-08T12:00:00Z"),
      collections: [
        {
          wasteBinId: createdBins[0].id,
          collectedAt: new Date("2024-04-08T09:30:00Z"),
          amount: 75,
        },
        {
          wasteBinId: createdBins[1].id,
          collectedAt: new Date("2024-04-08T10:00:00Z"),
          amount: 90,
        },
      ],
    },
    {
      name: "Suburban Route A",
      status: "in_progress",
      startTime: new Date("2024-04-08T08:00:00Z"),
      endTime: new Date("2024-04-08T11:00:00Z"),
      collections: [
        {
          wasteBinId: createdBins[2].id,
          collectedAt: new Date("2024-04-08T08:30:00Z"),
          amount: 60,
        },
      ],
    },
    {
      name: "Industrial Zone Route",
      status: "completed",
      startTime: new Date("2024-04-07T10:00:00Z"),
      endTime: new Date("2024-04-07T14:00:00Z"),
      collections: [
        {
          wasteBinId: createdBins[3].id,
          collectedAt: new Date("2024-04-07T11:00:00Z"),
          amount: 85,
        },
        {
          wasteBinId: createdBins[4].id,
          collectedAt: new Date("2024-04-07T12:00:00Z"),
          amount: 40,
        },
      ],
    },
    {
      name: "Residential Area B",
      status: "scheduled",
      startTime: new Date("2024-04-09T09:00:00Z"),
      endTime: new Date("2024-04-09T12:00:00Z"),
      collections: [],
    },
    {
      name: "Commercial District",
      status: "scheduled",
      startTime: new Date("2024-04-09T13:00:00Z"),
      endTime: new Date("2024-04-09T16:00:00Z"),
      collections: [],
    },
  ]

  // Create routes and their collections
  for (const route of routes) {
    const { collections, ...routeData } = route
    const createdRoute = await prisma.collectionRoute.create({
      data: routeData,
    })

    // Create collections for this route
    for (const collection of collections) {
      await prisma.collection.create({
        data: {
          ...collection,
          routeId: createdRoute.id,
        },
      })
    }
  }

  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 