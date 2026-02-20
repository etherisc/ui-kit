import * as React from "react";
import { cn } from "../../../lib/utils";

export type StatusBadgeVariant =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "pending"
  | "neutral";

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: StatusBadgeVariant;
  children: React.ReactNode;
}

export function StatusBadge({
  variant = "neutral",
  children,
  className,
  ...props
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "success" && "bg-success text-success-foreground",
        variant === "error" && "bg-error text-error-foreground",
        variant === "warning" && "bg-warning text-warning-foreground",
        variant === "info" && "bg-info text-info-foreground",
        variant === "pending" && "bg-muted text-muted-foreground",
        variant === "neutral" && "bg-secondary text-secondary-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

StatusBadge.displayName = "StatusBadge";

export default StatusBadge;
