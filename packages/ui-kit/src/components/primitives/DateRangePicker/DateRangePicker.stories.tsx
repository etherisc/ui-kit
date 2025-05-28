import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DateRangePicker, type DateRange } from "./DateRangePicker";

const meta: Meta<typeof DateRangePicker> = {
  title: "Components/Primitives/DateRangePicker",
  component: DateRangePicker,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A date range picker component with dual calendar view, built on React DayPicker and date-fns.",
      },
    },
    a11y: {
      disable: false,
    },
  },
  argTypes: {
    value: {
      control: false,
      description: "The selected date range value",
    },
    onChange: {
      action: "changed",
      description: "Callback fired when the date range changes",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no date range is selected",
    },
    disabled: {
      control: "boolean",
      description: "Whether the date range picker is disabled",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    format: {
      control: "text",
      description: "Date format string (date-fns format)",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    required: {
      control: "boolean",
      description: "Whether the field is required",
    },
    maxRange: {
      control: "number",
      description: "Maximum number of days between from and to dates",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {
  args: {
    placeholder: "Pick a date range",
  },
};

export const WithValue: Story = {
  args: {
    value: {
      from: new Date(2024, 0, 15), // January 15, 2024
      to: new Date(2024, 0, 20), // January 20, 2024
    },
    placeholder: "Pick a date range",
  },
};

export const PartialRange: Story = {
  args: {
    value: {
      from: new Date(2024, 0, 15), // January 15, 2024
    },
    placeholder: "Pick a date range",
  },
};

export const CustomFormat: Story = {
  args: {
    value: {
      from: new Date(2024, 0, 15),
      to: new Date(2024, 0, 20),
    },
    format: "yyyy-MM-dd",
    placeholder: "Pick a date range",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Pick a date range",
  },
};

export const WithError: Story = {
  args: {
    error: "Please select a valid date range",
    placeholder: "Pick a date range",
  },
};

export const Required: Story = {
  args: {
    id: "required-daterangepicker",
    required: true,
    placeholder: "Pick a date range *",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Small</label>
        <DateRangePicker size="sm" placeholder="Small date range picker" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          Medium (Default)
        </label>
        <DateRangePicker size="md" placeholder="Medium date range picker" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Large</label>
        <DateRangePicker size="lg" placeholder="Large date range picker" />
      </div>
    </div>
  ),
};

export const WithConstraints: Story = {
  args: {
    minDate: new Date(2024, 0, 1), // January 1, 2024
    maxDate: new Date(2024, 11, 31), // December 31, 2024
    disabledDates: [
      new Date(2024, 0, 15), // January 15, 2024
      new Date(2024, 0, 25), // January 25, 2024
    ],
    placeholder: "Pick a date range (2024 only, some dates disabled)",
  },
};

export const WithMaxRange: Story = {
  args: {
    maxRange: 7, // Maximum 7 days
    placeholder: "Pick a date range (max 7 days)",
  },
};

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
    const [error, setError] = useState<string>("");

    const handleRangeChange = (range: DateRange | undefined) => {
      setSelectedRange(range);

      // Example validation
      if (range?.from && range?.to) {
        const daysDiff = Math.ceil(
          (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24),
        );
        if (daysDiff > 30) {
          setError("Date range cannot exceed 30 days");
        } else if (range.to < new Date()) {
          setError("End date cannot be in the past");
        } else {
          setError("");
        }
      } else {
        setError("");
      }
    };

    return (
      <div className="space-y-4">
        <DateRangePicker
          value={selectedRange}
          onChange={handleRangeChange}
          error={error}
          placeholder="Select your vacation dates"
          maxRange={30}
        />
        {selectedRange?.from && selectedRange?.to && (
          <div className="p-3 bg-muted rounded-md">
            <p className="text-sm">
              <strong>Selected Range:</strong>
              <br />
              {selectedRange.from.toLocaleDateString()} -{" "}
              {selectedRange.to.toLocaleDateString()}
              <br />
              <strong>Duration:</strong>{" "}
              {Math.ceil(
                (selectedRange.to.getTime() - selectedRange.from.getTime()) /
                  (1000 * 60 * 60 * 24),
              )}{" "}
              days
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const BookingForm: Story = {
  render: function BookingFormStory() {
    const [formData, setFormData] = useState({
      checkIn: undefined as Date | undefined,
      checkOut: undefined as Date | undefined,
      stayRange: undefined as DateRange | undefined,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleCheckInChange = (date: Date | undefined) => {
      setFormData((prev) => ({ ...prev, checkIn: date }));

      // Clear checkout if it's before the new check-in date
      if (date && formData.checkOut && formData.checkOut <= date) {
        setFormData((prev) => ({ ...prev, checkOut: undefined }));
      }

      // Validation
      const newErrors = { ...errors };
      if (!date) {
        newErrors.checkIn = "Check-in date is required";
      } else if (date < new Date()) {
        newErrors.checkIn = "Check-in date cannot be in the past";
      } else {
        delete newErrors.checkIn;
      }
      setErrors(newErrors);
    };

    const handleStayRangeChange = (range: DateRange | undefined) => {
      setFormData((prev) => ({ ...prev, stayRange: range }));

      // Validation
      const newErrors = { ...errors };
      if (!range?.from || !range?.to) {
        newErrors.stayRange = "Please select both start and end dates";
      } else {
        const daysDiff = Math.ceil(
          (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24),
        );
        if (daysDiff < 1) {
          newErrors.stayRange = "Stay must be at least 1 day";
        } else if (daysDiff > 14) {
          newErrors.stayRange = "Stay cannot exceed 14 days";
        } else {
          delete newErrors.stayRange;
        }
      }
      setErrors(newErrors);
    };

    return (
      <div className="space-y-6 w-96">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Check-in Date *
            </label>
            <DateRangePicker
              id="booking-checkin"
              value={formData.checkIn ? { from: formData.checkIn } : undefined}
              onChange={(range) => handleCheckInChange(range?.from)}
              error={errors.checkIn}
              placeholder="Select check-in date"
              minDate={new Date()}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Stay Duration *
            </label>
            <DateRangePicker
              id="booking-stay"
              value={formData.stayRange}
              onChange={handleStayRangeChange}
              error={errors.stayRange}
              placeholder="Select stay dates"
              minDate={new Date()}
              maxRange={14}
              required
            />
          </div>
        </div>

        {formData.stayRange?.from && formData.stayRange?.to && (
          <div className="p-4 bg-primary/10 rounded-md">
            <h3 className="font-medium mb-2">Booking Summary</h3>
            <div className="text-sm space-y-1">
              <p>
                <strong>Check-in:</strong>{" "}
                {formData.stayRange.from.toLocaleDateString()}
              </p>
              <p>
                <strong>Check-out:</strong>{" "}
                {formData.stayRange.to.toLocaleDateString()}
              </p>
              <p>
                <strong>Duration:</strong>{" "}
                {Math.ceil(
                  (formData.stayRange.to.getTime() -
                    formData.stayRange.from.getTime()) /
                    (1000 * 60 * 60 * 24),
                )}{" "}
                nights
              </p>
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          With Custom ARIA Label
        </label>
        <DateRangePicker
          aria-label="Select your vacation date range"
          placeholder="Choose vacation dates"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          With Description
        </label>
        <DateRangePicker
          placeholder="Select date range"
          aria-describedby="daterange-help"
        />
        <p id="daterange-help" className="text-sm text-muted-foreground mt-1">
          Use arrow keys to navigate the calendar when open. Select start date
          first, then end date.
        </p>
      </div>
    </div>
  ),
};
