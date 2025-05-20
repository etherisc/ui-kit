// Simple script to test that axe-core detects accessibility violations
// Run with: node scripts/test-a11y-violation.js
/* eslint-disable no-console, no-undef */

import { chromium } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

async function runA11yTest() {
    console.log('Starting accessibility test...');

    // Launch a browser
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Create a simple HTML page with an accessibility violation
    await page.setContent(`
    <html>
      <body>
        <h1>Accessibility Test</h1>
        <button style="background-color: blue; color: blue;">
          Low Contrast Text Button
        </button>
        <img src="nonexistent.jpg" />
      </body>
    </html>
  `);

    // Inject axe
    await injectAxe(page);

    // Try/catch to show the violations
    try {
        console.log('Running axe-core tests...');
        // This should fail due to accessibility violations
        await checkA11y(page, 'body', {
            detailedReport: true,
            detailedReportOptions: {
                html: true,
            },
        });
        console.log('✅ No violations found (this should not happen)');
    } catch (error) {
        console.log('❌ Accessibility violations detected (expected)');
        console.log('\nViolation details:');

        // Extract and display violation information
        if (error.message.includes('Found')) {
            const violations = error.message.split('Found ')[1].split(' accessibility violations')[0];
            console.log(`Found ${violations} accessibility violations`);

            // Extract specific violations if possible
            const violationMatches = error.message.match(/Impact: (critical|serious|moderate|minor).*?Rule: ([a-z-]+)/gs);
            if (violationMatches) {
                violationMatches.forEach(match => {
                    console.log(`\n${match.trim()}`);
                });
            }
        } else {
            console.log(error.message);
        }
    }

    // Close the browser
    await browser.close();
}

runA11yTest().catch(error => {
    console.error('Test failed unexpectedly:', error);
    process.exit(1);
}); 