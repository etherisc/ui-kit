# Task 5.5 Planning: Reset Password Page (AuthShell variant)

## Overview

This task involves implementing a reset password page using the AuthShell layout component. The page should include a form with email input field, validation using React Hook Form and Zod, and proper routing integration in the showcase application.

## Task Breakdown

| Task Description                                    | Definition of Done (DoD)                                                        | Status   |
| --------------------------------------------------- | ------------------------------------------------------------------------------- | -------- |
| Create ResetPasswordPage component using AuthShell  | Component created with proper AuthShell integration and styling                 | complete |
| Implement reset password form with email validation | Form uses React Hook Form + Zod for email validation with proper error handling | complete |
| Add route `/reset-password` to showcase router      | Route properly configured in main.tsx and renders the component                 | complete |
| Create unit tests for form validation               | Vitest tests verify email validation and form submission behavior               | complete |
| Add navigation link from login page                 | Login page includes "Forgot Password?" link to reset password page              | complete |
| Create E2E test for reset password flow             | Playwright test verifies navigation and form interaction                        | complete |
| Update component exports and documentation          | Component properly exported and accessible from ui-kit                          | complete |

## Implementation Notes

- **AuthShell Integration**: Use existing AuthShell component with appropriate width and styling
- **Form Validation**: Use Zod schema for email validation (required field + valid email format)
- **UI/UX**: Follow existing login page patterns for consistency
- **Navigation**: Add link from login page, include back to login link on reset password page
- **Accessibility**: Ensure proper form labeling and error message association

## Technical Requirements

- Form should validate email format and required field
- Submit handler should show success/error toast messages
- Component should be responsive and follow existing design patterns
- Tests should cover both successful submission and validation errors
- E2E test should verify complete user flow from login → reset password → back to login

## Completion Summary

✅ **All tasks completed successfully!**

- **ResetPasswordPage component**: Created using AuthShell with proper styling and responsive design
- **Form validation**: Implemented with React Hook Form + Zod for email validation
- **Routing**: Added `/reset-password` route to showcase application
- **Navigation**: Added "Forgot Password?" link from login page with back navigation
- **Testing**: Created unit tests for form validation and E2E tests for user flow
- **No exports needed**: This is a showcase page, not a UI kit component, so no exports to ui-kit required
