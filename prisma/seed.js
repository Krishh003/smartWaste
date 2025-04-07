const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    // First, create waste bins
    const wasteBins = [{
            name: "Central Park Bin",
            location: "Central Park",
            latitude: 40.7829,
            longitude: -73.9654,
            capacity: 100,
            currentLevel: 85,
            status: "full"
        },
        {
            name: "Main Street Bin",
            location: "Main Street",
            latitude: 40.7128,
            longitude: -74.0060,
            capacity: 100,
            currentLevel: 62,
            status: "active"
        },
        {
            name: "City Hall Bin",
            location: "City Hall",
            latitude: 40.7128,
            longitude: -74.0060,
            capacity: 100,
            currentLevel: 45,
            status: "active"
        },
        {
            name: "Shopping Mall Bin",
            location: "Shopping Mall",
            latitude: 40.7580,
            longitude: -73.9855,
            capacity: 100,
            currentLevel: 78,
            status: "active"
        },
        {
            name: "Train Station Bin",
            location: "Train Station",
            latitude: 40.7527,
            longitude: -73.9772,
            capacity: 100,
            currentLevel: 30,
            status: "active"
        },
        {
            name: "Library Bin",
            location: "Public Library",
            latitude: 40.7532,
            longitude: -73.9822,
            capacity: 100,
            currentLevel: 55,
            status: "active"
        },
        {
            name: "Hospital Bin",
            location: "City Hospital",
            latitude: 40.7614,
            longitude: -73.9776,
            capacity: 100,
            currentLevel: 92,
            status: "full"
        },
        {
            name: "University Bin",
            location: "University Campus",
            latitude: 40.8075,
            longitude: -73.9626,
            capacity: 100,
            currentLevel: 48,
            status: "active"
        },
        {
            name: "Sports Complex Bin",
            location: "Sports Complex",
            latitude: 40.7549,
            longitude: -73.9840,
            capacity: 100,
            currentLevel: 67,
            status: "active"
        },
        {
            name: "Community Center Bin",
            location: "Community Center",
            latitude: 40.7589,
            longitude: -73.9851,
            capacity: 100,
            currentLevel: 75,
            status: "active"
        }
    ]

    // Create waste bins
    for (const bin of wasteBins) {
        await prisma.wasteBin.create({
            data: bin
        })
    }

    // Generate sample analytics data for the last 30 days
    const today = new Date()
    for (let i = 0; i < 30; i++) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)

        // Generate random waste amounts
        const totalWaste = Math.floor(Math.random() * 100) + 20 // Random number between 20 and 120
        const recycledWaste = Math.floor(totalWaste * 0.6) // 60% recycled
        const landfillWaste = totalWaste - recycledWaste // Remaining goes to landfill

        await prisma.analytics.create({
            data: {
                date,
                totalWaste,
                recycledWaste,
                landfillWaste,
            },
        })
    }

    console.log('Seed data created successfully')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async() => {
        await prisma.$disconnect()
    })