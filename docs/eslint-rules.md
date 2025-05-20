# ESLint Rules

This document describes the custom ESLint rules used in the UI Kit project.

## `ui-kit-rules/named-effect-with-cleanup`

Enforces that all `useEffect` hooks:

1. Use a named function (not an arrow function or anonymous function)
2. Include a cleanup function

### Why?

- **Named functions** make it easier to understand what an effect is doing at a glance
- **Cleanup functions** are essential for preventing memory leaks and side effects when components unmount

### Good Examples

```jsx
// Good: Named function with cleanup
useEffect(
  function setupSubscription() {
    const subscription = api.subscribe();
    return function cleanupSubscription() {
      subscription.unsubscribe();
    };
  },
  [api],
);

// Good: Named external function with cleanup
function setupListeners() {
  window.addEventListener("resize", handleResize);
  return function cleanupListeners() {
    window.removeEventListener("resize", handleResize);
  };
}
useEffect(setupListeners, []);
```

### Bad Examples

```jsx
// Bad: Arrow function
useEffect(() => {
  document.title = "New Page";
  // Missing cleanup
}, []);

// Bad: Anonymous function
useEffect(function () {
  const timer = setInterval(tick, 1000);
  // Should return a cleanup function to clear the interval
}, []);

// Bad: Arrow function with cleanup (still bad because of arrow function)
useEffect(() => {
  const timer = setInterval(tick, 1000);
  return () => clearInterval(timer);
}, []);
```
