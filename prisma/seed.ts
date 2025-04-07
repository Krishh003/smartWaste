import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin and regular user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const userPassword = await bcrypt.hash('user123', 10)

  const admin = await prisma.user.create({
    data: {
      email: 'admin@smartwaste.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN'
    }
  })

  const user = await prisma.user.create({
    data: {
      email: 'user@smartwaste.com',
      name: 'Regular User',
      password: userPassword,
      role: 'USER'
    }
  })

  // Generate sample analytics data for the last 90 days (3 months)
  const today = new Date()
  for (let i = 0; i < 90; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    // Generate random waste amounts with realistic proportions
    const totalWaste = Math.floor(Math.random() * 100) + 20 // Random number between 20 and 120
    const recycledWaste = Math.floor(totalWaste * 0.4) // 40% recycled
    const landfillWaste = Math.floor(totalWaste * 0.3) // 30% landfill
    const organicWaste = totalWaste - recycledWaste - landfillWaste // Remaining is organic

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
        organicWaste,
        collectionCost,
        processingCost,
        transportationCost,
        maintenanceCost
      },
    })
  }

  // Create 15 waste bins with realistic locations and data
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
    {
      name: "Shopping Mall Bin",
      location: "Mall Entrance",
      latitude: 40.7133,
      longitude: -74.0065,
      capacity: 150,
      currentLevel: 95,
      status: "full",
    },
    {
      name: "Park Bin 1",
      location: "Central Park",
      latitude: 40.7134,
      longitude: -74.0066,
      capacity: 80,
      currentLevel: 70,
      status: "active",
    },
    {
      name: "University Bin",
      location: "Campus Center",
      latitude: 40.7135,
      longitude: -74.0067,
      capacity: 120,
      currentLevel: 65,
      status: "active",
    },
    {
      name: "Hospital Bin",
      location: "Main Entrance",
      latitude: 40.7136,
      longitude: -74.0068,
      capacity: 100,
      currentLevel: 80,
      status: "active",
    },
    {
      name: "Train Station Bin",
      location: "Platform 1",
      latitude: 40.7137,
      longitude: -74.0069,
      capacity: 100,
      currentLevel: 45,
      status: "active",
    },
    {
      name: "Office Complex Bin",
      location: "Building A",
      latitude: 40.7138,
      longitude: -74.0070,
      capacity: 100,
      currentLevel: 55,
      status: "active",
    },
    {
      name: "Restaurant Bin",
      location: "Back Alley",
      latitude: 40.7139,
      longitude: -74.0071,
      capacity: 100,
      currentLevel: 85,
      status: "active",
    },
    {
      name: "School Bin",
      location: "Playground",
      latitude: 40.7140,
      longitude: -74.0072,
      capacity: 80,
      currentLevel: 60,
      status: "active",
    },
    {
      name: "Library Bin",
      location: "Main Entrance",
      latitude: 40.7141,
      longitude: -74.0073,
      capacity: 100,
      currentLevel: 50,
      status: "active",
    },
    {
      name: "Sports Complex Bin",
      location: "Stadium Entrance",
      latitude: 40.7142,
      longitude: -74.0074,
      capacity: 150,
      currentLevel: 75,
      status: "active",
    }
  ]

  const createdBins = []
  for (const bin of wasteBins) {
    const createdBin = await prisma.wasteBin.create({
      data: bin,
    })
    createdBins.push(createdBin)
  }

  // Create 15 collection routes with realistic data
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
      name: "Commercial District Route",
      status: "scheduled",
      startTime: new Date("2024-04-09T09:00:00Z"),
      endTime: new Date("2024-04-09T12:00:00Z"),
      collections: [
        {
          wasteBinId: createdBins[5].id,
          collectedAt: new Date("2024-04-09T09:30:00Z"),
          amount: 95,
        },
      ],
    },
    {
      name: "Park and Recreation Route",
      status: "scheduled",
      startTime: new Date("2024-04-09T13:00:00Z"),
      endTime: new Date("2024-04-09T16:00:00Z"),
      collections: [
        {
          wasteBinId: createdBins[6].id,
          collectedAt: new Date("2024-04-09T13:30:00Z"),
          amount: 70,
        },
      ],
    },
    {
      name: "Educational Institutions Route",
      status: "scheduled",
      startTime: new Date("2024-04-10T08:00:00Z"),
      endTime: new Date("2024-04-10T11:00:00Z"),
      collections: [
        {
          wasteBinId: createdBins[7].id,
          collectedAt: new Date("2024-04-10T08:30:00Z"),
          amount: 65,
        },
        {
          wasteBinId: createdBins[12].id,
          collectedAt: new Date("2024-04-10T09:30:00Z"),
          amount: 60,
        },
      ],
    },
    {
      name: "Healthcare Facilities Route",
      status: "scheduled",
      startTime: new Date("2024-04-10T13:00:00Z"),
      endTime: new Date("2024-04-10T16:00:00Z"),
      collections: [
        {
          wasteBinId: createdBins[8].id,
          collectedAt: new Date("2024-04-10T13:30:00Z"),
          amount: 80,
        },
      ],
    },
    {
      name: "Transportation Hubs Route",
      status: "scheduled",
      startTime: new Date("2024-04-11T09:00:00Z"),
      endTime: new Date("2024-04-11T12:00:00Z"),
      collections: [
        {
          wasteBinId: createdBins[9].id,
          collectedAt: new Date("2024-04-11T09:30:00Z"),
          amount: 45,
        },
      ],
    },
    {
      name: "Business District Route",
      status: "scheduled",
      startTime: new Date("2024-04-11T13:00:00Z"),
      endTime: new Date("2024-04-11T16:00:00Z"),
      collections: [
        {
          wasteBinId: createdBins[10].id,
          collectedAt: new Date("2024-04-11T13:30:00Z"),
          amount: 55,
        },
      ],
    },
    {
      name: "Food Service Route",
      status: "scheduled",
      startTime: new Date("2024-04-12T09:00:00Z"),
      endTime: new Date("2024-04-12T12:00:00Z"),
      collections: [
        {
          wasteBinId: createdBins[11].id,
          collectedAt: new Date("2024-04-12T09:30:00Z"),
          amount: 85,
        },
      ],
    },
    {
      name: "Cultural Institutions Route",
      status: "scheduled",
      startTime: new Date("2024-04-12T13:00:00Z"),
      endTime: new Date("2024-04-12T16:00:00Z"),
      collections: [
        {
          wasteBinId: createdBins[13].id,
          collectedAt: new Date("2024-04-12T13:30:00Z"),
          amount: 50,
        },
      ],
    },
    {
      name: "Sports and Recreation Route",
      status: "scheduled",
      startTime: new Date("2024-04-13T09:00:00Z"),
      endTime: new Date("2024-04-13T12:00:00Z"),
      collections: [
        {
          wasteBinId: createdBins[14].id,
          collectedAt: new Date("2024-04-13T09:30:00Z"),
          amount: 75,
        },
      ],
    },
    {
      name: "Residential Area A",
      status: "scheduled",
      startTime: new Date("2024-04-13T13:00:00Z"),
      endTime: new Date("2024-04-13T16:00:00Z"),
      collections: [],
    },
    {
      name: "Residential Area B",
      status: "scheduled",
      startTime: new Date("2024-04-14T09:00:00Z"),
      endTime: new Date("2024-04-14T12:00:00Z"),
      collections: [],
    },
    {
      name: "Mixed-Use Zone",
      status: "scheduled",
      startTime: new Date("2024-04-14T13:00:00Z"),
      endTime: new Date("2024-04-14T16:00:00Z"),
      collections: [],
    }
  ]

  for (const route of routes) {
    await prisma.collectionRoute.create({
      data: {
        name: route.name,
        status: route.status,
        startTime: route.startTime,
        endTime: route.endTime,
        collections: {
          create: route.collections.map(collection => ({
            wasteBinId: collection.wasteBinId,
            collectedAt: collection.collectedAt,
            amount: collection.amount,
          })),
        },
      },
    })
  }

  console.log({ admin, user })
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