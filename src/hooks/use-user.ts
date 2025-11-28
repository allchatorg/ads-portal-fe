import {UserRole} from "@/models/user-role"

export interface User {
    id: string
    name: string
    email: string
    role: UserRole
}

/**
 * Placeholder hook for user authentication and authorization.
 * TODO: Implement actual user fetching logic
 */
export function useUser() {
    // Placeholder mock data - replace with actual implementation
    // To test admin features, change UserRole.USER to UserRole.ADMIN
    const user: User = {
        id: "mock-user-id",
        name: "Mock User",
        email: "user@example.com",
        role: UserRole.USER, // Change to UserRole.ADMIN to test admin features
    }

    const isLoading = false
    const isAuthenticated = true

    return {
        user,
        isLoading,
        isAuthenticated,
    }
}
