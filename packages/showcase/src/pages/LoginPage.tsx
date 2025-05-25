import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AuthShell, Button, TextInput, useToast } from '@org/ui-kit';
import { useAuth } from '../hooks/useAuth';
import type { LoginCredentials } from '../types/Auth';

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(1, 'Password is required'),
});

export function LoginPage() {
    const navigate = useNavigate();
    const { login, isAuthenticated, isLoading, error, clearError } = useAuth();
    const { error: showError } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginCredentials>({
        resolver: zodResolver(loginSchema),
    });

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (error) {
            showError('Login Failed', error);
            clearError();
        }
    }, [error, showError, clearError]);

    const onSubmit = async (data: LoginCredentials) => {
        await login(data);
    };

    return (
        <AuthShell>
            <div className="w-full max-w-md space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Welcome Back</h1>
                    <p className="text-gray-600 mt-2">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <TextInput
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        error={errors.email?.message}
                        {...register('email')}
                    />

                    <TextInput
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        error={errors.password?.message}
                        {...register('password')}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>

                <div className="text-center text-sm text-gray-600">
                    <p>Demo credentials:</p>
                    <p>Admin: admin@example.com / admin</p>
                    <p>User: user@example.com / user</p>
                </div>
            </div>
        </AuthShell>
    );
} 