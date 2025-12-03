import { NextRequest, NextResponse } from "next/server"
import { registerUser } from "@/lib/auth-service"

export async function POST(request: NextRequest) {
  try {
    const { username, password, fullName, role } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      )
    }

    const user = await registerUser(username, password, fullName, role)

    return NextResponse.json({ user }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Registration failed" },
      { status: 400 }
    )
  }
}
