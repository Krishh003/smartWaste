import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const wasteBins = [
  {
    name: "Central Park Main",
    location: "Central Park, near main entrance",
    latitude: 40.7829,
    longitude: -73.9654,
    capacity: 100,
    currentLevel: 45,
    status: "active"
  },
  {
    name: "Times Square North",
    location: "Times Square, north side",
    latitude: 40.7580,
    longitude: -73.9855,
    capacity: 120,
    currentLevel: 78,
    status: "active"
  },
  {
    name: "Brooklyn Bridge Park",
    location: "Brooklyn Bridge Park, pier 1",
    latitude: 40.7021,
    longitude: -73.9967,
    capacity: 90,
    currentLevel: 92,
    status: "full"
  },
  {
    name: "Union Square",
    location: "Union Square, east side",
    latitude: 40.7359,
    longitude: -73.9911,
    capacity: 110,
    currentLevel: 65,
    status: "active"
  },
  {
    name: "High Line Park",
    location: "High Line Park, 14th St entrance",
    latitude: 40.7392,
    longitude: -74.0050,
    capacity: 80,
    currentLevel: 30,
    status: "active"
  },
  {
    name: "Battery Park",
    location: "Battery Park, near ferry terminal",
    latitude: 40.7033,
    longitude: -74.0170,
    capacity: 100,
    currentLevel: 85,
    status: "active"
  },
  {
    name: "Prospect Park",
    location: "Prospect Park, Grand Army Plaza",
    latitude: 40.6741,
    longitude: -73.9708,
    capacity: 95,
    currentLevel: 95,
    status: "full"
  },
  {
    name: "Riverside Park",
    location: "Riverside Park, 79th St",
    latitude: 40.7844,
    longitude: -73.9817,
    capacity: 85,
    currentLevel: 40,
    status: "active"
  },
  {
    name: "Washington Square",
    location: "Washington Square Park, center",
    latitude: 40.7308,
    longitude: -73.9973,
    capacity: 75,
    currentLevel: 60,
    status: "active"
  },
  {
    name: "Bryant Park",
    location: "Bryant Park, library side",
    latitude: 40.7536,
    longitude: -73.9832,
    capacity: 105,
    currentLevel: 70,
    status: "active"
  },
  {
    name: "Madison Square",
    location: "Madison Square Park, north end",
    latitude: 40.7411,
    longitude: -73.9883,
    capacity: 95,
    currentLevel: 88,
    status: "active"
  },
  {
    name: "Tompkins Square",
    location: "Tompkins Square Park, Avenue A",
    latitude: 40.7265,
    longitude: -73.9817,
    capacity: 80,
    currentLevel: 75,
    status: "active"
  },
  {
    name: "Hudson River Park",
    location: "Hudson River Park, Chelsea Piers",
    latitude: 40.7424,
    longitude: -74.0081,
    capacity: 100,
    currentLevel: 50,
    status: "active"
  },
  {
    name: "Flushing Meadows",
    location: "Flushing Meadows Park, near Unisphere",
    latitude: 40.7470,
    longitude: -73.8456,
    capacity: 120,
    currentLevel: 82,
    status: "active"
  },
  {
    name: "Forest Park",
    location: "Forest Park, main entrance",
    latitude: 40.7005,
    longitude: -73.8448,
    capacity: 90,
    currentLevel: 35,
    status: "active"
  },
  {
    name: "Rockefeller Center",
    location: "Rockefeller Center, main plaza",
    latitude: 40.7589,
    longitude: -73.9791,
    capacity: 115,
    currentLevel: 68,
    status: "active"
  },
  {
    name: "South Street Seaport",
    location: "South Street Seaport, pier 17",
    latitude: 40.7069,
    longitude: -74.0037,
    capacity: 95,
    currentLevel: 72,
    status: "active"
  },
  {
    name: "Gramercy Park",
    location: "Gramercy Park, east side",
    latitude: 40.7376,
    longitude: -73.9865,
    capacity: 85,
    currentLevel: 55,
    status: "active"
  },
  {
    name: "Stuyvesant Square",
    location: "Stuyvesant Square, west side",
    latitude: 40.7336,
    longitude: -73.9807,
    capacity: 75,
    currentLevel: 48,
    status: "active"
  },
  {
    name: "City Hall Park",
    location: "City Hall Park, north end",
    latitude: 40.7127,
    longitude: -74.0060,
    capacity: 100,
    currentLevel: 63,
    status: "active"
  },
  {
    name: "Columbus Park",
    location: "Columbus Park, Chinatown",
    latitude: 40.7142,
    longitude: -73.9995,
    capacity: 90,
    currentLevel: 78,
    status: "active"
  },
  {
    name: "Seward Park",
    location: "Seward Park, Lower East Side",
    latitude: 40.7147,
    longitude: -73.9894,
    capacity: 80,
    currentLevel: 42,
    status: "active"
  },
  {
    name: "Sara D. Roosevelt Park",
    location: "Sara D. Roosevelt Park, center",
    latitude: 40.7214,
    longitude: -73.9945,
    capacity: 95,
    currentLevel: 87,
    status: "active"
  },
  {
    name: "East River Park",
    location: "East River Park, near FDR Drive",
    latitude: 40.7148,
    longitude: -73.9770,
    capacity: 110,
    currentLevel: 58,
    status: "active"
  },
  {
    name: "Corlears Park",
    location: "Corlears Park, Lower East Side",
    latitude: 40.7140,
    longitude: -73.9800,
    capacity: 75,
    currentLevel: 65,
    status: "active"
  },
  {
    name: "Collect Pond Park",
    location: "Collect Pond Park, Civic Center",
    latitude: 40.7144,
    longitude: -74.0028,
    capacity: 85,
    currentLevel: 45,
    status: "active"
  },
  {
    name: "Vesuvio Playground",
    location: "Vesuvio Playground, SoHo",
    latitude: 40.7234,
    longitude: -73.9985,
    capacity: 70,
    currentLevel: 52,
    status: "active"
  },
  {
    name: "DeSalvio Playground",
    location: "DeSalvio Playground, Little Italy",
    latitude: 40.7196,
    longitude: -73.9975,
    capacity: 65,
    currentLevel: 38,
    status: "active"
  },
  {
    name: "Petrosino Square",
    location: "Petrosino Square, Little Italy",
    latitude: 40.7217,
    longitude: -73.9972,
    capacity: 60,
    currentLevel: 47,
    status: "active"
  },
  {
    name: "Mulberry Street Park",
    location: "Mulberry Street Park, Nolita",
    latitude: 40.7225,
    longitude: -73.9960,
    capacity: 55,
    currentLevel: 33,
    status: "active"
  },
  {
    name: "Elizabeth Street Garden",
    location: "Elizabeth Street Garden, Nolita",
    latitude: 40.7210,
    longitude: -73.9965,
    capacity: 50,
    currentLevel: 28,
    status: "active"
  }
]

async function main() {
  try {
    // First delete all related records
    await prisma.collection.deleteMany()
    console.log('Deleted existing collections')

    // Then delete the bins
    await prisma.wasteBin.deleteMany()
    console.log('Deleted existing bins')

    // Create new bins
    for (const bin of wasteBins) {
      await prisma.wasteBin.create({
        data: bin
      })
    }
    console.log('Created new bins')
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 