"use client"

import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">💔</div>
            <h1 className="text-3xl font-bold text-black mb-2">Oops! Something broke</h1>
            <p className="text-gray mb-8">{error.message || "An unexpected error occurred"}</p>
            <button
              onClick={() => reset()}
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
