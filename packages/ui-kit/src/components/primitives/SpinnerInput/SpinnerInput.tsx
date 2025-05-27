import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface SpinnerInputProps
  extends Omit<
    React.ComponentPropsWithoutRef<"input">,
    "type" | "value" | "onChange" | "size"
  > {
  /** Label text displayed above the input */
  label?: string;
  /** Description/help text rendered below */
  description?: string;
  /** Marks input as invalid */
  error?: string;
  /** Visual size of the input */
  size?: "default" | "sm" | "lg";
  /** Current numeric value */
  value?: number;
  /** Callback when value changes */
  onChange?: (value: number) => void;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Step increment/decrement amount */
  step?: number;
  /** Number of decimal places to display */
  precision?: number;
  /** Whether to show increment/decrement buttons */
  showButtons?: boolean;
  /** Optional CSS class name for the wrapper div */
  className?: string;
  /** Optional CSS class name for the input element */
  inputClassName?: string;
}

const SpinnerInput = React.forwardRef<HTMLInputElement, SpinnerInputProps>(
  (
    {
      label,
      description,
      error,
      size = "default",
      value = 0,
      onChange,
      min,
      max,
      step = 1,
      precision,
      showButtons = true,
      className,
      inputClassName,
      disabled,
      id,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState<string>(
      value !== undefined ? formatValue(value, precision) : "",
    );

    // Update internal value when external value changes
    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(formatValue(value, precision));
      }
    }, [value, precision]);

    function formatValue(val: number, prec?: number): string {
      if (prec !== undefined) {
        return val.toFixed(prec);
      }
      return val.toString();
    }

    function parseValue(val: string): number {
      const parsed = parseFloat(val);
      return isNaN(parsed) ? 0 : parsed;
    }

    function clampValue(val: number): number {
      let clamped = val;
      if (min !== undefined) clamped = Math.max(min, clamped);
      if (max !== undefined) clamped = Math.min(max, clamped);
      return clamped;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);

      // Only call onChange if the value is a valid number
      if (newValue === "" || newValue === "-") {
        onChange?.(0);
      } else {
        const parsed = parseValue(newValue);
        if (!isNaN(parsed)) {
          const clamped = clampValue(parsed);
          onChange?.(clamped);
        }
      }
    };

    const handleInputBlur = () => {
      // Format the value on blur
      const parsed = parseValue(internalValue);
      const clamped = clampValue(parsed);
      const formatted = formatValue(clamped, precision);
      setInternalValue(formatted);
      onChange?.(clamped);
    };

    const handleIncrement = () => {
      const current = parseValue(internalValue);
      const newValue = clampValue(current + step);
      const formatted = formatValue(newValue, precision);
      setInternalValue(formatted);
      onChange?.(newValue);
    };

    const handleDecrement = () => {
      const current = parseValue(internalValue);
      const newValue = clampValue(current - step);
      const formatted = formatValue(newValue, precision);
      setInternalValue(formatted);
      onChange?.(newValue);
    };

    const canIncrement = max === undefined || parseValue(internalValue) < max;
    const canDecrement = min === undefined || parseValue(internalValue) > min;

    const sizeClasses = {
      sm: "h-8 text-xs",
      default: "h-9 text-sm",
      lg: "h-10 text-base",
    };

    const buttonSizeClasses = {
      sm: "h-6 w-6",
      default: "h-7 w-7",
      lg: "h-8 w-8",
    };

    const labelId = label ? `${id}-label` : undefined;
    const descriptionId = description ? `${id}-description` : undefined;
    const errorId = error ? `${id}-error` : undefined;

    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <label
            id={labelId}
            htmlFor={id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          <Input
            ref={ref}
            id={id}
            type="text"
            inputMode="numeric"
            value={internalValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            disabled={disabled}
            placeholder={placeholder}
            aria-labelledby={labelId}
            aria-label={!label ? "Numeric input" : undefined}
            aria-describedby={cn(descriptionId, errorId)}
            aria-invalid={!!error}
            className={cn(
              sizeClasses[size],
              showButtons && "pr-16",
              error && "border-destructive focus-visible:ring-destructive",
              inputClassName,
            )}
            {...props}
          />

          {showButtons && (
            <div className="absolute right-1 flex flex-col">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={disabled || !canIncrement}
                onClick={handleIncrement}
                className={cn(
                  "rounded-b-none border-b-0 p-0",
                  buttonSizeClasses[size],
                )}
                aria-label="Increment value"
              >
                <Plus className="h-3 w-3" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={disabled || !canDecrement}
                onClick={handleDecrement}
                className={cn("rounded-t-none p-0", buttonSizeClasses[size])}
                aria-label="Decrement value"
              >
                <Minus className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>

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

SpinnerInput.displayName = "SpinnerInput";

export { SpinnerInput };
