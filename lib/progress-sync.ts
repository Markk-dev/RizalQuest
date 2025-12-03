// Sync progress to database
export async function syncProgress(action: string, data: any) {
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const userId = user.$id
  
  if (!userId) {
    console.error("No user ID found")
    return
  }

  try {
    const response = await fetch("/api/progress/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, action, data }),
    })

    if (!response.ok) {
      throw new Error("Failed to sync progress")
    }

    return await response.json()
  } catch (error) {
    console.error("Error syncing progress:", error)
    throw error
  }
}

// Load progress from database
export async function loadProgress() {
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const userId = user.$id
  
  if (!userId) {
    return null
  }

  try {
    const response = await fetch(`/api/progress/sync?userId=${userId}`)
    
    if (!response.ok) {
      throw new Error("Failed to load progress")
    }

    const data = await response.json()
    return data.progress
  } catch (error) {
    console.error("Error loading progress:", error)
    return null
  }
}

// Sync hearts to database
export async function syncHearts(hearts: number) {
  return syncProgress("updateHearts", { hearts })
}

// Sync XP to database
export async function syncXP(xp: number) {
  return syncProgress("updateXP", { xp })
}

// Sync completed level
export async function syncCompletedLevel(levelKey: string) {
  return syncProgress("addCompletedLevel", { levelKey })
}

// Sync current progress
export async function syncCurrentProgress(
  currentChapter: number,
  currentLevel: number,
  completedLevels: string[]
) {
  return syncProgress("updateProgress", {
    currentChapter,
    currentLevel,
    completedLevels,
  })
}
