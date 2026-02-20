import React from "react";
import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "./types";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <ShadcnButton
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "transition-colors",
          loading && "loading",
          disabled && "opacity-50 cursor-not-allowed",
          className,
        )}
        disabled={disabled || loading}
        {...props}
      >
        {children}
      </ShadcnButton>
    );
  },
);

Button.displayName = "Button";
