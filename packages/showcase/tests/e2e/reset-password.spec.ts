import { test, expect } from "@playwright/test";

test.describe("Reset Password Flow", () => {
  test("should navigate from login to reset password and back", async ({
    page,
  }) => {
    // Start at the login page
    await page.goto("/login");

    // Verify we're on the login page
    await expect(
      page.getByRole("heading", { name: /welcome back/i }),
    ).toBeVisible();

    // Click the "Forgot Password?" link
    await page.getByRole("button", { name: /forgot password/i }).click();

    // Verify we're now on the reset password page
    await expect(
      page.getByRole("heading", { name: /reset your password/i }),
    ).toBeVisible();
    await expect(
      page.getByText(/enter your email address and we'll send you a link/i),
    ).toBeVisible();

    // Verify the form elements are present
    await expect(page.getByLabel(/email address/i)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /send reset link/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /back to sign in/i }),
    ).toBeVisible();

    // Test form validation - submit empty form
    await page.getByRole("button", { name: /send reset link/i }).click();
    await expect(
      page.getByText(/please enter a valid email address/i),
    ).toBeVisible();

    // Test form validation - invalid email
    await page.getByLabel(/email address/i).fill("invalid-email");
    await page.getByRole("button", { name: /send reset link/i }).click();
    await expect(
      page.getByText(/please enter a valid email address/i),
    ).toBeVisible();

    // Test successful form submission
    await page.getByLabel(/email address/i).fill("user@example.com");
    await page.getByRole("button", { name: /send reset link/i }).click();

    // Verify loading state
    await expect(page.getByRole("button", { name: /sending/i })).toBeVisible();

    // Wait for success message (toast)
    await expect(page.getByText(/reset link sent/i)).toBeVisible({
      timeout: 5000,
    });
    await expect(
      page.getByText(
        /password reset instructions have been sent to user@example.com/i,
      ),
    ).toBeVisible();

    // Verify automatic navigation back to login after success
    await expect(
      page.getByRole("heading", { name: /welcome back/i }),
    ).toBeVisible({ timeout: 5000 });
  });

  test("should navigate back to login using back button", async ({ page }) => {
    // Navigate directly to reset password page
    await page.goto("/reset-password");

    // Verify we're on the reset password page
    await expect(
      page.getByRole("heading", { name: /reset your password/i }),
    ).toBeVisible();

    // Click the back button
    await page.getByRole("button", { name: /back to sign in/i }).click();

    // Verify we're back on the login page
    await expect(
      page.getByRole("heading", { name: /welcome back/i }),
    ).toBeVisible();
  });

  test("should handle direct navigation to reset password page", async ({
    page,
  }) => {
    // Navigate directly to reset password page
    await page.goto("/reset-password");

    // Verify the page loads correctly
    await expect(
      page.getByRole("heading", { name: /reset your password/i }),
    ).toBeVisible();
    await expect(
      page.getByText(/enter your email address and we'll send you a link/i),
    ).toBeVisible();
    await expect(page.getByLabel(/email address/i)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /send reset link/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /back to sign in/i }),
    ).toBeVisible();
  });
});
