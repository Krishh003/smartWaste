import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface DuplicateAnalytics {
  date: Date
  count: number
}

interface DuplicateBin {
  name: string
  location: string
  count: number
}

interface DuplicateRoute {
  name: string
  startTime: Date
  count: number
}

interface DuplicateCollection {
  wasteBinId: number
  routeId: number
  collectedAt: Date
  count: number
}

async function removeDuplicates() {
  try {
    console.log('Starting duplicate removal process...')

    // 1. Check for duplicate analytics entries (same date)
    console.log('Checking for duplicate analytics entries...')
    const duplicateAnalytics = await prisma.$queryRaw<DuplicateAnalytics[]>`
      SELECT date, COUNT(*) as count
      FROM Analytics
      GROUP BY date
      HAVING count > 1
    `
    
    if (duplicateAnalytics.length > 0) {
      console.log(`Found ${duplicateAnalytics.length} dates with duplicate analytics entries`)
      // Keep the most recent entry for each date
      await prisma.$executeRaw`
        DELETE a1 FROM Analytics a1
        INNER JOIN Analytics a2
        WHERE a1.date = a2.date
        AND a1.id < a2.id
      `
      console.log('Removed duplicate analytics entries')
    }

    // 2. Check for duplicate waste bins (same name and location)
    console.log('Checking for duplicate waste bins...')
    const duplicateBins = await prisma.$queryRaw<DuplicateBin[]>`
      SELECT name, location, COUNT(*) as count
      FROM WasteBin
      GROUP BY name, location
      HAVING count > 1
    `
    
    if (duplicateBins.length > 0) {
      console.log(`Found ${duplicateBins.length} duplicate waste bins`)
      // Keep the most recent entry for each name/location combination
      await prisma.$executeRaw`
        DELETE b1 FROM WasteBin b1
        INNER JOIN WasteBin b2
        WHERE b1.name = b2.name
        AND b1.location = b2.location
        AND b1.id < b2.id
      `
      console.log('Removed duplicate waste bins')
    }

    // 3. Check for duplicate collection routes (same name and start time)
    console.log('Checking for duplicate collection routes...')
    const duplicateRoutes = await prisma.$queryRaw<DuplicateRoute[]>`
      SELECT name, startTime, COUNT(*) as count
      FROM CollectionRoute
      GROUP BY name, startTime
      HAVING count > 1
    `
    
    if (duplicateRoutes.length > 0) {
      console.log(`Found ${duplicateRoutes.length} duplicate collection routes`)
      // Keep the most recent entry for each name/startTime combination
      await prisma.$executeRaw`
        DELETE r1 FROM CollectionRoute r1
        INNER JOIN CollectionRoute r2
        WHERE r1.name = r2.name
        AND r1.startTime = r2.startTime
        AND r1.id < r2.id
      `
      console.log('Removed duplicate collection routes')
    }

    // 4. Check for duplicate collections (same waste bin, route, and collection time)
    console.log('Checking for duplicate collections...')
    const duplicateCollections = await prisma.$queryRaw<DuplicateCollection[]>`
      SELECT wasteBinId, routeId, collectedAt, COUNT(*) as count
      FROM Collection
      GROUP BY wasteBinId, routeId, collectedAt
      HAVING count > 1
    `
    
    if (duplicateCollections.length > 0) {
      console.log(`Found ${duplicateCollections.length} duplicate collections`)
      // Keep the most recent entry for each waste bin/route/collection time combination
      await prisma.$executeRaw`
        DELETE c1 FROM Collection c1
        INNER JOIN Collection c2
        WHERE c1.wasteBinId = c2.wasteBinId
        AND c1.routeId = c2.routeId
        AND c1.collectedAt = c2.collectedAt
        AND c1.id < c2.id
      `
      console.log('Removed duplicate collections')
    }

    console.log('Duplicate removal process completed successfully')
  } catch (error) {
    console.error('Error removing duplicates:', error)
  } finally {
    await prisma.$disconnect()
  }
}

removeDuplicates() 