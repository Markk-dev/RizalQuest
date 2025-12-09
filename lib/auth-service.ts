import { databases, DATABASE_ID, COLLECTIONS, ID, Query } from "./appwrite"
import bcrypt from "bcryptjs"

export interface User {
  $id: string
  username: string
  fullName?: string
  role: "student" | "admin"
  hearts: number
  xp: number
  completedLevels?: string
  lastHeartUpdate?: string
}

export interface UserProgress {
  $id: string
  userId: string
  currentChapter: number
  currentLevel: number
  completedLevels?: string
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

// Verify password
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// Register new user
export async function registerUser(
  username: string,
  password: string,
  fullName?: string,
  role: "student" | "admin" = "student"
) {
  try {
    // Check if username already exists
    const existingUsers = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.USERS,
      [Query.equal("username", username)]
    )

    if (existingUsers.documents.length > 0) {
      throw new Error("Username already exists")
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.USERS,
      ID.unique(),
      {
        username,
        password: hashedPassword,
        fullName: fullName || "",
        role,
        hearts: 5,
        xp: 0,
        completedLevels: "[]",
        lastHeartUpdate: new Date().toISOString(),
      }
    )

    // Create initial progress for students
    if (role === "student") {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.USER_PROGRESS,
        ID.unique(),
        {
          userId: user.$id,
          currentChapter: 1,
          currentLevel: 1,
          completedLevels: "[]",
        }
      )

      // Initialize active quests
      const activeQuests = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.QUESTS,
        [Query.equal("isActive", true)]
      )

      for (const quest of activeQuests.documents) {
        await databases.createDocument(
          DATABASE_ID,
          COLLECTIONS.USER_QUESTS,
          ID.unique(),
          {
            userId: user.$id,
            questId: quest.$id,
            currentProgress: 0,
            isCompleted: false,
          }
        )
      }
    }

    return {
      $id: user.$id,
      username: user.username,
      fullName: user.fullName,
      role: user.role,
      hearts: user.hearts,
      xp: user.xp,
      lastHeartUpdate: user.lastHeartUpdate,
    }
  } catch (error: any) {
    throw new Error(error.message || "Registration failed")
  }
}

// Login user
export async function loginUser(username: string, password: string) {
  try {
    // Find user by username
    const users = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.USERS,
      [Query.equal("username", username)]
    )

    if (users.documents.length === 0) {
      throw new Error("Invalid username or password")
    }

    const user = users.documents[0]

    // Verify password
    const isValid = await verifyPassword(password, user.password)
    if (!isValid) {
      throw new Error("Invalid username or password")
    }

    // Calculate regenerated hearts based on time
    const regeneratedUser = await calculateRegeneratedHearts(user)

    return {
      $id: regeneratedUser.$id,
      username: regeneratedUser.username,
      fullName: regeneratedUser.fullName,
      role: regeneratedUser.role,
      hearts: regeneratedUser.hearts,
      xp: regeneratedUser.xp,
      lastHeartUpdate: regeneratedUser.lastHeartUpdate,
    }
  } catch (error: any) {
    throw new Error(error.message || "Login failed")
  }
}

// Get user by ID
export async function getUserById(userId: string): Promise<User> {
  const user = await databases.getDocument(
    DATABASE_ID,
    COLLECTIONS.USERS,
    userId
  )
  return user as unknown as User
}

// Get user progress
export async function getUserProgress(userId: string): Promise<UserProgress | null> {
  try {
    const progress = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.USER_PROGRESS,
      [Query.equal("userId", userId)]
    )

    if (progress.documents.length === 0) {
      return null
    }

    return progress.documents[0] as unknown as UserProgress
  } catch (error) {
    return null
  }
}

// Calculate regenerated hearts based on time
async function calculateRegeneratedHearts(user: any) {
  const MAX_HEARTS = 5
  const HEART_REGEN_INTERVAL = 10 * 60 * 1000 // 10 minutes

  // If no lastHeartUpdate, set it to now
  if (!user.lastHeartUpdate) {
    const now = new Date().toISOString()
    await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.USERS,
      user.$id,
      { lastHeartUpdate: now }
    )
    return {
      ...user,
      lastHeartUpdate: now
    }
  }

  if (user.hearts >= MAX_HEARTS) {
    return user
  }

  const lastUpdate = new Date(user.lastHeartUpdate).getTime()
  const now = Date.now()
  const timeSinceLastUpdate = now - lastUpdate
  const heartsToAdd = Math.floor(timeSinceLastUpdate / HEART_REGEN_INTERVAL)

  if (heartsToAdd > 0) {
    const newHearts = Math.min(user.hearts + heartsToAdd, MAX_HEARTS)
    const newLastUpdate = new Date(lastUpdate + (heartsToAdd * HEART_REGEN_INTERVAL)).toISOString()

    // Update in database
    await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.USERS,
      user.$id,
      { 
        hearts: newHearts,
        lastHeartUpdate: newLastUpdate
      }
    )

    return {
      ...user,
      hearts: newHearts,
      lastHeartUpdate: newLastUpdate
    }
  }

  return user
}

// Update user hearts
export async function updateUserHearts(userId: string, hearts: number) {
  return databases.updateDocument(
    DATABASE_ID,
    COLLECTIONS.USERS,
    userId,
    { 
      hearts,
      lastHeartUpdate: new Date().toISOString()
    }
  )
}

// Get user with regenerated hearts
export async function getUserWithRegeneratedHearts(userId: string): Promise<User> {
  const user = await getUserById(userId)
  return calculateRegeneratedHearts(user) as Promise<User>
}

// Update user XP
export async function updateUserXP(userId: string, xp: number) {
  return databases.updateDocument(
    DATABASE_ID,
    COLLECTIONS.USERS,
    userId,
    { xp }
  )
}

// Update user progress
export async function updateUserProgress(
  userId: string,
  currentChapter: number,
  currentLevel: number,
  completedLevels: string[]
) {
  const progress = await getUserProgress(userId)
  
  if (!progress) {
    throw new Error("User progress not found")
  }

  return databases.updateDocument(
    DATABASE_ID,
    COLLECTIONS.USER_PROGRESS,
    progress.$id,
    {
      currentChapter,
      currentLevel,
      completedLevels: JSON.stringify(completedLevels),
    }
  )
}

// Add completed level
export async function addCompletedLevel(userId: string, levelKey: string) {
  const progress = await getUserProgress(userId)
  
  if (!progress) {
    throw new Error("User progress not found")
  }

  const completedLevels = progress.completedLevels 
    ? JSON.parse(progress.completedLevels) 
    : []

  if (!completedLevels.includes(levelKey)) {
    completedLevels.push(levelKey)
  }

  return databases.updateDocument(
    DATABASE_ID,
    COLLECTIONS.USER_PROGRESS,
    progress.$id,
    {
      completedLevels: JSON.stringify(completedLevels),
    }
  )
}
