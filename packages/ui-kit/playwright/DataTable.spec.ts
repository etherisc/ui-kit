import { test, expect } from '@playwright/test';

test.describe('DataTable Component', () => {
    test('pagination functionality works', async ({ page }) => {
        // Navigate to the DataTable story in Storybook
        await page.goto('http://localhost:6006/?path=/story/data-display-datatable--default');

        // Wait for the table to be visible
        await page.waitForSelector('table');

        // Check if we're on page 1
        await expect(page.locator('text=Page 1 of')).toBeVisible();

        // Verify the first row contains "Name 1"
        await expect(page.locator('tbody tr:first-child td:nth-child(2)')).toContainText('Name 1');

        // Click the "Next page" button
        await page.click('button[aria-label="Next page"]');

        // Check if we're on page 2
        await expect(page.locator('text=Page 2 of')).toBeVisible();

        // Verify the first row on page 2 no longer contains "Name 1" and instead has "Name 11"
        await expect(page.locator('tbody tr:first-child td:nth-child(2)')).not.toContainText('Name 1');
        await expect(page.locator('tbody tr:first-child td:nth-child(2)')).toContainText('Name 11');
    });
}); 