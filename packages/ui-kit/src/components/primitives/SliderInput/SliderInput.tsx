import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export interface SliderInputProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Slider>,
    "value" | "onValueChange" | "onChange"
  > {
  /** Label text displayed above the slider */
  label?: string;
  /** Description/help text rendered below */
  description?: string;
  /** Marks slider as invalid */
  error?: string;
  /** Visual size of the slider */
  size?: "default" | "sm" | "lg";
  /** Current value of the slider */
  value?: number;
  /** Callback when value changes */
  onChange?: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Whether to show the current value */
  showValue?: boolean;
  /** Format function for displaying the value */
  formatValue?: (value: number) => string;
  /** Optional CSS class name for the wrapper div */
  className?: string;
  /** Optional CSS class name for the slider element */
  sliderClassName?: string;
}

const SliderInput = React.forwardRef<
  React.ElementRef<typeof Slider>,
  SliderInputProps
>(
  (
    {
      label,
      description,
      error,
      size = "default",
      value = 0,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      showValue = true,
      formatValue,
      className,
      sliderClassName,
      disabled,
      id,
      ...props
    },
    ref,
  ) => {
    const handleValueChange = (values: number[]) => {
      onChange?.(values[0]);
    };

    const displayValue = formatValue ? formatValue(value) : value.toString();

    const sizeClasses = {
      sm: "h-1",
      default: "h-1.5",
      lg: "h-2",
    };

    const labelId = label ? `${id}-label` : undefined;
    const descriptionId = description ? `${id}-description` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const describedBy =
      [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className={cn("space-y-2", className)}>
        <div className="flex items-center justify-between">
          {label && (
            <label
              id={labelId}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          )}
          {showValue && (
            <span className="text-sm text-muted-foreground">
              {displayValue}
            </span>
          )}
        </div>

        <Slider
          ref={ref}
          id={id}
          value={[value]}
          onValueChange={handleValueChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={cn(
            sizeClasses[size],
            error &&
              "[&_[role=slider]]:border-destructive [&_[role=slider]]:focus-visible:ring-destructive",
            sliderClassName,
          )}
          aria-labelledby={labelId}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          {...props}
        />

        {description && !error && (
          <p id={descriptionId} className="text-sm text-muted-foreground">
            {description}
          </p>
        )}

        {error && (
          <p id={errorId} className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  },
);

SliderInput.displayName = "SliderInput";

export { SliderInput };
