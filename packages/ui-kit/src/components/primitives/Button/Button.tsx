import React from "react";
import {
  Button as ShadcnButton,
  type ButtonProps as ShadcnButtonProps,
} from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "./types";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      intent,
      variant,
      size = "default",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    // Handle backward compatibility: prefer variant over intent
    const buttonVariant = variant || intent || "default";

    // Warn about deprecated intent prop usage in development
    if (process.env.NODE_ENV === "development" && intent && !variant) {
      console.warn(
        'Button: The "intent" prop is deprecated and will be removed in v0.5.0. Please use "variant" instead.',
      );
    }

    // Map our variant to Shadcn's variant system
    const shadcnVariant: ShadcnButtonProps["variant"] =
      buttonVariant === "danger"
        ? "destructive"
        : buttonVariant === "primary"
          ? "default"
          : buttonVariant === "secondary"
            ? "secondary"
            : buttonVariant === "outline"
              ? "outline"
              : buttonVariant === "ghost"
                ? "ghost"
                : buttonVariant === "link"
                  ? "link"
                  : "default";

    return (
      <ShadcnButton
        ref={ref}
        variant={shadcnVariant}
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
