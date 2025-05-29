# Task 3.4: Sample Showcase - Login Page + Dashboard + Customers Table Route

## Task Description

Implement a sample showcase application that demonstrates the UI-Kit components in action. This includes creating actual application routes with login functionality, a dashboard, and a customers table view using the existing UI components.

## Task Planning

| Task Description                            | Definition of Done (DoD)                                                                                                           | Status   |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------- |
| Set up showcase application structure       | - Showcase app directory structure exists<br>- React Router v7 configured<br>- Basic routing setup complete                        | Complete |
| Create login page using AuthShell           | - Login page renders with AuthShell layout<br>- Login form uses UI-Kit form components<br>- Basic authentication logic implemented | Checking |
| Implement dashboard page using MainLayout   | - Dashboard page renders with MainLayout<br>- Displays summary cards and navigation<br>- Uses existing UI-Kit components           | Open     |
| Create customers table route with DataTable | - Customers page displays using DataTable component<br>- Shows paginated customer data<br>- Navigation from dashboard works        | Open     |
| Add routing and navigation                  | - React Router navigation between pages<br>- Protected routes for authenticated content<br>- Breadcrumb navigation works           | Open     |
| Implement basic authentication state        | - Login/logout functionality<br>- Session persistence<br>- Route protection based on auth state                                    | Open     |
| Add sample data and mock API                | - Customer data generation<br>- Mock authentication endpoints<br>- API integration with DataTable                                  | Open     |
| Create E2E tests                            | - Playwright tests for login flow<br>- Navigation test (login → dashboard → customers)<br>- Tests pass in CI                       | Open     |
| Integrate showcase with UI-Kit build        | - Showcase app builds successfully<br>- Uses published UI-Kit components<br>- No circular dependencies                             | Open     |

## Implementation Details

### 1. Application Structure

Create a sample showcase application that demonstrates the UI-Kit in a realistic scenario:

```
showcase/
  src/
    pages/
      LoginPage.tsx          # Using AuthShell + form components
      DashboardPage.tsx      # Using MainLayout + stats components
      CustomersPage.tsx      # Using MainLayout + DataTable
    components/
      ProtectedRoute.tsx     # Route protection wrapper
      Navigation.tsx         # App navigation using UI-Kit components
    hooks/
      useAuth.tsx           # Authentication state management
    services/
      api.ts                # Mock API for data
      auth.ts               # Authentication logic
    types/
      Customer.ts           # Customer data types
      Auth.ts               # Authentication types
```

### 2. Pages Implementation

**Login Page:**

- Use `AuthShell` layout from UI-Kit
- Login form with `TextInput` and `Button` components
- Form validation using React Hook Form + Zod
- Error handling with `Toast` notifications
- Responsive design following UI-Kit patterns

**Dashboard Page:**

- Use `MainLayout` with navigation and breadcrumbs
- Summary cards showing customer statistics
- Quick action buttons using UI-Kit buttons
- Navigation to customers page
- Use `StatusBadge` for status indicators

**Customers Page:**

- Use `MainLayout` for consistent navigation
- `DataTable` component showing customer list
- Pagination, sorting, and filtering
- Customer actions (view, edit buttons)
- Breadcrumb navigation

### 3. Technical Requirements

**Routing:**

- React Router v7 with data loaders
- Protected routes requiring authentication
- Proper error boundaries and 404 handling
- Clean URL structure

**State Management:**

- Authentication state using Zustand (from UI-Kit)
- Customer data fetching and caching
- Form state management with React Hook Form

**Data Layer:**

- Mock customer data (50+ records)
- Simulated API responses with realistic delays
- Pagination and filtering logic
- Authentication simulation

### 4. Testing Strategy

**E2E Tests (Playwright):**

- Login flow: invalid credentials → error, valid credentials → dashboard
- Navigation: login → dashboard → customers → back to dashboard
- DataTable interactions: pagination, sorting
- Logout functionality
- Responsive behavior testing

**Integration:**

- Component integration with real data
- Form submission and validation flows
- Navigation state persistence
- Error handling scenarios

## Definition of Done

**Original DoD:** "E2E Playwright run (login → dashboard) green in CI."

**Expanded DoD:**

- ✅ Showcase application builds and runs without errors
- ✅ Login page functional with form validation
- ✅ Dashboard page displays with navigation
- ✅ Customers page shows DataTable with pagination
- ✅ E2E Playwright tests pass: login → dashboard → customers flow
- ✅ All UI-Kit components integrated properly
- ✅ Responsive design works on different screen sizes
- ✅ Authentication flow works end-to-end
- ✅ CI pipeline runs tests successfully

## Technical Dependencies

### Required UI-Kit Components:

- `AuthShell` (login page layout)
- `AppShell` (dashboard and customers layout)
- `DataTable` (customers table)
- `TextInput`, `Button` (forms)
- `Toast` (notifications)
- `StatusBadge` (status indicators)

### External Dependencies:

- React Router v7 (routing)
- React Hook Form + Zod (forms)
- Playwright (E2E testing)
- Mock data generation utilities

### Infrastructure:

- Vite setup for showcase app
- Build integration with UI-Kit
- CI/CD pipeline updates
- Development server configuration

## Success Metrics

1. **Functionality:** All user flows work end-to-end
2. **Performance:** Pages load within 2 seconds
3. **Accessibility:** axe-core tests pass on all pages
4. **Testing:** 100% E2E test coverage for critical paths
5. **Integration:** UI-Kit components work seamlessly
6. **Maintainability:** Clean, documented code structure

## Next Steps After Completion

This showcase will serve as:

- Reference implementation for UI-Kit usage
- Testing ground for new components
- Demo for stakeholders and users
- Foundation for future showcase extensions (task 3.5: i18n, task 3.6: SQLite integration)
