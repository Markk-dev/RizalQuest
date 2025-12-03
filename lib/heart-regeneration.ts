const HEART_REGEN_INTERVAL = 10 * 60 * 1000 // 10 minutes in milliseconds
const MAX_HEARTS = 5

export function startHeartRegeneration() {
  // Check and regenerate hearts every minute
  const interval = setInterval(() => {
    regenerateHearts()
  }, 60 * 1000) // Check every minute

  // Initial check
  regenerateHearts()

  return interval
}

export async function regenerateHearts() {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    
    if (!user.$id) {
      return
    }

    // Fetch updated hearts from server (which calculates regeneration)
    const response = await fetch(`/api/user/hearts?userId=${user.$id}`)
    
    if (!response.ok) {
      throw new Error("Failed to fetch hearts")
    }

    const data = await response.json()
    
    // Always update lastHeartUpdate to keep it in sync
    const heartsChanged = data.hearts !== user.hearts
    user.hearts = data.hearts
    user.lastHeartUpdate = data.lastHeartUpdate
    localStorage.setItem("user", JSON.stringify(user))
    
    // Dispatch event to update UI if hearts changed
    if (heartsChanged) {
      window.dispatchEvent(new CustomEvent("heartsUpdated", { detail: { hearts: data.hearts } }))
    }
  } catch (error) {
    console.error("Error regenerating hearts:", error)
  }
}

export function getTimeUntilNextHeart(): number {
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  
  // Don't show timer if at max hearts
  if (user.hearts >= MAX_HEARTS) {
    return 0
  }

  // If no lastHeartUpdate, return full interval
  if (!user.lastHeartUpdate) {
    return HEART_REGEN_INTERVAL
  }

  const lastUpdate = new Date(user.lastHeartUpdate).getTime()
  const now = Date.now()
  const timeSinceLastUpdate = now - lastUpdate
  const timeUntilNext = HEART_REGEN_INTERVAL - (timeSinceLastUpdate % HEART_REGEN_INTERVAL)
  
  return Math.max(0, timeUntilNext)
}

export function formatTimeUntilNextHeart(): string {
  const ms = getTimeUntilNextHeart()
  
  if (ms <= 0) {
    return ""
  }
  
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}
