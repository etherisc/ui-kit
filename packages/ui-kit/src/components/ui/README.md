# ⚠️ DO NOT MODIFY COMPONENTS IN THIS DIRECTORY ⚠️

This directory contains components from [shadcn/ui](https://ui.shadcn.com/), which are meant to be used as-is and not modified directly.

## Why not modify these components?

1. **Updates are blocked**: Modifying these files makes it difficult to update components when new versions are released.
2. **Accessibility regressions**: These components have been designed with accessibility in mind - modifications may break a11y.
3. **Maintenance overhead**: Custom changes create maintenance burden and technical debt.
4. **Integration issues**: Modifications may cause issues with other shadcn components.

## How to update these components

Always use the shadcn CLI to add or update components:

```bash
# Update or reinstall a component
npx shadcn@latest add checkbox --overwrite --yes
```

## How to extend these components

Instead of modifying the base components, use these recommended patterns:

### 1. Composition Pattern

Create new components that use the shadcn components and add your functionality:

```tsx
// ✅ DO THIS: Create a wrapper component
export function AccessibleCheckbox({ label, id, ...props }) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} {...props} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
}
```

### 2. Proper Label Association

Always use labels properly with form components:

```tsx
// ✅ DO THIS: Properly associate labels
<div>
  <Label htmlFor="terms">Accept terms</Label>
  <Checkbox id="terms" />
</div>
```

### 3. Use Description Elements with aria-describedby

For form descriptions and help text:

```tsx
// ✅ DO THIS: Use proper element association
<div>
  <Label htmlFor="email">Email</Label>
  <Input id="email" aria-describedby="email-desc" />
  <p id="email-desc">We'll never share your email.</p>
</div>
```

## Questions & Issues

If you're encountering an issue with these components, or need help extending them properly, please:

1. Check the [shadcn documentation](https://ui.shadcn.com/docs)
2. See the examples in `src/components/examples` directory for proper usage patterns
3. Consult the accessibility guidelines in `docs/ACCESSIBILITY.md`
