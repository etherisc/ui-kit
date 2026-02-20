---
name: add-form-field
description: Add a new form field component integrated with React Hook Form and Zod validation. Use when creating form fields like TextField, SelectField, DateField, or any new validated input.
---

# Add Form Field to UI Kit

## Architecture

Form fields follow a two-layer pattern:

1. **Primitive** in `components/primitives/` -- standalone input (no form integration)
2. **Field** in `components/form/` -- wraps primitive with `FieldWrapper` for React Hook Form

## Steps

### 1. Create or verify the primitive exists

Check `packages/ui-kit/src/components/primitives/` for existing primitives.
If missing, create one following the `add-component` skill.

### 2. Create the Field component

File: `packages/ui-kit/src/components/form/<Name>Field.tsx`

```typescript
import { FieldValues, Path } from "react-hook-form";
import { FieldWrapper } from "./FieldWrapper";
import type { FieldWrapperProps } from "./FieldWrapper";
import { MyPrimitive } from "../primitives/MyPrimitive";

export type MyFieldProps<TFieldValues extends FieldValues> =
  Omit<MyPrimitiveProps, "value" | "onChange"> &
  Omit<FieldWrapperProps<TFieldValues>, "render"> & {
    name: Path<TFieldValues>;
  };

export function MyField<TFieldValues extends FieldValues>({
  name, label, required, description, ...props
}: MyFieldProps<TFieldValues>) {
  return (
    <FieldWrapper
      name={name}
      label={label}
      required={required}
      description={description}
      render={({ field, fieldState }) => (
        <MyPrimitive
          {...props}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
```

### 3. Export from form barrel

Add to `packages/ui-kit/src/components/form/index.ts`.

### 4. Write tests

Test: renders label, validates with Zod schema, shows error on invalid input.

### 5. Verify

Run `pnpm lint && pnpm test && pnpm build`.
