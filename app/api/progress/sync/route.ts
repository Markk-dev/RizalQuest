import { NextRequest, NextResponse } from "next/server"
import {
  getUserProgress,
  updateUserProgress,
  updateUserHearts,
  updateUserXP,
  addCompletedLevel,
  getUserById,
} from "@/lib/auth-service"

export async function POST(request: NextRequest) {
  try {
    const { userId, action, data } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      )
    }

    switch (action) {
      case "updateHearts":
        await updateUserHearts(userId, data.hearts)
        return NextResponse.json({ success: true })

      case "updateXP":
        await updateUserXP(userId, data.xp)
        return NextResponse.json({ success: true })

      case "updateProgress":
        await updateUserProgress(
          userId,
          data.currentChapter,
          data.currentLevel,
          data.completedLevels
        )
        return NextResponse.json({ success: true })

      case "addCompletedLevel":
        await addCompletedLevel(userId, data.levelKey)
        return NextResponse.json({ success: true })

      case "getProgress":
        const progress = await getUserProgress(userId)
        return NextResponse.json({ progress })

      case "getUser":
        const user = await getUserById(userId)
        return NextResponse.json({ user })

      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        )
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to sync progress" },
      { status: 500 }
    )
  }
}

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

    const progress = await getUserProgress(userId)
    return NextResponse.json({ progress })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to get progress" },
      { status: 500 }
    )
  }
}
