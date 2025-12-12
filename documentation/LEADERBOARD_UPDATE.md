# Leaderboard Update - Real Answer Accuracy Tracking

## Overview
Updated the Top 5 Students leaderboard to rank students based on **actual answer accuracy** instead of chapter completion. This encourages active learning and rewards students who answer questions correctly.

## Changes Made

### 1. New Database Collection: `user_answer_stats`
Tracks real-time answer accuracy for each student.

**Attributes:**
- `userId` (string) - Reference to user
- `totalAnswers` (integer) - Total questions answered
- `correctAnswers` (integer) - Total correct answers
- `accuracy` (integer) - Accuracy percentage (0-100)

**Setup Instructions:** See `scripts/setup-answer-stats-collection.md`

### 2. New API Endpoint: `/api/user/answer-stats`
- **POST** - Records each answer (correct/incorrect) and updates accuracy
- **GET** - Retrieves user's answer statistics

### 3. Updated Leaderboard API: `/api/leaderboard/top-students`
**New Ranking Logic:**
1. **Primary Sort:** Accuracy percentage (higher is better)
2. **Secondary Sort:** Total answers (more active students rank higher)
3. **Tertiary Sort:** XP (tiebreaker)

**Key Features:**
- Only shows students who have answered at least 1 question
- Filters out inactive students
- Real-time updates every 5 seconds

### 4. Updated Quiz Component: `components/student/quiz-question.tsx`
- Tracks every answer submission
- Sends data to `/api/user/answer-stats` API
- Updates accuracy in real-time

### 5. Enhanced Top Students Component
- Added 5-second polling for live updates
- Shows "Live" indicator with pulsing green dot
- Displays accuracy percentage prominently
- Shows total answers and XP for context

## How It Works

1. **Student answers a question** → Quiz component tracks if correct/incorrect
2. **Answer is recorded** → API updates `user_answer_stats` collection
3. **Accuracy is calculated** → `(correctAnswers / totalAnswers) * 100`
4. **Leaderboard updates** → Every 5 seconds, fetches latest rankings
5. **Students compete** → Real-time competitive environment

## Benefits

✅ **Rewards Active Learning** - Students must actively answer questions to rank
✅ **Encourages Accuracy** - High accuracy is rewarded over just completing chapters
✅ **Real-Time Competition** - Live updates create engaging competitive environment
✅ **Fair Ranking** - Students with more attempts rank higher when accuracy is tied
✅ **Motivates Engagement** - Students see their rank change in real-time

## Next Steps

1. **Create the database collection** in Appwrite Console (see setup instructions)
2. **Test the tracking** by answering questions
3. **Monitor the leaderboard** to see real-time updates
4. **Adjust polling rate** if needed (currently 5 seconds)

## Technical Notes

- Answer tracking is non-blocking (won't slow down quiz)
- Accuracy is calculated server-side for security
- Polling uses cleanup to prevent memory leaks
- Works with all question types (multiple choice, multiple correct, etc.)
