# Rizal Quest - Database Schema Index

## Database: `rizal-quest-db`

### Core Tables Overview

| Table | Purpose | Key Relationships |
|-------|---------|------------------|
| `users` | User accounts & stats | Primary table for authentication |
| `user_progress` | Chapter/level tracking | Links to `users` |
| `quests` | Available missions | Managed by admin |
| `user_quests` | Individual quest progress | Links `users` ↔ `quests` |
| `shop_items` | Purchasable items | Managed by admin |
| `questions` | Quiz content | Chapter-based content |

---

## Table Schemas

### 1. Users Table (`users`)
**Purpose**: Core user authentication and game stats

| Column | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `$id` | string | Yes | auto | Appwrite document ID |
| `username` | string(50) | Yes | - | Unique username |
| `fullName` | string(100) | No | - | Display name |
| `password` | string(255) | Yes | - | bcrypt hashed password |
| `role` | enum | Yes | - | "student" or "admin" |
| `hearts` | integer | No | 5 | Current hearts (0-10) |
| `xp` | integer | No | 0 | Total experience points |
| `completedLevels` | string(5000) | No | "[]" | JSON array of completed levels |
| `lastHeartUpdate` | datetime | No | null | Heart regeneration timestamp |

**Indexes**: 
- `username_unique` (unique)

---

### 2. User Progress Table (`user_progress`)
**Purpose**: Track student progression through chapters

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| `$id` | string | Yes | Appwrite document ID |
| `userId` | string(50) | Yes | Reference to users.$id |
| `currentChapter` | integer | Yes | Current chapter (1-8) |
| `currentLevel` | integer | Yes | Current level (1-5) |
| `completedLevels` | string(5000) | No | JSON array of completed level IDs |

**Relationships**: 
- `userId` → `users.$id` (one-to-one)

---

### 3. Quests Table (`quests`)
**Purpose**: Define available missions for students

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| `$id` | string | Yes | Appwrite document ID |
| `title` | string(200) | Yes | Quest display name |
| `targetXP` | integer | Yes | XP required to complete |
| `rewardXP` | integer | Yes | XP reward for completion |
| `isActive` | boolean | No | Whether quest is available |

**Admin Managed**: Created/updated via admin dashboard

---

### 4. User Quests Table (`user_quests`)
**Purpose**: Track individual student quest progress

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| `$id` | string | Yes | Appwrite document ID |
| `userId` | string(50) | Yes | Reference to users.$id |
| `questId` | string(50) | Yes | Reference to quests.$id |
| `currentProgress` | integer | No | Current progress value |
| `isCompleted` | boolean | No | Completion status |

**Relationships**: 
- `userId` → `users.$id` (many-to-one)
- `questId` → `quests.$id` (many-to-one)

---

### 5. Shop Items Table (`shop_items`)
**Purpose**: Define purchasable items in the shop

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| `$id` | string | Yes | Appwrite document ID |
| `name` | string(100) | Yes | Item display name |
| `description` | string(500) | No | Item description |
| `price` | integer | Yes | Cost in XP |
| `type` | enum | Yes | "hearts", "powerup", "cosmetic" |

**Admin Managed**: Configured via admin dashboard

---

### 6. Questions Table (`questions`)
**Purpose**: Store quiz questions for each chapter

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| `$id` | string | Yes | Appwrite document ID |
| `chapterId` | integer | Yes | Chapter number (1-8) |
| `levelId` | integer | Yes | Level number (1-5) |
| `question` | string | Yes | Question text |
| `type` | string | Yes | Question type (multiple-choice, etc.) |
| `options` | string | No | JSON array of answer options |
| `correctAnswer` | string | Yes | Correct answer |
| `points` | integer | No | XP points for correct answer |

**Content Structure**: Organized by chapter and level

---

## Data Relationships

```
users (1) ←→ (1) user_progress
users (1) ←→ (n) user_quests ←→ (1) quests
users (n) ←→ (n) shop_items (via purchases)
questions (grouped by) chapters/levels
```

## Key Data Flows

### Student Registration
1. Create `users` record with role="student"
2. Create `user_progress` record (chapter: 1, level: 1)
3. Create `user_quests` records for all active quests

### Level Completion
1. Update `users.xp` and `users.hearts`
2. Update `user_progress.completedLevels`
3. Update `user_progress.currentChapter/currentLevel`
4. Update `user_quests.currentProgress` for XP-based quests

### Shop Purchase
1. Validate `users.xp` >= `shop_items.price`
2. Deduct XP from `users.xp`
3. Apply item effect (hearts refill, etc.)

### Quest Completion
1. Check `user_quests.currentProgress` >= `quests.targetXP`
2. Set `user_quests.isCompleted` = true
3. Add `quests.rewardXP` to `users.xp`

## Security & Performance

### Indexes
- `users.username` (unique) - Fast login lookup
- Consider adding indexes on frequently queried fields:
  - `user_progress.userId`
  - `user_quests.userId`
  - `questions.chapterId`

### Data Validation
- Password hashing with bcryptjs (10 rounds)
- Role-based access control (student/admin)
- XP/Hearts bounds checking
- JSON validation for arrays

### Appwrite Features
- Built-in document permissions
- Real-time subscriptions
- Automatic timestamps ($createdAt, $updatedAt)
- File storage integration ready