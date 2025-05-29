import { test, expect } from "@playwright/test";

test.describe("Showcase Routes", () => {
  test.beforeEach(async ({ page }) => {
    // Start at login page
    await page.goto("/");

    // Login with demo credentials
    await page.fill('input[type="email"]', "admin@example.com");
    await page.fill('input[type="password"]', "admin");
    await page.click('button[type="submit"]');

    // Wait for dashboard to load
    await expect(page.locator("h1")).toContainText("Dashboard");
  });

  test("should navigate to settings page", async ({ page }) => {
    // Click on Settings in navigation
    await page.click('a[href="/settings"]');

    // Verify we're on the settings page
    await expect(page.locator("h1")).toContainText("Settings");
    await expect(page.url()).toContain("/settings");

    // Verify settings form elements are present
    await expect(
      page.locator('input[placeholder="Enter your display name"]'),
    ).toBeVisible();
    await expect(page.locator("select")).toBeVisible();
    await expect(page.locator('input[type="checkbox"]')).toBeVisible();
  });

  test("should navigate to components gallery", async ({ page }) => {
    // Click on Components in navigation
    await page.click('a[href="/components"]');

    // Verify we're on the components page
    await expect(page.locator("h1")).toContainText("Component Gallery");
    await expect(page.url()).toContain("/components");

    // Verify component examples are present
    await expect(page.locator("text=Button")).toBeVisible();
    await expect(page.locator("text=TextInput")).toBeVisible();

    // Test search functionality
    await page.fill('input[placeholder*="Search"]', "Button");
    await expect(page.locator("text=TextInput")).not.toBeVisible();
    await expect(page.locator("text=Button")).toBeVisible();
  });

  test("should show 404 page for invalid routes", async ({ page }) => {
    // Navigate to an invalid route
    await page.goto("/invalid-route");

    // Verify 404 page is shown
    await expect(page.locator("text=404")).toBeVisible();
    await expect(page.locator("text=Page Not Found")).toBeVisible();

    // Test navigation back to dashboard
    await page.click("text=Go to Dashboard");
    await expect(page.locator("h1")).toContainText("Dashboard");
  });

  test("should complete full navigation flow", async ({ page }) => {
    // Start at dashboard
    await expect(page.locator("h1")).toContainText("Dashboard");

    // Navigate to settings
    await page.click('a[href="/settings"]');
    await expect(page.locator("h1")).toContainText("Settings");

    // Navigate to components gallery
    await page.click('a[href="/components"]');
    await expect(page.locator("h1")).toContainText("Component Gallery");

    // Navigate to customers
    await page.click('a[href="/customers"]');
    await expect(page.locator("h1")).toContainText("Customers");

    // Navigate back to dashboard
    await page.click('a[href="/dashboard"]');
    await expect(page.locator("h1")).toContainText("Dashboard");
  });

  test("should not have console errors on any route", async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    // Test all routes
    const routes = ["/dashboard", "/settings", "/components", "/customers"];

    for (const route of routes) {
      await page.goto(route);
      await page.waitForLoadState("networkidle");

      // Wait a bit for any async operations
      await page.waitForTimeout(1000);
    }

    // Check for console errors
    expect(consoleErrors).toEqual([]);
  });
});
