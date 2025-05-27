import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DatePicker } from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "Components/Primitives/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A date picker component with calendar dropdown, built on React DayPicker and date-fns.",
      },
    },
    a11y: {
      disable: false,
    },
  },
  argTypes: {
    value: {
      control: false,
      description: "The selected date value",
    },
    onChange: {
      action: "changed",
      description: "Callback fired when the date changes",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no date is selected",
    },
    disabled: {
      control: "boolean",
      description: "Whether the date picker is disabled",
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
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    placeholder: "Pick a date",
  },
};

export const WithValue: Story = {
  args: {
    value: new Date(2024, 0, 15), // January 15, 2024
    placeholder: "Pick a date",
  },
};

export const CustomFormat: Story = {
  args: {
    value: new Date(2024, 0, 15),
    format: "yyyy-MM-dd",
    placeholder: "Pick a date",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Pick a date",
  },
};

export const WithError: Story = {
  args: {
    error: "Please select a valid date",
    placeholder: "Pick a date",
  },
};

export const Required: Story = {
  args: {
    required: true,
    placeholder: "Pick a date *",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Small</label>
        <DatePicker size="sm" placeholder="Small date picker" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          Medium (Default)
        </label>
        <DatePicker size="md" placeholder="Medium date picker" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Large</label>
        <DatePicker size="lg" placeholder="Large date picker" />
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
    placeholder: "Pick a date (2024 only, some dates disabled)",
  },
};

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [error, setError] = useState<string>("");

    const handleDateChange = (date: Date | undefined) => {
      setSelectedDate(date);

      // Example validation
      if (date && date > new Date()) {
        setError("Date cannot be in the future");
      } else {
        setError("");
      }
    };

    return (
      <div className="space-y-4">
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          error={error}
          placeholder="Select your birth date"
          maxDate={new Date()}
        />
        {selectedDate && (
          <p className="text-sm text-muted-foreground">
            Selected: {selectedDate.toLocaleDateString()}
          </p>
        )}
      </div>
    );
  },
};

export const FormExample: Story = {
  render: function FormStory() {
    const [formData, setFormData] = useState({
      startDate: undefined as Date | undefined,
      endDate: undefined as Date | undefined,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleStartDateChange = (date: Date | undefined) => {
      setFormData((prev) => ({ ...prev, startDate: date }));

      // Clear end date if it's before the new start date
      if (date && formData.endDate && formData.endDate < date) {
        setFormData((prev) => ({ ...prev, endDate: undefined }));
      }

      // Validation
      const newErrors = { ...errors };
      if (!date) {
        newErrors.startDate = "Start date is required";
      } else {
        delete newErrors.startDate;
      }
      setErrors(newErrors);
    };

    const handleEndDateChange = (date: Date | undefined) => {
      setFormData((prev) => ({ ...prev, endDate: date }));

      // Validation
      const newErrors = { ...errors };
      if (!date) {
        newErrors.endDate = "End date is required";
      } else if (formData.startDate && date < formData.startDate) {
        newErrors.endDate = "End date must be after start date";
      } else {
        delete newErrors.endDate;
      }
      setErrors(newErrors);
    };

    return (
      <div className="space-y-4 w-80">
        <div>
          <label className="block text-sm font-medium mb-2">Start Date *</label>
          <DatePicker
            value={formData.startDate}
            onChange={handleStartDateChange}
            error={errors.startDate}
            placeholder="Select start date"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">End Date *</label>
          <DatePicker
            value={formData.endDate}
            onChange={handleEndDateChange}
            error={errors.endDate}
            placeholder="Select end date"
            minDate={formData.startDate}
            required
          />
        </div>
        {formData.startDate && formData.endDate && (
          <div className="p-3 bg-muted rounded-md">
            <p className="text-sm">
              <strong>Selected Range:</strong>
              <br />
              {formData.startDate.toLocaleDateString()} -{" "}
              {formData.endDate.toLocaleDateString()}
            </p>
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
        <DatePicker
          aria-label="Select your appointment date"
          placeholder="Choose appointment date"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          With Description
        </label>
        <DatePicker placeholder="Select date" aria-describedby="date-help" />
        <p id="date-help" className="text-sm text-muted-foreground mt-1">
          Use arrow keys to navigate the calendar when open
        </p>
      </div>
    </div>
  ),
};
