import { test, expect } from '@playwright/test';

test.describe('AppShell Component', () => {
    test('renders correctly in desktop view', async ({ page }) => {
        // Navigate to the AppShell story in Storybook
        await page.goto('http://localhost:6006/?path=/story/layout-appshell-appshell--default');

        // Wait for the AppShell to be visible
        await page.waitForSelector('div[class*="flex flex-col h-screen"]');

        // Verify the TopBar is visible
        await expect(page.locator('header')).toBeVisible();

        // Verify the SideNav is visible and not collapsed by default
        const sideNav = page.locator('nav[aria-label="Side navigation"]');
        await expect(sideNav).toBeVisible();
        await expect(sideNav).toHaveAttribute('data-collapsed', 'false');

        // Verify content is visible
        await expect(page.locator('main')).toBeVisible();

        // Take a screenshot for visual testing
        await page.screenshot({ path: 'test-results/appshell-desktop.png' });
    });

    test('renders correctly in mobile view', async ({ page }) => {
        // Set viewport to mobile size
        await page.setViewportSize({ width: 375, height: 667 });

        // Navigate to the AppShell story in Storybook
        await page.goto('http://localhost:6006/?path=/story/layout-appshell-appshell--mobile');

        // Wait for the AppShell to be visible
        await page.waitForSelector('div[class*="flex flex-col h-screen"]');

        // Verify the TopBar is visible
        await expect(page.locator('header')).toBeVisible();

        // In mobile view, the SideNav should be collapsed by default
        const sideNav = page.locator('nav[aria-label="Side navigation"]');
        await expect(sideNav).toBeVisible();
        await expect(sideNav).toHaveAttribute('data-collapsed', 'true');

        // Take a screenshot for visual testing
        await page.screenshot({ path: 'test-results/appshell-mobile.png' });
    });

    test('SideNav collapses when toggle is clicked', async ({ page }) => {
        // Navigate to the AppShell story in Storybook
        await page.goto('http://localhost:6006/?path=/story/layout-appshell-appshell--default');

        // Wait for the AppShell to be visible
        await page.waitForSelector('div[class*="flex flex-col h-screen"]');

        // Verify SideNav is expanded initially
        const sideNav = page.locator('nav[aria-label="Side navigation"]');
        await expect(sideNav).toHaveAttribute('data-collapsed', 'false');

        // Click the collapse toggle button
        await page.click('button[aria-label="Toggle navigation"]');

        // Verify SideNav is now collapsed
        await expect(sideNav).toHaveAttribute('data-collapsed', 'true');

        // Take a screenshot for visual testing
        await page.screenshot({ path: 'test-results/appshell-collapsed.png' });
    });
}); 