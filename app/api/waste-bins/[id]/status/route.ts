import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const headersList = headers()
    const userId = headersList.get("x-user-id")
    const userRole = headersList.get("x-user-role")

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { status } = await request.json()
    const binId = parseInt(params.id)

    // Only allow updating status to "active" for regular users
    if (userRole !== "ADMIN" && status !== "active") {
      return NextResponse.json(
        { error: "Only admins can set non-active status" },
        { status: 403 }
      )
    }

    const bin = await prisma.wasteBin.update({
      where: { id: binId },
      data: {
        status,
        updatedById: parseInt(userId),
      },
    })

    return NextResponse.json(bin)
  } catch (error) {
    console.error("Error updating bin status:", error)
    return NextResponse.json(
      { error: "Failed to update bin status" },
      { status: 500 }
    )
  }
} 