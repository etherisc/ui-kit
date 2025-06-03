# Select Component Usage Guide

This guide explains how to import and use the **Select component** from the `@etherisc/ui-kit` package.

## 📦 Package Version

The Select component is available starting from **version 0.2.1** of `@etherisc/ui-kit`.

```bash
npm install @etherisc/ui-kit@^0.2.1
```

## 🚀 Basic Import

### JavaScript/JSX

```jsx
import { Select } from "@etherisc/ui-kit";

function MyComponent() {
  return (
    <Select
      label="Country"
      options={[
        { value: "us", label: "United States" },
        { value: "ca", label: "Canada" },
        { value: "uk", label: "United Kingdom" },
      ]}
      placeholder="Choose a country"
    />
  );
}
```

### TypeScript

```tsx
import { Select } from "@etherisc/ui-kit";
import type { ComponentProps } from "react";

// Use built-in React types for props
type SelectProps = ComponentProps<typeof Select>;

function MyComponent() {
  const handleChange = (value: string) => {
    console.log("Selected:", value);
  };

  return (
    <Select
      label="Country"
      options={[
        { value: "us", label: "United States" },
        { value: "ca", label: "Canada" },
        { value: "uk", label: "United Kingdom" },
      ]}
      placeholder="Choose a country"
      onChange={handleChange}
    />
  );
}
```

## 🔧 Props Interface

The Select component accepts the following props:

```tsx
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  // Required props
  label: string;
  options: SelectOption[];

  // Optional props
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  helperText?: string;

  // Styling props
  className?: string;

  // React props
  id?: string;
  name?: string;
}
```

## 📝 Usage Examples

### 1. Basic Select with Options

```jsx
import { Select } from "@etherisc/ui-kit";

function BasicSelect() {
  return (
    <Select
      label="Priority Level"
      options={[
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
        { value: "urgent", label: "Urgent" },
      ]}
      placeholder="Select priority"
    />
  );
}
```

### 2. Controlled Select with State

```jsx
import { useState } from "react";
import { Select } from "@etherisc/ui-kit";

function ControlledSelect() {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (value) => {
    setSelectedValue(value);
    console.log("Selected value:", value);
  };

  return (
    <Select
      label="Department"
      value={selectedValue}
      onChange={handleChange}
      options={[
        { value: "engineering", label: "Engineering" },
        { value: "design", label: "Design" },
        { value: "product", label: "Product Management" },
        { value: "marketing", label: "Marketing" },
      ]}
      placeholder="Choose department"
    />
  );
}
```

### 3. Select with Error State

```jsx
import { Select } from "@etherisc/ui-kit";

function SelectWithError() {
  return (
    <Select
      label="Required Field"
      options={[
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
      ]}
      placeholder="Please select an option"
      required
      error="This field is required"
      helperText="Please choose one of the available options"
    />
  );
}
```

### 4. Select with Disabled Options

```jsx
import { Select } from "@etherisc/ui-kit";

function SelectWithDisabledOptions() {
  return (
    <Select
      label="Subscription Plan"
      options={[
        { value: "free", label: "Free Plan" },
        { value: "basic", label: "Basic Plan" },
        { value: "premium", label: "Premium Plan" },
        { value: "enterprise", label: "Enterprise Plan", disabled: true },
      ]}
      placeholder="Choose a plan"
      helperText="Enterprise plan coming soon!"
    />
  );
}
```

## 🎯 Integration with React Hook Form

The Select component works seamlessly with React Hook Form:

```tsx
import { useForm, Controller } from "react-hook-form";
import { Select, Button } from "@etherisc/ui-kit";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  country: z.string().min(1, "Please select a country"),
  category: z.string().min(1, "Please select a category"),
});

type FormData = z.infer<typeof schema>;

function FormWithSelect() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      country: "",
      category: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            label="Country"
            options={[
              { value: "us", label: "United States" },
              { value: "ca", label: "Canada" },
              { value: "uk", label: "United Kingdom" },
            ]}
            placeholder="Select country"
            error={errors.country?.message}
          />
        )}
      />

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            label="Category"
            options={[
              { value: "tech", label: "Technology" },
              { value: "finance", label: "Finance" },
              { value: "health", label: "Healthcare" },
            ]}
            placeholder="Select category"
            error={errors.category?.message}
          />
        )}
      />

      <Button type="submit" intent="primary">
        Submit
      </Button>
    </form>
  );
}
```

## 🎨 Styling and Layout

The Select component follows the design system and doesn't require custom styling. For layout, use Tailwind utility classes:

```jsx
import { Select } from "@etherisc/ui-kit";

function StyledSelect() {
  return (
    <div className="max-w-md space-y-4">
      <Select
        label="Full Width Select"
        options={[
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
        ]}
        placeholder="This select takes full width"
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Left Select"
          options={[
            { value: "left1", label: "Left Option 1" },
            { value: "left2", label: "Left Option 2" },
          ]}
          placeholder="Left"
        />

        <Select
          label="Right Select"
          options={[
            { value: "right1", label: "Right Option 1" },
            { value: "right2", label: "Right Option 2" },
          ]}
          placeholder="Right"
        />
      </div>
    </div>
  );
}
```

## ❗ Important Notes

1. **Required Props**: `label` and `options` are required props
2. **Option Format**: Each option must have `value` and `label` properties
3. **TypeScript**: The component is fully typed - TypeScript will help catch prop errors
4. **Accessibility**: The component is built with accessibility in mind using Radix UI primitives
5. **Styling**: Use layout utilities only - avoid overriding component styles directly

## 🐛 Common Issues & Solutions

### Issue: "Select is not exported"

**Solution**: Ensure you're using `@etherisc/ui-kit` version 0.2.1 or later:

```bash
npm install @etherisc/ui-kit@latest
```

### Issue: TypeScript errors with props

**Solution**: Use the built-in React types:

```tsx
import type { ComponentProps } from "react";
import { Select } from "@etherisc/ui-kit";

type SelectProps = ComponentProps<typeof Select>;
```

### Issue: Options not showing

**Solution**: Ensure each option has both `value` and `label`:

```jsx
// ❌ Incorrect
options={['option1', 'option2']}

// ✅ Correct
options={[
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' }
]}
```

## 📚 Related Components

Consider using these related components from the same package:

- `SelectField` - Pre-configured Select with Form integration
- `ComboBox` - For searchable/filterable select options
- `RadioGroup` - For single selection with visible options
- `Checkbox` - For multiple selection scenarios

## 🆘 Need Help?

- Check the [Storybook documentation](../packages/ui-kit/README.md) for interactive examples
- Review the [complete setup guide](./AI-SETUP.md) for project integration
- Look at existing usage in the codebase for real-world examples
