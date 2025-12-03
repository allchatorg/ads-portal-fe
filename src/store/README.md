# Redux Store Usage Guide

## Overview
This project uses Redux Toolkit and RTK Query for state management and API calls. The store is configured with a user API slice that handles authentication and user management.

## Store Structure

```
src/store/
├── store.ts              # Store configuration
├── hooks.ts              # Typed Redux hooks
├── StoreProvider.tsx     # Provider component for Next.js
└── services/
    └── userApi.ts        # User API slice with RTK Query
```

## Usage Examples

### 1. Using RTK Query Hooks in Components

#### Login Example
```tsx
'use client';

import { useLoginMutation } from '@/store/services/userApi';
import { useState } from 'react';

export function LoginForm() {
  const [login, { isLoading, error }] = useLoginMutation();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await login({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      }).unwrap();
      
      // Store token
      localStorage.setItem('token', result.token);
      
      // Handle successful login
      console.log('Logged in:', result.user);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p>Error: {JSON.stringify(error)}</p>}
    </form>
  );
}
```

#### Register Example
```tsx
'use client';

import { useRegisterMutation } from '@/store/services/userApi';

export function RegisterForm() {
  const [register, { isLoading, error }] = useRegisterMutation();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await register({
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      }).unwrap();
      
      // Store token
      localStorage.setItem('token', result.token);
      
      // Handle successful registration
      console.log('Registered:', result.user);
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" placeholder="First Name" required />
      <input name="lastName" placeholder="Last Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </button>
      {error && <p>Error: {JSON.stringify(error)}</p>}
    </form>
  );
}
```

#### Get Current User
```tsx
'use client';

import { useGetCurrentUserQuery } from '@/store/services/userApi';

export function UserProfile() {
  const { data: user, isLoading, error } = useGetCurrentUserQuery();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user</div>;
  if (!user) return <div>Not logged in</div>;
  
  return (
    <div>
      <h1>{user.firstName} {user.lastName}</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Total Ads: {user.totalAds}</p>
      <p>Total Spent: ${user.totalSpent}</p>
    </div>
  );
}
```

#### Get All Users (Admin)
```tsx
'use client';

import { useGetUsersQuery } from '@/store/services/userApi';

export function UsersList() {
  const { data: users, isLoading, error } = useGetUsersQuery();
  
  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error loading users</div>;
  
  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users?.map(user => (
          <li key={user.id}>
            {user.firstName} {user.lastName} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

#### Update User
```tsx
'use client';

import { useUpdateUserMutation } from '@/store/services/userApi';

export function UpdateUserForm({ userId }: { userId: string }) {
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  
  const handleUpdate = async () => {
    try {
      await updateUser({
        id: userId,
        firstName: 'New Name',
      }).unwrap();
      
      console.log('User updated successfully');
    } catch (err) {
      console.error('Update failed:', err);
    }
  };
  
  return (
    <button onClick={handleUpdate} disabled={isLoading}>
      {isLoading ? 'Updating...' : 'Update User'}
    </button>
  );
}
```

### 2. Using Typed Hooks

Instead of using the default `useDispatch` and `useSelector`, use the typed versions:

```tsx
import { useAppDispatch, useAppSelector } from '@/store/hooks';

// These hooks provide full TypeScript support
const dispatch = useAppDispatch();
const state = useAppSelector(state => state.userApi);
```

### 3. API Endpoints

The user API includes the following endpoints:

- **GET** `/api/user/me` - Get current user
- **GET** `/api/users` - Get all users (admin only)
- **GET** `/api/users/:id` - Get user by ID
- **POST** `/api/auth/login` - Login
- **POST** `/api/auth/register` - Register
- **PATCH** `/api/users/:id` - Update user
- **DELETE** `/api/users/:id` - Delete user

### 4. Authentication

The store automatically adds the auth token to all requests:

```typescript
// Token is read from localStorage and added to headers
prepareHeaders: (headers) => {
  const token = localStorage.getItem('token');
  if (token) {
    headers.set('authorization', `Bearer ${token}`);
  }
  return headers;
}
```

### 5. Cache Invalidation

RTK Query automatically handles cache invalidation. When you update or delete a user, the cache is invalidated and related queries are refetched:

```typescript
// After updating a user, the getUserById query will automatically refetch
updateUser: builder.mutation({
  // ...
  invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
}),
```

## Next Steps

1. **Create API Routes**: Implement the actual API routes in Next.js (`/api/auth/login`, `/api/users`, etc.)
2. **Add More Slices**: Create additional API slices for ads, payments, etc.
3. **Add Auth Middleware**: Implement proper authentication middleware
4. **Error Handling**: Add global error handling for API calls
5. **Loading States**: Create reusable loading components

## TypeScript Types

All types are defined in `src/store/services/userApi.ts`:

- `User` - User object structure
- `LoginRequest` - Login credentials
- `RegisterRequest` - Registration data
- `LoginResponse` - Login/register response with token

## Benefits of RTK Query

- ✅ Automatic caching
- ✅ Automatic refetching
- ✅ Loading and error states
- ✅ TypeScript support
- ✅ Optimistic updates
- ✅ Request deduplication
- ✅ Polling support
