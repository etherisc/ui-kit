import React from "react";
import { cn } from "@/utils/cn";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/Card/Card";
import { TypographyMuted } from "@/components/ui/Typography/Typography";
import { AuthShellProps } from "./types";

/**
 * AuthShell is a layout component for authentication-related pages like login, signup, and password reset.
 * It provides a centered container with optional logo and footer slots.
 */
export const AuthShell: React.FC<AuthShellProps> = ({
  logo,
  children,
  footer,
  className,
  width = "md",
}) => {
  const containerWidthClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  }[width];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card
        className={cn(
          "w-full flex flex-col items-center",
          containerWidthClass,
          className,
        )}
      >
        {logo && (
          <CardHeader className="flex justify-center w-full">{logo}</CardHeader>
        )}

        <CardContent className="w-full">{children}</CardContent>

        {footer && (
          <CardFooter className="w-full justify-center text-center">
            <TypographyMuted className="text-center">{footer}</TypographyMuted>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

AuthShell.displayName = "AuthShell";
