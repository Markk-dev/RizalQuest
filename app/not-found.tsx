"use client"

import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-white to-primary-light flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-8xl mb-6">404</div>
        <h1 className="text-4xl font-bold text-black mb-4">Page Not Found</h1>
        <p className="text-gray text-lg mb-8">The page you're looking for doesn't exist or has been moved.</p>

        <div className="space-y-3">
          <Link href="/student/learn">
            <button className="block w-full bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold mb-2">
              Back to Learning
            </button>
          </Link>
          <Link href="/">
            <button className="block w-full bg-gray-light text-black px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold">
              Back Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
