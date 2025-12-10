import { databases, DATABASE_ID, COLLECTIONS, ID, Query } from "./appwrite"
import { getServerDatabases } from "./appwrite-server"

export interface QuestionDocument {
  $id?: string
  chapterId: number
  levelId: number
  questionOrder: number
  type: string
  question: string
  questionData: string // JSON string containing type-specific data
}

// Get all questions for a specific chapter and level
export async function getQuestionsForChapterLevel(chapterId: number, levelId: number) {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.QUESTIONS,
      [
        Query.equal("chapterId", chapterId),
        Query.equal("levelId", levelId),
        Query.orderAsc("questionOrder")
      ]
    )
    
    return response.documents.map(doc => ({
      ...JSON.parse(doc.questionData),
      $id: doc.$id,
      chapterId: doc.chapterId,
      levelId: doc.levelId,
      questionOrder: doc.questionOrder,
    }))
  } catch (error) {
    console.error("Error fetching questions:", error)
    return []
  }
}

// Update a question
export async function updateQuestion(questionId: string, questionData: any, useServerClient = false) {
  try {
    const { $id, chapterId, levelId, questionOrder, ...restData } = questionData
    
    if (useServerClient) {
      await getServerDatabases().updateDocument(
        DATABASE_ID,
        COLLECTIONS.QUESTIONS,
        questionId,
        {
          question: questionData.question,
          questionData: JSON.stringify(restData)
        }
      )
    } else {
      await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.QUESTIONS,
        questionId,
        {
          question: questionData.question,
          questionData: JSON.stringify(restData)
        }
      )
    }
    
    return { success: true }
  } catch (error: any) {
    console.error("Error updating question:", error)
    return { success: false, error: error.message }
  }
}

// Create a new question (server-side with API key)
export async function createQuestion(questionData: QuestionDocument, useServerClient = false) {
  try {
    const { $id, ...data } = questionData
    
    if (useServerClient) {
      await getServerDatabases().createDocument(
        DATABASE_ID,
        COLLECTIONS.QUESTIONS,
        ID.unique(),
        {
          chapterId: data.chapterId,
          levelId: data.levelId,
          questionOrder: data.questionOrder,
          type: data.type,
          question: data.question,
          questionData: data.questionData
        }
      )
    } else {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.QUESTIONS,
        ID.unique(),
        {
          chapterId: data.chapterId,
          levelId: data.levelId,
          questionOrder: data.questionOrder,
          type: data.type,
          question: data.question,
          questionData: data.questionData
        }
      )
    }
    
    return { success: true }
  } catch (error: any) {
    console.error("Error creating question:", error)
    return { success: false, error: error.message }
  }
}

// Sync local question bank to database
export async function syncQuestionBankToDatabase(questionBank: any) {
  try {
    console.log("Starting sync with question bank:", Object.keys(questionBank))
    let totalSynced = 0
    
    for (const [chapterIdStr, chapterData] of Object.entries(questionBank)) {
      const chapterId = parseInt(chapterIdStr)
      console.log(`Processing chapter ${chapterId}`)
      
      for (const [levelIdStr, questions] of Object.entries(chapterData as any)) {
        const levelId = parseInt(levelIdStr)
        console.log(`Processing chapter ${chapterId}, level ${levelId}`)
        
        // Check if questions already exist (use server client for consistency)
        const existing = await getServerDatabases().listDocuments(
          DATABASE_ID,
          COLLECTIONS.QUESTIONS,
          [
            Query.equal("chapterId", chapterId),
            Query.equal("levelId", levelId)
          ]
        )
        
        console.log(`Found ${existing.documents.length} existing questions for ${chapterId}-${levelId}`)
        
        // If no questions exist, create them
        if (existing.documents.length === 0 && Array.isArray(questions)) {
          console.log(`Creating ${questions.length} questions for ${chapterId}-${levelId}`)
          for (let i = 0; i < questions.length; i++) {
            const question = questions[i]
            const result = await createQuestion({
              chapterId,
              levelId,
              questionOrder: i + 1,
              type: question.type,
              question: question.question,
              questionData: JSON.stringify(question)
            }, true) // Use server client with API key
            if (result.success) {
              totalSynced++
              console.log(`Created question ${i + 1} for ${chapterId}-${levelId}`)
            } else {
              console.error(`Failed to create question ${i + 1}:`, result.error)
            }
          }
        }
      }
    }
    
    console.log(`Sync complete! Total questions synced: ${totalSynced}`)
    return { success: true, count: totalSynced }
  } catch (error: any) {
    console.error("Error syncing question bank:", error)
    return { success: false, error: error.message }
  }
}
