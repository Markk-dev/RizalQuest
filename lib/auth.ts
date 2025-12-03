// Simple authentication utilities
export const USER_ROLE = {
  STUDENT: "student",
  ADMIN: "admin",
} as const

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE]

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: Date
}
