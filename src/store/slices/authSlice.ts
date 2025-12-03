import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Role, userApi } from '../services/userApi';

export interface AuthUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
}

interface AuthState {
    user: AuthUser | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthUser>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                userApi.endpoints.login.matchFulfilled,
                (state, { payload }) => {
                    state.user = payload;
                    state.isAuthenticated = true;
                }
            )
            .addMatcher(
                userApi.endpoints.register.matchFulfilled,
                (state, { payload }) => {
                    state.user = payload;
                    state.isAuthenticated = true;
                }
            )
            .addMatcher(
                userApi.endpoints.logout.matchFulfilled,
                (state) => {
                    state.user = null;
                    state.isAuthenticated = false;
                }
            );
    },
});

export const { setUser, clearUser } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectIsAdmin = (state: RootState) => state.auth.user?.role === Role.ADMIN;

export default authSlice.reducer;
