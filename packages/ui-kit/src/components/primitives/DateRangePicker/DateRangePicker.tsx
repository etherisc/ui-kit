import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DateRange as DayPickerDateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface DateRange {
  from?: Date;
  to?: Date;
}

export interface DateRangePickerProps
  extends Omit<
    React.ComponentProps<typeof Button>,
    "onChange" | "value" | "size"
  > {
  /**
   * The selected date range value
   */
  value?: DateRange;
  /**
   * Callback fired when the date range changes
   */
  onChange?: (range: DateRange | undefined) => void;
  /**
   * Placeholder text when no date range is selected
   */
  placeholder?: string;
  /**
   * Whether the date range picker is disabled
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
   * Maximum number of days between from and to dates
   */
  maxRange?: number;
  /**
   * ARIA label for accessibility
   */
  "aria-label"?: string;
  /**
   * ARIA described by for accessibility
   */
  "aria-describedby"?: string;
}

const DateRangePicker = React.forwardRef<
  HTMLButtonElement,
  DateRangePickerProps
>(
  (
    {
      value,
      onChange,
      placeholder = "Pick a date range",
      disabled = false,
      error,
      minDate,
      maxDate,
      disabledDates,
      format: dateFormat = "PPP",
      className,
      size = "md",
      maxRange,
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

    const handleSelect = (range: DayPickerDateRange | undefined) => {
      // Convert DayPicker DateRange to our DateRange
      const convertedRange: DateRange | undefined = range
        ? {
            from: range.from,
            to: range.to,
          }
        : undefined;

      // Validate max range if specified
      if (
        convertedRange &&
        convertedRange.from &&
        convertedRange.to &&
        maxRange
      ) {
        const daysDiff = Math.ceil(
          (convertedRange.to.getTime() - convertedRange.from.getTime()) /
            (1000 * 60 * 60 * 24),
        );
        if (daysDiff > maxRange) {
          // Don't update if range exceeds maximum
          return;
        }
      }

      onChange?.(convertedRange);

      // Close popover when both dates are selected
      if (convertedRange?.from && convertedRange?.to) {
        setOpen(false);
      }
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

        // Check max range constraint
        if (maxRange && value?.from && !value?.to) {
          const daysDiff = Math.ceil(
            Math.abs(date.getTime() - value.from.getTime()) /
              (1000 * 60 * 60 * 24),
          );
          if (daysDiff > maxRange) {
            return true;
          }
        }

        return false;
      },
      [minDate, maxDate, disabledDates, maxRange, value],
    );

    const formatDateRange = (range: DateRange | undefined) => {
      if (!range?.from) return placeholder;

      if (range.to) {
        return `${format(range.from, dateFormat)} - ${format(range.to, dateFormat)}`;
      }

      return format(range.from, dateFormat);
    };

    const buttonContent = value?.from ? (
      <span className="text-left">{formatDateRange(value)}</span>
    ) : (
      <span className="text-muted-foreground">{placeholder}</span>
    );

    const errorId = error
      ? `${props.id || "daterangepicker"}-error`
      : undefined;
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
                !value?.from && "text-muted-foreground",
                className,
              )}
              disabled={disabled}
              aria-label={ariaLabel || "Choose date range"}
              aria-describedby={describedBy}
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
              mode="range"
              selected={
                value?.from ? { from: value.from, to: value.to } : undefined
              }
              onSelect={handleSelect}
              disabled={isDateDisabled}
              initialFocus
              numberOfMonths={2}
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

DateRangePicker.displayName = "DateRangePicker";

export { DateRangePicker };
