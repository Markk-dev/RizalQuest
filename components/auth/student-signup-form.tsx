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
import { registerUser } from '@/lib/auth-service'

export function StudentSignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    try {
      // Clear all previous user data before creating new account
      localStorage.clear()
      
      // Register with Appwrite
      const user = await registerUser(username, password, name, "student")
      
      // Store user data in localStorage
      localStorage.setItem("userRole", "student")
      localStorage.setItem("user", JSON.stringify(user))
      
      router.push("/student/learn")
    } catch (err: any) {
      setError(err.message || "Signup failed")
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
            <h1 className="text-2xl font-bold">Create your account</h1>
            <FieldDescription>
              Join Rizal Quest and start learning
            </FieldDescription>
          </div>
          
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input
              id="name"
              type="text"
              placeholder="Juan Dela Cruz"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Field>
          
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              id="username"
              type="text"
              placeholder="juandc"
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
              minLength={6}
            />
          </Field>
          
          {error && (
            <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded-md">
              {error}
            </div>
          )}
          
          <Field>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Sign up"}
            </Button>
          </Field>
          
          <FieldDescription className="text-center">
            Already have an account? <a href="/auth" className="text-primary font-semibold">Login</a>
          </FieldDescription>
        </FieldGroup>
      </form>
      
      <FieldDescription className="px-6 text-center text-xs">
        By signing up, you agree to our Terms of Service and Privacy Policy.
      </FieldDescription>
    </div>
  )
}
