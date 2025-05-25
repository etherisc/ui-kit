import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, LoginCredentials } from '../types/Auth';

interface AuthStore extends AuthState {
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    clearError: () => void;
}

// Mock users for demo
const MOCK_USERS = [
    {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin' as const,
        password: 'admin',
    },
    {
        id: '2',
        email: 'user@example.com',
        name: 'Demo User',
        role: 'user' as const,
        password: 'user',
    },
];

export const useAuth = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (credentials: LoginCredentials) => {
                set({ isLoading: true, error: null });

                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                const user = MOCK_USERS.find(
                    u => u.email === credentials.email && u.password === credentials.password
                );

                if (user) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { password, ...userWithoutPassword } = user;
                    set({
                        user: userWithoutPassword,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null
                    });
                } else {
                    set({
                        error: 'Invalid email or password',
                        isLoading: false
                    });
                }
            },

            logout: () => {
                set({
                    user: null,
                    isAuthenticated: false,
                    error: null
                });
            },

            clearError: () => {
                set({ error: null });
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated
            }),
        }
    )
); 