# Rizal Quest - Educational Game Platform

An interactive educational game platform for children to learn about José Rizal and Philippine history.

## Features

- **Student Portal**: Interactive learning through 8 chapters covering Rizal's life
- **Admin Dashboard**: Monitor student progress and analytics
- **Gamification**: Points, hearts, quests, and shop system
- **Multiple Question Types**: Multiple choice, fill-in-blanks, matching, and more
- **Progress Tracking**: Track student performance across chapters

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Backend**: Appwrite (via MCP)
- **UI Components**: Radix UI
- **Charts**: Recharts

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env.local`:
```
NEXT_PUBLIC_APPWRITE_ENDPOINT=your_endpoint
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_API=your_api_key
NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET=your_bucket_id
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   ├── student/           # Student portal pages
│   └── api/               # API routes
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── student/          # Student-specific components
│   ├── shared/           # Shared components
│   └── ui/               # UI components
├── lib/                   # Utility functions
└── public/               # Static assets

```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## License

Educational use only.
