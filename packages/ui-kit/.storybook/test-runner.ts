import type { TestRunnerConfig } from "@storybook/test-runner";
import { injectAxe, checkA11y } from "axe-playwright";
import { getStoryContext } from "@storybook/test-runner";

const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page, context) {
    // Get the story context so we can access parameters
    const storyContext = await getStoryContext(page, context);

    // Skip entire test if explicitly disabled for a story
    if (storyContext.parameters?.["test-runner"]?.skip) {
      console.log(
        `Skipping test for story ${context.id} due to test-runner skip parameter`,
      );
      return;
    }

    // Temporarily disabled components due to accessibility violations
    // See docs/accessibility-backlog.md for details and tracking
    const temporarilyDisabledComponents = [
      "sidebar",
      "collapsible",
      "scrollarea",
      "inputotp",
      "sonner",
      "pagination",
      "switch",
      "table",
    ];

    // Check if this story belongs to a temporarily disabled component
    const storyId = context.id.toLowerCase();
    const isTemporarilyDisabled = temporarilyDisabledComponents.some(
      (component) => storyId.includes(component),
    );

    if (isTemporarilyDisabled) {
      console.log(
        `⏭️  Temporarily skipping a11y test for ${context.id} - tracked in accessibility-backlog.md`,
      );
      return;
    }

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
    // The selector #storybook-root is the default container for Storybook stories
    const element = storyContext.parameters?.a11y?.element ?? "#storybook-root";

    // Configure axe to disable page-level rules for component testing
    await page.evaluate(() => {
      window.axe.configure({
        rules: [
          { id: "landmark-one-main", enabled: false }, // Components don't need main landmarks
          { id: "page-has-heading-one", enabled: false }, // Components don't need page headings
          { id: "region", enabled: false }, // Components don't need to be in landmarks
        ],
      });
    });

    // Run the accessibility tests
    try {
      await checkA11y(page, element, {
        detailedReport: true,
        detailedReportOptions: {
          html: true,
        },
        // If any violations are found, the test will fail
        includedImpacts: ["critical", "serious", "moderate", "minor"],
      });
    } catch (error) {
      // Log detailed violation information before re-throwing
      console.error(`Accessibility violations for story ${context.id}:`);
      console.error(`Error message: ${error.message}`);

      // Get detailed violation information
      try {
        const results = await page.evaluate(async () => {
          return await window.axe.run();
        });

        if (results.violations.length > 0) {
          console.error("Detailed violations:");
          results.violations.forEach((violation, index) => {
            console.error(
              `\n${index + 1}. ${violation.id}: ${violation.description}`,
            );
            console.error(`   Impact: ${violation.impact}`);
            violation.nodes.forEach((node, nodeIndex) => {
              console.error(`   Node ${nodeIndex + 1}:`);
              console.error(`     Target: ${JSON.stringify(node.target)}`);
              console.error(`     HTML: ${node.html}`);
              if (node.failureSummary) {
                console.error(`     Failure: ${node.failureSummary}`);
              }
            });
          });
        }
      } catch (detailError) {
        console.error(
          "Could not get detailed violation info:",
          detailError.message,
        );
      }

      throw error;
    }
  },
};

export default config;
