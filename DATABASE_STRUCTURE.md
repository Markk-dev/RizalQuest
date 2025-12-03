# Rizal Quest Database Structure

## Database: `rizal-quest-db`

### 1. **Users Table** (`users`)
Stores user account information and basic stats.

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| username | string(50) | Yes | Unique username (indexed) |
| fullName | string(100) | No | Student's full name for admin identification |
| password | string(255) | Yes | Hashed password |
| role | enum | Yes | "student" or "admin" |
| hearts | integer | No | Current hearts (0-10, default: 5) |
| xp | integer | No | Total experience points (default: 0) |
| completedLevels | string(5000) | No | JSON string of completed levels |
| lastHeartUpdate | datetime | No | Timestamp of last heart update for regeneration |

**Indexes:**
- `username_unique` - Unique index on username

---

### 2. **User Progress Table** (`user_progress`)
Tracks detailed progress through chapters and levels.

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| userId | string(50) | Yes | Reference to user ID |
| currentChapter | integer | Yes | Current chapter (1-8) |
| currentLevel | integer | Yes | Current level (1-5) |
| completedLevels | string(5000) | No | JSON array of completed level IDs |

**Purpose:** Track which chapter/level the student is currently on and their completion history.

---

### 3. **Quests Table** (`quests`)
Defines available quests in the game.

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| title | string(200) | Yes | Quest title (e.g., "Earn 20 XP") |
| targetXP | integer | Yes | XP target to complete quest |
| rewardXP | integer | Yes | XP reward for completing quest |
| isActive | boolean | No | Whether quest is currently active |

**Purpose:** Admin can create/manage quests that students can complete.

---

### 4. **User Quests Table** (`user_quests`)
Tracks individual user progress on quests.

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| userId | string(50) | Yes | Reference to user ID |
| questId | string(50) | Yes | Reference to quest ID |
| currentProgress | integer | No | Current progress (e.g., current XP) |
| isCompleted | boolean | No | Whether user completed this quest |

**Purpose:** Track which quests each student has completed and their progress.

---

### 5. **Shop Items Table** (`shop_items`)
Defines items available in the shop.

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| name | string(100) | Yes | Item name |
| description | string(500) | No | Item description |
| price | integer | Yes | Cost in XP |
| type | enum | Yes | "hearts", "powerup", or "cosmetic" |

**Purpose:** Admin can manage shop items that students can purchase with XP.

---

## Data Flow

### Student Registration:
1. Create record in `users` table
2. Create initial record in `user_progress` (chapter: 1, level: 1)
3. Create records in `user_quests` for all active quests

### Playing a Level:
1. Update `hearts` in `users` if wrong answers
2. Update `xp` in `users` when level completed
3. Update `completedLevels` in `user_progress`
4. Update `currentChapter` and `currentLevel` in `user_progress`
5. Update `currentProgress` in `user_quests` for XP-based quests

### Completing a Quest:
1. Check `user_quests.currentProgress` >= `quests.targetXP`
2. Set `user_quests.isCompleted` = true
3. Add `quests.rewardXP` to `users.xp`

### Purchasing from Shop:
1. Check if `users.xp` >= `shop_items.price`
2. Deduct price from `users.xp`
3. If type is "hearts", add to `users.hearts`

---

## Next Steps

1. **Create API endpoints** to interact with these tables
2. **Update auth pages** to create user records
3. **Update game logic** to save/load from database
4. **Create admin dashboard** to manage quests and shop items
5. **Add stats page** to display user progress from database
