import * as React from "react";
import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";
import {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  Loader2,
} from "lucide-react";

import { cn } from "@/lib/utils";

// Enhanced types extending the existing ToastOptions
export type SonnerVariant =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading"
  | "default";

export interface SonnerToastOptions {
  title?: string;
  description?: string;
  variant?: SonnerVariant;
  duration?: number;
  icon?: React.ReactNode;
  onDismiss?: () => void;
  onAutoClose?: () => void;
}

// Enhanced Toaster component with design system integration
interface SonnerProps {
  theme?: "light" | "dark" | "system";
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  className?: string;
  richColors?: boolean;
  expand?: boolean;
  visibleToasts?: number;
  duration?: number;
}

const Sonner: React.FC<SonnerProps> = ({
  theme = "system",
  position = "bottom-right",
  className,
  richColors = true,
  expand = false,
  visibleToasts = 5,
  duration = 4000,
  ...props
}) => {
  return (
    <SonnerToaster
      theme={theme}
      position={position}
      richColors={richColors}
      expand={expand}
      visibleToasts={visibleToasts}
      duration={duration}
      className={cn("toaster group", className)}
      toastOptions={{
        className: cn(
          "group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-md",
        ),
        descriptionClassName: cn("group-[.toast]:text-muted-foreground"),
      }}
      {...props}
    />
  );
};

// Enhanced toast functions with better UX
const getVariantIcon = (variant: SonnerVariant) => {
  switch (variant) {
    case "success":
      return <CheckCircle className="h-4 w-4" />;
    case "error":
      return <AlertCircle className="h-4 w-4" />;
    case "warning":
      return <AlertTriangle className="h-4 w-4" />;
    case "info":
      return <Info className="h-4 w-4" />;
    case "loading":
      return <Loader2 className="h-4 w-4 animate-spin" />;
    default:
      return null;
  }
};

const toast = (message: string, options?: SonnerToastOptions) => {
  const { variant = "default", icon, ...restOptions } = options || {};

  const toastIcon = icon || getVariantIcon(variant);

  switch (variant) {
    case "success":
      return sonnerToast.success(message, {
        icon: toastIcon,
        ...restOptions,
      });
    case "error":
      return sonnerToast.error(message, {
        icon: toastIcon,
        ...restOptions,
      });
    case "warning":
      return sonnerToast.warning(message, {
        icon: toastIcon,
        ...restOptions,
      });
    case "info":
      return sonnerToast.info(message, {
        icon: toastIcon,
        ...restOptions,
      });
    case "loading":
      return sonnerToast.loading(message, {
        icon: toastIcon,
        ...restOptions,
      });
    default:
      return sonnerToast(message, {
        icon: toastIcon,
        ...restOptions,
      });
  }
};

// Enhanced toast API with promise support
const toastPromise = <T,>(
  promise: Promise<T> | (() => Promise<T>),
  options: {
    loading?: string;
    success?: string | ((data: T) => string);
    error?: string | ((error: unknown) => string);
    description?: string;
    duration?: number;
  },
) => {
  return sonnerToast.promise(promise, {
    loading: options.loading || "Loading...",
    success: options.success || "Success!",
    error: options.error || "Something went wrong!",
    description: options.description,
    duration: options.duration,
  });
};

// Convenience methods
const success = (
  message: string,
  options?: Omit<SonnerToastOptions, "variant">,
) => {
  return toast(message, { ...options, variant: "success" });
};

const error = (
  message: string,
  options?: Omit<SonnerToastOptions, "variant">,
) => {
  return toast(message, { ...options, variant: "error" });
};

const warning = (
  message: string,
  options?: Omit<SonnerToastOptions, "variant">,
) => {
  return toast(message, { ...options, variant: "warning" });
};

const info = (
  message: string,
  options?: Omit<SonnerToastOptions, "variant">,
) => {
  return toast(message, { ...options, variant: "info" });
};

const loading = (
  message: string,
  options?: Omit<SonnerToastOptions, "variant">,
) => {
  return toast(message, { ...options, variant: "loading" });
};

// Utility functions
const dismiss = (id?: string | number) => {
  return sonnerToast.dismiss(id);
};

const dismissAll = () => {
  return sonnerToast.dismiss();
};

// Enhanced toast object with all methods
const enhancedToast = {
  // Core methods
  toast,
  success,
  error,
  warning,
  info,
  loading,
  promise: toastPromise,

  // Utility methods
  dismiss,
  dismissAll,

  // Advanced methods
  message: toast,

  // Backwards compatibility aliases
  default: toast,
};

// Hook for backwards compatibility with existing useToast
export const useSonnerToast = () => {
  return {
    toast: (options: {
      title: string;
      description?: string;
      variant?: SonnerVariant;
      duration?: number;
    }) => {
      const message = options.description
        ? `${options.title}\n${options.description}`
        : options.title;
      return toast(message, {
        variant: options.variant,
        duration: options.duration,
      });
    },
    success: (
      title: string,
      description?: string,
      options?: { duration?: number },
    ) => {
      const message = description ? `${title}\n${description}` : title;
      return success(message, options);
    },
    error: (
      title: string,
      description?: string,
      options?: { duration?: number },
    ) => {
      const message = description ? `${title}\n${description}` : title;
      return error(message, options);
    },
    warning: (
      title: string,
      description?: string,
      options?: { duration?: number },
    ) => {
      const message = description ? `${title}\n${description}` : title;
      return warning(message, options);
    },
    info: (
      title: string,
      description?: string,
      options?: { duration?: number },
    ) => {
      const message = description ? `${title}\n${description}` : title;
      return info(message, options);
    },
    remove: dismiss,
    update: () => {
      console.warn(
        "Sonner does not support updating toasts. Use dismiss and create a new toast instead.",
      );
    },
  };
};

export {
  Sonner,
  enhancedToast as toast,
  success,
  error,
  warning,
  info,
  loading,
  toastPromise as promise,
  dismiss,
  dismissAll,
};

export type { SonnerProps };
