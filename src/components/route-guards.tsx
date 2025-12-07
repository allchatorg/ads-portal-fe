"use client";

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {useAppSelector} from '@/store/hooks';
import {selectCurrentToken, selectIsAdmin, selectIsAuthenticated} from '@/store/slices/authSlice';
import {isTokenExpired} from '@/utils/jwt-utils';

interface UseAuthReturn {
    isAuthenticated: boolean;
    isAdmin: boolean;
    isLoading: boolean;
    token: string | null;
}

/**
 * Hook to get authentication state and check token validity
 */
export function useAuth(): UseAuthReturn {
    const [isLoading, setIsLoading] = useState(true);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const isAdminUser = useAppSelector(selectIsAdmin);
    const token = useAppSelector(selectCurrentToken);

    useEffect(() => {
        // Check if token is expired
        if (token && isTokenExpired(token)) {
            // Token is expired, clear auth state
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/auth?view=login';
        }
        setIsLoading(false);
    }, [token]);

    return {
        isAuthenticated,
        isAdmin: isAdminUser,
        isLoading,
        token,
    };
}

interface RouteGuardProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

/**
 * Component to protect routes that require authentication
 */
export function ProtectedRoute({children, fallback = null}: RouteGuardProps) {
    const router = useRouter();
    const {isAuthenticated, isLoading} = useAuth();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.replace('/auth?view=login');
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return <>{fallback}</>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}

/**
 * Component to protect admin-only routes
 */
export function AdminRoute({children, fallback = null}: RouteGuardProps) {
    const router = useRouter();
    const {isAuthenticated, isAdmin, isLoading} = useAuth();

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.replace('/auth?view=login');
            } else if (!isAdmin) {
                router.replace('/admin/dashboard');
            }
        }
    }, [isAuthenticated, isAdmin, isLoading, router]);

    if (isLoading) {
        return <>{fallback}</>;
    }

    if (!isAuthenticated || !isAdmin) {
        return null;
    }

    return <>{children}</>;
}

/**
 * Component to protect auth routes (login, register)
 * Redirects to dashboard if user is already authenticated
 */
export function AuthRoute({children, fallback = null}: RouteGuardProps) {
    const router = useRouter();
    const {isAuthenticated, isAdmin, isLoading} = useAuth();

    const HOME_ROUTE = isAdmin ? '/admin/dashboard' : '/dashboard';

    useEffect(() => {
        if (!isLoading && isAuthenticated) {

            router.replace(HOME_ROUTE);
        }
    }, [isAuthenticated, isLoading, router, HOME_ROUTE]);

    if (isLoading) {
        return <>{fallback}</>;
    }

    if (isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
