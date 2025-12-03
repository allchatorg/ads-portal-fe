import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Role enum matching backend
export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

// Define the User type based on your backend structure
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
}

// Auth request types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

// Auth response type matching backend AuthResponseDto
export interface AuthResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    accessToken: string;    // Session ID in session-based auth
    tokenType: string;      // "SESSION" or "Bearer"
    expiresIn: number;      // seconds until expiration
    message: string;
}

// Logout response
export interface LogoutResponse {
    message: string;
}

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        // Session cookies are automatically included with credentials: 'include'
        credentials: 'include',
    }),
    tagTypes: ['User', 'Auth'],
    endpoints: (builder) => ({
        // Login
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Auth', 'User'],
        }),

        // Register
        register: builder.mutation<AuthResponse, RegisterRequest>({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['Auth', 'User'],
        }),

        // Logout
        logout: builder.mutation<LogoutResponse, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['Auth', 'User'],
        }),

        // Get current user
        getCurrentUser: builder.query<User, void>({
            query: () => '/user/me',
            providesTags: ['User'],
        }),

        // Get user by ID
        getUserById: builder.query<User, string>({
            query: (id) => `/users/${id}`,
            providesTags: (result, error, id) => [{ type: 'User', id }],
        }),

        // Get all users (admin only)
        getUsers: builder.query<User[], void>({
            query: () => '/users',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'User' as const, id: id.toString() })),
                        { type: 'User', id: 'LIST' },
                    ]
                    : [{ type: 'User', id: 'LIST' }],
        }),

        // Update user
        updateUser: builder.mutation<User, Partial<User> & { id: number }>({
            query: ({ id, ...patch }) => ({
                url: `/users/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'User', id: id.toString() }],
        }),

        // Delete user
        deleteUser: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'User', id: id.toString() }],
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useGetCurrentUserQuery,
    useGetUserByIdQuery,
    useGetUsersQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApi;
