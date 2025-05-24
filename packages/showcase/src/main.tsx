import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastProvider } from '@org/ui-kit';
import './index.css';

import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { CustomersPage } from './pages/CustomersPage';
import { ProtectedRoute } from './components/ProtectedRoute';

// Set DaisyUI theme on HTML element
document.documentElement.setAttribute('data-theme', 'light');

const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <DashboardPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/customers',
        element: (
            <ProtectedRoute>
                <CustomersPage />
            </ProtectedRoute>
        ),
    },
]);

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

const root = createRoot(container);
root.render(
    <React.StrictMode>
        <ToastProvider>
            <RouterProvider router={router} />
        </ToastProvider>
    </React.StrictMode>
); 