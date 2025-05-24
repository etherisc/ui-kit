declare module '@org/ui-kit' {
    import { ReactNode } from 'react';

    export interface User {
        id: string;
        email: string;
        name: string;
        role: 'admin' | 'user';
    }

    export interface ButtonProps {
        children: ReactNode;
        onClick?: () => void;
        type?: 'button' | 'submit' | 'reset';
        className?: string;
        disabled?: boolean;
        variant?: 'default' | 'outline' | 'ghost';
        size?: 'sm' | 'md' | 'lg';
    }

    export interface TextInputProps {
        label?: string;
        type?: string;
        placeholder?: string;
        error?: string;
        name?: string;
        value?: string;
        onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
        onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    }

    export interface StatusBadgeProps {
        children: ReactNode;
        status: 'active' | 'inactive' | 'pending' | 'success' | 'warning' | 'error';
    }

    export interface DataTableProps {
        data: unknown[];
        columns: unknown[];
        searchable?: boolean;
        pagination?: {
            pageSize: number;
            showSizeSelector?: boolean;
        };
    }

    export interface NavItem {
        id: string;
        label: string;
        icon?: ReactNode;
        href?: string;
        isActive?: boolean;
        onClick?: () => void;
        children?: NavItem[];
        isGroup?: boolean;
        isExpanded?: boolean;
    }

    export interface BreadcrumbItem {
        label: string;
        href?: string;
        isActive?: boolean;
    }

    export interface AppShellProps {
        children?: ReactNode;
        logo?: ReactNode;
        navItems?: NavItem[];
        topNavItems?: ReactNode;
        userActions?: ReactNode;
        breadcrumbs?: BreadcrumbItem[];
        fixedHeader?: boolean;
        defaultCollapsed?: boolean;
        className?: string;
        fixedWidth?: boolean;
    }

    export interface AuthShellProps {
        children: ReactNode;
    }

    export interface ToastProviderProps {
        children: ReactNode;
    }

    export interface UseToastReturn {
        toast: (options: Record<string, unknown>) => string;
        success: (title: string, description?: string) => string;
        error: (title: string, description?: string) => string;
        warning: (title: string, description?: string) => string;
        info: (title: string, description?: string) => string;
    }

    export const Button: React.FC<ButtonProps>;
    export const TextInput: React.ForwardRefExoticComponent<TextInputProps>;
    export const StatusBadge: React.FC<StatusBadgeProps>;
    export const DataTable: React.FC<DataTableProps>;
    export const AppShell: React.FC<AppShellProps>;
    export const AuthShell: React.FC<AuthShellProps>;
    export const ToastProvider: React.FC<ToastProviderProps>;
    export const useToast: () => UseToastReturn;
} 