# Task 3.6: SQLite seed script – generate 100 customers & 2 users; hook `pnpm run seed` in showcase

## Task Reference

**Task ID**: 3.6  
**Sprint**: 3 - Data layer & Main layouts  
**Objective**: SQLite seed script – generate 100 customers & 2 users; hook `pnpm run seed` in showcase  
**DoD**: Script executes without error; Playwright test logs in with `admin` credentials, verifies 100 customers paginated

## Applicable Rules

- **@coding.mdc** - General coding workflow, task planning, feature branch creation, PR process
- **@gitflow_rules.mdc** - Git workflow, branching strategy, commit conventions
- **@react_vite_rules.mdc** - React hooks, component patterns, Vite configuration
- **@typescript_best_practices.mdc** - Type safety, strict mode, proper imports
- **@components.mdc** - Component implementation patterns and structure

## Task Breakdown

| Task Description                    | DoD (Definition of Done)                                                                                                  | Status   |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------- |
| **Setup SQLite database**           | SQLite database file created with proper schema for customers and users tables                                            | Complete |
| **Create database schema**          | SQL schema defines customers table (id, name, email, phone, address, etc.) and users table (id, username, password, role) | Complete |
| **Implement seed script**           | Node.js script generates 100 realistic customers and 2 users (admin, user) with proper data types                         | Complete |
| **Add faker.js for realistic data** | Install faker.js and generate realistic customer data (names, emails, addresses, phone numbers)                           | Complete |
| **Create admin and regular user**   | Seed script creates admin user with credentials and regular user for testing                                              | Complete |
| **Hook script in showcase package** | `pnpm run seed` command available in showcase package.json and executes successfully                                      | Complete |
| **Update showcase to use SQLite**   | Showcase app connects to SQLite database and displays customer data from database                                         | Complete |
| **Create database utilities**       | Helper functions for database connection, queries, and data access in showcase                                            | Complete |
| **Add Playwright E2E test**         | Test logs in with admin credentials and verifies 100 customers are displayed with pagination                              | Complete |
| **Error handling and validation**   | Script handles errors gracefully and validates data before insertion                                                      | Complete |

## Technical Implementation Plan

### 1. Database Setup

- Install SQLite dependencies (`sqlite3`, `better-sqlite3`)
- Create database schema with customers and users tables
- Set up database connection utilities

### 2. Seed Script Implementation

- Install `@faker-js/faker` for realistic test data generation
- Create seed script that generates:
  - 100 customers with realistic data (name, email, phone, address, company, etc.)
  - 2 users: admin (username: admin, password: admin) and regular user
- Implement proper data validation and error handling

### 3. Showcase Integration

- Add database connection to showcase app
- Update customer data source from mock data to SQLite database
- Implement pagination for customer list
- Add authentication system for login functionality

### 4. Testing & Validation

- Create Playwright E2E test for login and customer verification
- Ensure script runs without errors
- Validate data integrity and pagination functionality

## Files to be Created/Modified

### New Files:

- `packages/showcase/scripts/seed.js` or `packages/showcase/scripts/seed.ts`
- `packages/showcase/src/database/schema.sql`
- `packages/showcase/src/database/connection.ts`
- `packages/showcase/src/database/queries.ts`
- `packages/showcase/database.sqlite` (generated)
- `packages/showcase/tests/e2e/admin-login.spec.ts`

### Modified Files:

- `packages/showcase/package.json` (add seed script and dependencies)
- `packages/showcase/src/pages/CustomersPage.tsx` (connect to database)
- `packages/showcase/src/pages/LoginPage.tsx` (implement authentication)
- `packages/showcase/src/types/` (add database types)

## Database Schema Design

### Customers Table:

```sql
CREATE TABLE customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  country TEXT,
  company TEXT,
  status TEXT DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Users Table:

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  email TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Success Criteria

1. ✅ `pnpm run seed` executes without errors in showcase package
2. ✅ Database contains exactly 100 customers with realistic data
3. ✅ Database contains 2 users (admin and regular user)
4. ✅ Showcase app displays customers from SQLite database
5. ✅ Pagination works correctly with database data
6. ✅ Admin login functionality works
7. ✅ Playwright test successfully logs in and verifies customer count
8. ✅ All data is properly typed with TypeScript

## Risk Mitigation

- **Database file location**: Ensure database file is in appropriate location and gitignored if needed
- **Data consistency**: Implement proper data validation and constraints
- **Performance**: Ensure pagination is efficient with database queries
- **Security**: Use proper password hashing for user accounts
- **Cross-platform**: Ensure SQLite works across different operating systems
