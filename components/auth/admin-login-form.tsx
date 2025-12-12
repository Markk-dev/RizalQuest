"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export function AdminLoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    try {
      // Import loginUser from auth-service
      const { loginUser } = await import('@/lib/auth-service')
      
      // Clear all previous user data before logging in
      localStorage.clear()
      
      // Authenticate with Appwrite
      const user = await loginUser(username, password)
      
      // Verify user is actually an admin
      if (user.role !== "admin") {
        setError("Access denied. Admin credentials required.")
        setIsLoading(false)
        return
      }
      
      // Store user data in localStorage
      localStorage.setItem("userRole", user.role)
      localStorage.setItem("user", JSON.stringify(user))
      
      // Redirect to admin dashboard
      router.push("/admin")
    } catch (err: any) {
      setError(err.message || "Login failed")
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-12 items-center justify-center rounded-md text-4xl">
                🏵️
              </div>
            </a>
            <h1 className="text-2xl font-bold">Admin Portal</h1>
            <FieldDescription>
              Teacher & Administrator Access
            </FieldDescription>
          </div>
          
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Field>
          
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Field>
          
          {error && (
            <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded-md">
              {error}
            </div>
          )}
          
          <Field>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </Field>
          
          <FieldDescription className="text-center">
            <a href="/auth" className="text-primary font-semibold">← Back to Student Login</a>
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  )
}
