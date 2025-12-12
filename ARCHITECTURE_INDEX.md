# Rizal Quest - System Architecture Index

## Architecture Overview

### **Frontend Architecture**
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript for type safety
- **UI Framework**: React 19 with modern hooks
- **Styling**: Tailwind CSS v4 with utility-first approach
- **Component Library**: Radix UI primitives + custom components

### **Backend Architecture**
- **API Layer**: Next.js API Routes (RESTful endpoints)
- **Database**: Appwrite (BaaS) with document-based storage
- **Authentication**: Custom auth service with bcryptjs hashing
- **Server Actions**: Next.js server actions for data mutations

### **Data Layer**
- **Database**: Appwrite Cloud Database
- **Collections**: 6 main collections (users, progress, quests, etc.)
- **Real-time**: Appwrite real-time subscriptions
- **File Storage**: Appwrite storage buckets

---

## System Components

### **1. Frontend Layer**

#### **App Structure (Next.js App Router)**
```
app/
├── layout.tsx          # Root layout with providers
├── page.tsx           # Landing/redirect page
├── auth/              # Authentication pages
├── student/           # Student portal pages
├── admin/             # Admin dashboard pages
└── api/               # Backend API routes
```

#### **Component Architecture**
```
components/
├── ui/                # Base UI components (Radix + custom)
├── shared/            # Reusable business components
├── auth/              # Authentication components
├── student/           # Student-specific components
├── admin/             # Admin-specific components
└── question-types/    # Quiz question components
```

#### **State Management**
- **Local State**: React hooks (useState, useEffect)
- **Server State**: API calls with fetch
- **Form State**: React Hook Form + Zod validation
- **Global State**: Context API for user session

### **2. Backend Layer**

#### **API Routes Structure**
```
app/api/
├── auth/              # Authentication endpoints
├── user/              # User management
├── progress/          # Progress tracking
├── questions/         # Quiz content
├── stats/             # Analytics data
├── students/          # Student management
├── admin/             # Admin operations
├── analytics/         # Detailed analytics
└── leaderboard/       # Performance rankings
```

#### **Service Layer**
```
lib/
├── appwrite.ts        # Database client configuration
├── auth-service.ts    # Authentication business logic
├── question-service.ts # Quiz content management
├── progress-sync.ts   # Progress synchronization
├── heart-regeneration.ts # Game mechanics
└── utils.ts           # Utility functions
```

### **3. Data Architecture**

#### **Database Schema (Appwrite)**
- **users** - Authentication and game stats
- **user_progress** - Chapter/level tracking
- **quests** - Mission system
- **user_quests** - Individual quest progress
- **shop_items** - Purchasable items
- **questions** - Quiz content

#### **Data Flow Patterns**
1. **Authentication Flow**: Login → Validate → Create Session → Route by Role
2. **Learning Flow**: Select Chapter → Load Questions → Submit Answers → Update Progress
3. **Gamification Flow**: Complete Actions → Award XP → Update Quests → Check Rewards

---

## Technical Stack

### **Core Technologies**
| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | Next.js 16 | React framework with SSR/SSG |
| Language | TypeScript | Type safety and developer experience |
| Styling | Tailwind CSS v4 | Utility-first CSS framework |
| UI Components | Radix UI | Accessible component primitives |
| Backend | Appwrite | Backend-as-a-Service |
| Authentication | bcryptjs | Password hashing |
| Validation | Zod | Schema validation |
| Charts | Recharts | Data visualization |

### **Development Tools**
- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript compiler
- **Build Tool**: Next.js built-in bundler
- **Development Server**: Next.js dev server

---

## Architecture Patterns

### **1. Layered Architecture**
```
┌─────────────────────────────────────┐
│           Presentation Layer         │
│        (React Components)           │
├─────────────────────────────────────┤
│           Business Logic Layer       │
│         (Services & Hooks)          │
├─────────────────────────────────────┤
│            API Layer                │
│        (Next.js API Routes)         │
├─────────────────────────────────────┤
│           Data Access Layer         │
│         (Appwrite Client)           │
├─────────────────────────────────────┤
│            Database Layer           │
│          (Appwrite Cloud)           │
└─────────────────────────────────────┘
```

### **2. Component Composition Pattern**
- **Atomic Design**: Base UI components → Composite components → Page layouts
- **Separation of Concerns**: UI components separate from business logic
- **Reusability**: Shared components across student and admin interfaces

### **3. Service Layer Pattern**
- **auth-service.ts**: User authentication and session management
- **question-service.ts**: Quiz content and validation
- **progress-sync.ts**: Learning progress tracking
- **heart-regeneration.ts**: Game mechanics and timers

---

## Security Architecture

### **Authentication & Authorization**
- **Password Security**: bcryptjs with 10 salt rounds
- **Role-Based Access**: Student vs Admin permissions
- **Session Management**: Server-side session validation
- **API Protection**: Route-level authentication checks

### **Data Security**
- **Input Validation**: Zod schemas for all user inputs
- **SQL Injection Prevention**: Appwrite query builder
- **XSS Protection**: React's built-in escaping
- **Environment Variables**: Secure configuration management

---

## Performance Architecture

### **Frontend Optimization**
- **Code Splitting**: Next.js automatic code splitting
- **Image Optimization**: Next.js Image component
- **Bundle Optimization**: Tree shaking and minification
- **Caching**: Browser caching for static assets

### **Backend Optimization**
- **Database Indexing**: Optimized queries with indexes
- **Real-time Updates**: Appwrite subscriptions for live data
- **API Caching**: Response caching where appropriate
- **Lazy Loading**: Component and data lazy loading

---

## Deployment Architecture

### **Build Process**
1. **Type Checking**: TypeScript compilation
2. **Linting**: ESLint validation
3. **Building**: Next.js production build
4. **Optimization**: Asset optimization and compression

### **Environment Configuration**
- **Development**: Local development with hot reload
- **Production**: Optimized build with static generation
- **Environment Variables**: Secure configuration management

---

## Scalability Considerations

### **Horizontal Scaling**
- **Stateless API**: No server-side state storage
- **Database Scaling**: Appwrite cloud auto-scaling
- **CDN Ready**: Static asset distribution
- **Microservices Ready**: Modular service architecture

### **Performance Monitoring**
- **Error Boundaries**: React error handling
- **Logging**: Console and error logging
- **Analytics**: User interaction tracking
- **Performance Metrics**: Core Web Vitals monitoring

---

## Integration Points

### **External Services**
- **Appwrite Cloud**: Primary backend service
- **Vercel Analytics**: Performance monitoring
- **Font Optimization**: Google Fonts integration

### **Internal Integrations**
- **Component Library**: Radix UI integration
- **Form Handling**: React Hook Form + Zod
- **State Management**: React Context + hooks
- **Routing**: Next.js App Router

This architecture provides a scalable, maintainable, and secure foundation for the educational gaming platform while maintaining developer productivity and user experience.