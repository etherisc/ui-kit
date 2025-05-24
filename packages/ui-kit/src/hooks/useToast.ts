import { useToastContext, type ToastOptions } from '../providers/ToastProvider';

interface UseToastReturn {
    toast: (options: ToastOptions) => string;
    success: (title: string, description?: string, options?: Partial<Omit<ToastOptions, 'title' | 'description' | 'variant'>>) => string;
    error: (title: string, description?: string, options?: Partial<Omit<ToastOptions, 'title' | 'description' | 'variant'>>) => string;
    warning: (title: string, description?: string, options?: Partial<Omit<ToastOptions, 'title' | 'description' | 'variant'>>) => string;
    info: (title: string, description?: string, options?: Partial<Omit<ToastOptions, 'title' | 'description' | 'variant'>>) => string;
    remove: (id: string) => void;
    update: (id: string, options: Partial<ToastOptions>) => void;
}

export function useToast(): UseToastReturn {
    const { addToast, removeToast, updateToast } = useToastContext();

    const toast = (options: ToastOptions) => addToast(options);

    const success = (title: string, description?: string, options: Partial<Omit<ToastOptions, 'title' | 'description' | 'variant'>> = {}) => {
        return addToast({
            title,
            description,
            variant: 'success',
            ...options,
        });
    };

    const error = (title: string, description?: string, options: Partial<Omit<ToastOptions, 'title' | 'description' | 'variant'>> = {}) => {
        return addToast({
            title,
            description,
            variant: 'error',
            ...options,
        });
    };

    const warning = (title: string, description?: string, options: Partial<Omit<ToastOptions, 'title' | 'description' | 'variant'>> = {}) => {
        return addToast({
            title,
            description,
            variant: 'warning',
            ...options,
        });
    };

    const info = (title: string, description?: string, options: Partial<Omit<ToastOptions, 'title' | 'description' | 'variant'>> = {}) => {
        return addToast({
            title,
            description,
            variant: 'info',
            ...options,
        });
    };

    return {
        toast,
        success,
        error,
        warning,
        info,
        remove: removeToast,
        update: updateToast,
    };
}

export default useToast; 