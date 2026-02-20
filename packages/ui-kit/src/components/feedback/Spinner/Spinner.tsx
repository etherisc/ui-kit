import { cn } from "@/lib/utils";

export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
  label?: string;
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-10 w-10 border-[3px]",
};

export function Spinner({ size = "md", className, label = "Loading" }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        "animate-spin rounded-full border-muted border-t-primary",
        sizeClasses[size],
        className,
      )}
    >
      <span className="sr-only">{label}</span>
    </div>
  );
}

Spinner.displayName = "Spinner";
