import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

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
    emailVerified: boolean;
    phoneNumber?: string;
    marketingEmails: boolean;
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

// Forgot password request
export interface ForgotPasswordRequest {
    email: string;
}

// Reset password request
export interface ResetPasswordRequest {
    newPassword: string;
    token: string;
}

// Generic message response
export interface MessageResponse {
    message: string;
}

// Verify email request
export interface VerifyEmailRequest {
    token: string;
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
        prepareHeaders: (headers, {getState}) => {
            // Get the token from the store
            const token = (getState() as any).auth.token;

            // If we have a token, set the Authorization header
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
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

        // Forgot password
        forgotPassword: builder.mutation<MessageResponse, ForgotPasswordRequest>({
            query: (data) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body: data,
            }),
        }),

        // Reset password
        resetPassword: builder.mutation<MessageResponse, ResetPasswordRequest>({
            query: (data) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body: data,
            }),
        }),

        // Get current user
        getCurrentUser: builder.query<User, void>({
            query: () => '/auth/me',
            providesTags: ['User'],
        }),

        // Get user by ID
        getUserById: builder.query<User, string>({
            query: (id) => `/users/${id}`,
            providesTags: (result, error, id) => [{type: 'User', id}],
        }),

        // Get all users (admin only)
        getUsers: builder.query<User[], void>({
            query: () => '/users',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({id}) => ({type: 'User' as const, id: id.toString()})),
                        {type: 'User', id: 'LIST'},
                    ]
                    : [{type: 'User', id: 'LIST'}],
        }),

        // Update user
        updateUser: builder.mutation<User, Partial<User> & { id: number }>({
            query: ({id, ...patch}) => ({
                url: `/users/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: (result, error, {id}) => [{type: 'User', id: id.toString()}],
        }),

        // Delete user
        deleteUser: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{type: 'User', id: id.toString()}],
        }),

        // Send verification email
        sendVerificationEmail: builder.mutation<MessageResponse, void>({
            query: () => ({
                url: '/auth/send-verification',
                method: 'POST',
            }),
        }),

        // Verify email with token
        verifyEmail: builder.mutation<MessageResponse, VerifyEmailRequest>({
            query: (data) => ({
                url: '/auth/verify-email',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useGetCurrentUserQuery,
    useGetUserByIdQuery,
    useGetUsersQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useSendVerificationEmailMutation,
    useVerifyEmailMutation,
} = userApi;
