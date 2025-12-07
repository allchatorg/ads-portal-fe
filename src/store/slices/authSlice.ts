import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {Role, userApi} from '../services/userApi';

export interface AuthUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
}

interface AuthState {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
}

// Helper to load state from localStorage
const loadState = (): AuthState => {
    if (typeof window === 'undefined') {
        return {
            user: null,
            token: null,
            isAuthenticated: false,
        };
    }
    try {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        if (token && userStr) {
            return {
                user: JSON.parse(userStr),
                token,
                isAuthenticated: true,
            };
        }
    } catch (e) {
        console.error("Failed to load auth state", e);
    }
    return {
        user: null,
        token: null,
        isAuthenticated: false,
    };
};

const initialState: AuthState = loadState();

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: AuthUser; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;

            // Persist to localStorage
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        },
        clearUser: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

            // Clear localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                userApi.endpoints.logout.matchFulfilled,
                (state) => {
                    state.user = null;
                    state.token = null;
                    state.isAuthenticated = false;
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            );
    },

});

export const {setUser, clearUser} = authSlice.actions;

// Selectors
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectIsAdmin = (state: RootState) => state.auth.user?.role === Role.ADMIN;

export default authSlice.reducer;
