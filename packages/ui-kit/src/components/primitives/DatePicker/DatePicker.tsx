import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface DatePickerProps
  extends Omit<
    React.ComponentProps<typeof Button>,
    "onChange" | "value" | "size"
  > {
  /**
   * The selected date value
   */
  value?: Date;
  /**
   * Callback fired when the date changes
   */
  onChange?: (date: Date | undefined) => void;
  /**
   * Placeholder text when no date is selected
   */
  placeholder?: string;
  /**
   * Whether the date picker is disabled
   */
  disabled?: boolean;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Minimum selectable date
   */
  minDate?: Date;
  /**
   * Maximum selectable date
   */
  maxDate?: Date;
  /**
   * Array of dates that should be disabled
   */
  disabledDates?: Date[];
  /**
   * Date format string (date-fns format)
   * @default "PPP" (e.g., "January 1, 2024")
   */
  format?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg";
  /**
   * Whether the field is required
   */
  required?: boolean;
  /**
   * ARIA label for accessibility
   */
  "aria-label"?: string;
  /**
   * ARIA described by for accessibility
   */
  "aria-describedby"?: string;
}

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = "Pick a date",
      disabled = false,
      error,
      minDate,
      maxDate,
      disabledDates,
      format: dateFormat = "PPP",
      className,
      size = "md",
      required = false,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);

    const sizeClasses = {
      sm: "h-8 text-xs px-2",
      md: "h-10 text-sm px-3",
      lg: "h-12 text-base px-4",
    };

    const handleSelect = (date: Date | undefined) => {
      onChange?.(date);
      setOpen(false);
    };

    const isDateDisabled = React.useCallback(
      (date: Date) => {
        // Check min/max dates
        if (minDate && date < minDate) return true;
        if (maxDate && date > maxDate) return true;

        // Check disabled dates array
        if (
          disabledDates?.some(
            (disabledDate) =>
              date.toDateString() === disabledDate.toDateString(),
          )
        ) {
          return true;
        }

        return false;
      },
      [minDate, maxDate, disabledDates],
    );

    const buttonContent = value ? (
      <span className="text-left">{format(value, dateFormat)}</span>
    ) : (
      <span className="text-muted-foreground">{placeholder}</span>
    );

    const errorId = error ? `${props.id || "datepicker"}-error` : undefined;
    const describedBy =
      [ariaDescribedBy, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="space-y-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              variant="outline"
              className={cn(
                "justify-start font-normal",
                sizeClasses[size],
                error && "border-destructive focus-visible:ring-destructive",
                !value && "text-muted-foreground",
                className,
              )}
              disabled={disabled}
              aria-label={ariaLabel || "Choose date"}
              aria-describedby={describedBy}
              aria-required={required}
              aria-expanded={open}
              aria-haspopup="dialog"
              {...props}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {buttonContent}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              onSelect={handleSelect}
              disabled={isDateDisabled}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {error && (
          <p
            id={errorId}
            className="text-sm text-destructive"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

DatePicker.displayName = "DatePicker";

export { DatePicker };
