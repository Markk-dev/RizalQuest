import { NextResponse } from "next/server"
import { updateQuestion } from "@/lib/question-service"

export async function POST(request: Request) {
  try {
    const { questionId, questionData } = await request.json()
    
    if (!questionId || !questionData) {
      return NextResponse.json({ 
        success: false, 
        error: "Missing questionId or questionData" 
      }, { status: 400 })
    }
    
    const result = await updateQuestion(questionId, questionData, true) // Use server client
    
    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: "Question updated successfully" 
      })
    } else {
      return NextResponse.json({ 
        success: false, 
        error: result.error 
      }, { status: 500 })
    }
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}
