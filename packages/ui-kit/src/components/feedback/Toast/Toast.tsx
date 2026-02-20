import * as React from "react";
import { XIcon } from "lucide-react";
import { cn } from "../../../lib/utils";
import type { Toast as ToastType } from "../../../providers/ToastProvider/ToastProvider";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  toast: ToastType;
  onClose?: () => void;
}

const variantClasses: Record<string, string> = {
  success: "bg-green-50 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-800",
  error: "bg-red-50 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-800",
  warning: "bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-200 dark:border-yellow-800",
  info: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-800",
};

const defaultVariantClass = "bg-muted text-foreground border-border";

export function Toast({ toast, onClose, className, ...props }: ToastProps) {
  const { title, description, variant = "info" } = toast;

  const handleClose = React.useCallback(() => {
    onClose?.();
    toast.onClose?.();
  }, [onClose, toast]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={cn(
        "relative w-full max-w-sm rounded-lg border p-3 text-sm shadow-md",
        variantClasses[variant] ?? defaultVariantClass,
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          {title && (
            <div className="font-semibold mb-1">{title}</div>
          )}
          {description && (
            <div className="text-xs opacity-80">{description}</div>
          )}
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-2 top-2 rounded p-1 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Close toast"
        >
          <XIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

Toast.displayName = "Toast";

export default Toast;
