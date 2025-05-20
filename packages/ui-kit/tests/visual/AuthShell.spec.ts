import { test, expect } from '@playwright/test';

test.describe('AuthShell Layout Visual Tests', () => {
    test('Default AuthShell layout appears correctly', async ({ page }) => {
        // Navigate to the Default AuthShell story
        await page.goto('/iframe.html?args=&id=layout-authshell--default&viewMode=story');

        // Wait for the content to be visible
        await page.waitForSelector('.max-w-md');

        // Take a screenshot for visual comparison
        const screenshot = await page.screenshot();

        // Compare with baseline (first run will automatically create the baseline)
        expect(screenshot).toMatchSnapshot('authshell-default.png');
    });

    test('AuthShell with Footer appears correctly', async ({ page }) => {
        // Navigate to the WithFooter AuthShell story
        await page.goto('/iframe.html?args=&id=layout-authshell--with-footer&viewMode=story');

        // Wait for the content to be visible
        await page.waitForSelector('.max-w-md');

        // Take a screenshot for visual comparison
        const screenshot = await page.screenshot();

        // Compare with baseline (first run will automatically create the baseline)
        expect(screenshot).toMatchSnapshot('authshell-with-footer.png');
    });

    test('Small variant of AuthShell appears correctly', async ({ page }) => {
        // Navigate to the Small AuthShell story
        await page.goto('/iframe.html?args=&id=layout-authshell--small&viewMode=story');

        // Wait for the content to be visible
        await page.waitForSelector('.max-w-sm');

        // Take a screenshot for visual comparison
        const screenshot = await page.screenshot();

        // Compare with baseline (first run will automatically create the baseline)
        expect(screenshot).toMatchSnapshot('authshell-small.png');
    });

    test('Large variant of AuthShell appears correctly', async ({ page }) => {
        // Navigate to the Large AuthShell story
        await page.goto('/iframe.html?args=&id=layout-authshell--large&viewMode=story');

        // Wait for the content to be visible
        await page.waitForSelector('.max-w-lg');

        // Take a screenshot for visual comparison
        const screenshot = await page.screenshot();

        // Compare with baseline (first run will automatically create the baseline)
        expect(screenshot).toMatchSnapshot('authshell-large.png');
    });
}); 