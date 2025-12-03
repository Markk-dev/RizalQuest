import { NextRequest, NextResponse } from "next/server"
import { getUserWithRegeneratedHearts } from "@/lib/auth-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      )
    }

    const user = await getUserWithRegeneratedHearts(userId)
    
    return NextResponse.json({ 
      hearts: user.hearts,
      lastHeartUpdate: user.lastHeartUpdate
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to get user hearts" },
      { status: 500 }
    )
  }
}
