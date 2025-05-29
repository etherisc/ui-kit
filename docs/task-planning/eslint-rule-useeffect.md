# ESLint Rule for useEffect - Task Planning

## Task Description

| Task Description                                                            | DoD (Definition of Done)                                           | Status   |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------ | -------- |
| Implement ESLint rule that enforces named `useEffect` and cleanup functions | Failing example in test repo triggers lint error; real code passes | Complete |

## Implementation Plan

1. Create a custom ESLint rule that:

   - Detects React's `useEffect` hook usage
   - Verifies that the first argument is a named function (not an inline arrow function)
   - Ensures the function includes a return statement with a cleanup function

2. Test the rule with:

   - Examples that should pass (named function with cleanup)
   - Examples that should fail (inline function or missing cleanup)

3. Add the rule to the project's ESLint configuration

4. Document the rule and usage patterns in a README or documentation

## Technical Details

- We'll need to create a custom ESLint plugin
- The rule will use AST parsing to detect useEffect usage patterns
- The configuration will be added to the existing ESLint setup

## Timeline

- Setup custom ESLint plugin: 1 hour
- Implement rule logic: 2 hours
- Test and verify rule functionality: 1 hour
- Documentation: 30 minutes
