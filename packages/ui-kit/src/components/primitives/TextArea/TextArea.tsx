import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export interface TextAreaProps
  extends Omit<React.ComponentPropsWithoutRef<"textarea">, "size"> {
  /** Label text displayed above the textarea */
  label?: string;
  /** Description/help text rendered below */
  description?: string;
  /** Marks textarea as invalid */
  error?: string;
  /** Visual size of the textarea */
  size?: "default" | "sm" | "lg";
  /** Optional CSS class name for the wrapper div */
  className?: string;
  /** Optional CSS class name for the textarea element */
  textareaClassName?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      description,
      error,
      size = "default",
      className,
      textareaClassName,
      ...props
    },
    ref,
  ) => {
    // Size classes for the textarea element
    let sizeClass = "";
    if (size === "sm") {
      sizeClass = "min-h-[40px] text-xs px-2 py-1";
    } else if (size === "lg") {
      sizeClass = "min-h-[80px] text-base px-4 py-3";
    } else {
      sizeClass = "min-h-[60px]";
    }

    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={props.id}
            className="mb-1 block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        <Textarea
          ref={ref}
          aria-invalid={!!error}
          className={cn(
            sizeClass,
            error ? "border-destructive text-destructive-foreground" : "",
            textareaClassName,
          )}
          {...props}
        />
        {description && !error && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
        {error && (
          <p className="mt-1 text-xs text-destructive-foreground">{error}</p>
        )}
      </div>
    );
  },
);
TextArea.displayName = "TextArea";
