import React from "react";
import { cn } from "../../lib/utils";

export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  htmlFor?: string;
  error?: string;
  description?: string;
  required?: boolean;
  children: React.ReactNode;
}

/**
 * FormGroup component for grouping form fields with labels and error messages
 */
export function FormGroup({
  label,
  htmlFor,
  error,
  description,
  required = false,
  className,
  children,
  ...props
}: FormGroupProps) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {label && (
        <label htmlFor={htmlFor} className="block text-sm font-medium">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      {children}
      {description && !error && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}
