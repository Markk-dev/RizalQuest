import { NextResponse } from "next/server"
import { syncQuestionBankToDatabase } from "@/lib/question-service"
import { getQuestionBank } from "@/lib/get-question-bank"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    const QUESTION_BANK = getQuestionBank()
    console.log("API: QUESTION_BANK keys:", Object.keys(QUESTION_BANK))
    console.log("API: QUESTION_BANK chapters:", Object.keys(QUESTION_BANK).length)
    
    const result = await syncQuestionBankToDatabase(QUESTION_BANK)
    
    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: "Question bank synced successfully",
        count: result.count || 0
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
