# Rizal Quest - Project Index

## Overview
An interactive educational game platform for children to learn about José Rizal and Philippine history through gamified learning experiences.


### 🎮 Student Portal
- **Interactive Learning**: 8 chapters covering Rizal's life with 5 levels each
- **Gamification System**: 
  - Hearts system (0-10, regenerates over time)
  - XP points for progression
  - Quest completion rewards
- **Multiple Question Types**: Multiple choice, fill-in-blanks, matching, drag-and-drop
- **Progress Tracking**: Chapter/level completion tracking
- **Shop System**: Purchase items with earned XP
- **Performance Analytics**: Personal stats and progress charts

### 👨‍💼 Admin Dashboard
- **Student Management**: View all registered students
- **Progress Monitoring**: Track student performance across chapters
- **Analytics**: Comprehensive statistics entire class
- **Quest Management**: Create and manage student quests

### 🔐 Authentication System
- Role-based access (Student/Admin)
- Secure password hashing with bcryptjs
- Session management



### Frontend Stack
- **Framework**: Next.js 16 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **Charts**: Recharts for analytics
- **Animations**: Tailwind animations + React Confetti

### Backend Stack
- **Database**: Appwrite (via MCP)
- **API**: Next.js API routes
- **Authentication**: Custom auth with Appwrite
- **File Storage**: Appwrite storage bucket

### Key Dependencies
- **Form Handling**: React Hook Form + Zod validation
- **State Management**: React hooks + Context
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Notifications**: Sonner toasts

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard pages
│   ├── student/           # Student portal pages
│   ├── auth/              # Authentication pages
│   └── api/               # Backend API routes
├── components/            # React components
│   ├── admin/            # Admin-specific UI
│   ├── student/          # Student portal UI
│   ├── auth/             # Authentication UI
│   ├── question-types/   # Quiz question components
│   ├── shared/           # Reusable components
│   └── ui/               # Base UI components
├── lib/                   # Utility functions
├── actions/              # Server actions
└── public/               # Static assets
```

## Database Schema

### Core Tables
1. **users** - User accounts and basic stats
2. **user_progress** - Chapter/level progression
3. **quests** - Available quests
4. **user_quests** - Individual quest progress
5. **shop_items** - Purchasable items

## Game Mechanics

### Hearts System
- Students start with 5 hearts
- Lose hearts for wrong answers
- Hearts regenerate over time
- Can purchase heart refills with XP

### XP & Progression
- Earn XP by completing levels
- Use XP to purchase shop items
- Complete quests for bonus XP
- Track total XP across all activities

### Quest System
- Daily missions with various objectives
- XP-based, level-based, and performance-based quests
- Automatic progress tracking
- Reward system integration

## Key Features by User Role

### Students Can:
- Play through 8 educational chapters
- Answer various question types
- Track their progress and stats
- Complete daily quests
- Purchase items from shop
- View performance analytics

### Admins Can:
- Monitor all student progress
- View comprehensive analytics
- Manage quests and shop items
- Access detailed reporting
- Oversee platform usage

## Development Features
- **Hot Reload**: Next.js development server
- **Type Safety**: Full TypeScript coverage
- **Linting**: ESLint configuration
- **Error Handling**: Global error boundaries
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA compliance

## Configuration Files
- `next.config.js` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS setup
- `tsconfig.json` - TypeScript configuration
- `components.json` - UI component configuration
- `.env.local` - Environment variables

## Getting Started
1. Install dependencies: `npm install`
2. Configure environment variables
3. Run development server: `npm run dev`
4. Access at `http://localhost:3000`

## Educational Content
- 8 chapters covering José Rizal's life
- Historical facts and timeline
- Interactive storytelling
- Cultural context and significance
- Age-appropriate content for students