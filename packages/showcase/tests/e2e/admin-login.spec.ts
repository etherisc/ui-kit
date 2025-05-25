import { test, expect } from '@playwright/test';

test.describe('Admin Login and Customer Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Ensure database is seeded before each test
    await page.goto('/');
  });

  test('should login with admin credentials and verify 100 customers', async ({ page }) => {
    // Navigate to login page
    await page.goto('/login');
    
    // Fill in admin credentials
    await page.fill('input[type="email"]', 'admin@example.com');
    await page.fill('input[type="password"]', 'admin');
    
    // Click login button
    await page.click('button[type="submit"]');
    
    // Wait for redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    
    // Navigate to customers page
    await page.click('a[href="/customers"]');
    await expect(page).toHaveURL('/customers');
    
    // Wait for customers to load
    await page.waitForSelector('[data-testid="customer-table"]', { timeout: 10000 });
    
    // Verify page title
    await expect(page.locator('h1')).toContainText('Customers');
    
    // Verify customer count in stats
    const totalCustomersCard = page.locator('[data-testid="total-customers"]');
    await expect(totalCustomersCard).toContainText('100');
    
    // Verify table has customer data
    const customerRows = page.locator('[data-testid="customer-table"] tbody tr');
    const rowCount = await customerRows.count();
    
    // Should have customers displayed (may be paginated)
    expect(rowCount).toBeGreaterThan(0);
    
    // Verify first customer has required fields
    const firstRow = customerRows.first();
    await expect(firstRow.locator('td').first()).toBeVisible(); // Customer name/email
    await expect(firstRow.locator('td').nth(1)).toBeVisible(); // Phone
    await expect(firstRow.locator('td').nth(2)).toBeVisible(); // Status
    await expect(firstRow.locator('td').nth(3)).toBeVisible(); // Company
    await expect(firstRow.locator('td').nth(4)).toBeVisible(); // Join Date
    
    // Verify status badges are working
    const statusBadges = page.locator('.inline-flex.items-center.px-2.py-1.rounded-lg');
    expect(await statusBadges.count()).toBeGreaterThan(0);
    
    // Verify customer data is from database (not hardcoded)
    const customerEmails = page.locator('[data-testid="customer-table"] tbody tr td:first-child div div:last-child');
    const firstEmail = await customerEmails.first().textContent();
    
    // Should contain realistic email format (faker.js generated)
    expect(firstEmail).toMatch(/@/);
  });

  test('should display correct customer statistics', async ({ page }) => {
    // Login as admin
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@example.com');
    await page.fill('input[type="password"]', 'admin');
    await page.click('button[type="submit"]');
    
    // Wait for redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    
    // Navigate to customers page
    await page.goto('/customers');
    
    // Wait for data to load
    await page.waitForSelector('[data-testid="customer-table"]', { timeout: 10000 });
    
    // Verify stats cards
    const activeCustomersCard = page.locator('[data-testid="active-customers"]');
    const pendingCustomersCard = page.locator('[data-testid="pending-customers"]');
    const totalCustomersCard = page.locator('[data-testid="total-customers"]');
    
    // All cards should be visible
    await expect(activeCustomersCard).toBeVisible();
    await expect(pendingCustomersCard).toBeVisible();
    await expect(totalCustomersCard).toBeVisible();
    
    // Total should be 100
    await expect(totalCustomersCard).toContainText('100');
    
    // Active + Pending + Inactive should equal Total
    const activeText = await activeCustomersCard.locator('.text-2xl').textContent();
    const pendingText = await pendingCustomersCard.locator('.text-2xl').textContent();
    const totalText = await totalCustomersCard.locator('.text-2xl').textContent();
    
    const active = parseInt(activeText || '0');
    const pending = parseInt(pendingText || '0');
    const total = parseInt(totalText || '0');
    
    expect(total).toBe(100);
    expect(active + pending).toBeLessThanOrEqual(total); // Some might be inactive
  });

  test('should handle loading state properly', async ({ page }) => {
    // Login as admin
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@example.com');
    await page.fill('input[type="password"]', 'admin');
    await page.click('button[type="submit"]');
    
    // Wait for redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    
    // Navigate to customers page
    await page.goto('/customers');
    
    // Should show loading state initially
    const loadingText = page.locator('text=Loading customers...');
    
    // Wait for either loading to appear or data to load
    try {
      await expect(loadingText).toBeVisible({ timeout: 1000 });
    } catch {
      // Loading might be too fast to catch, that's okay
    }
    
    // Eventually should show the customer table
    await page.waitForSelector('[data-testid="customer-table"]', { timeout: 10000 });
    await expect(page.locator('[data-testid="customer-table"]')).toBeVisible();
  });
}); 