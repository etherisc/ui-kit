import type { TestRunnerConfig } from "@storybook/test-runner";
import { injectAxe, checkA11y } from "axe-playwright";
import { getStoryContext } from "@storybook/test-runner";

const config: TestRunnerConfig = {
  async preVisit(page, context) {
    console.log(`Testing story: ${context.id}`);
    await injectAxe(page);
  },
  async postVisit(page, context) {
    // Get the story context so we can access parameters
    const storyContext = await getStoryContext(page, context);

    // Skip a11y tests if explicitly disabled for a story
    if (storyContext.parameters?.a11y?.disable) {
      return;
    }

    // Configure axe with any story-level rules
    const axeConfig = storyContext.parameters?.a11y?.config;
    if (axeConfig) {
      await page.evaluate((config) => {
        // Window object with axe property is provided by axe-playwright injection
        window.axe.configure(config);
      }, axeConfig);
    }

    // Use the element specified in parameters or default to #storybook-root
    // The selector #storybook-root is more reliable than #root
    const element = storyContext.parameters?.a11y?.element || "#storybook-root";

    // Run the accessibility tests
    await checkA11y(page, element, {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
      // If any violations are found, the test will fail
      includedImpacts: ["critical", "serious", "moderate", "minor"],
    });
  },
};

export default config;
