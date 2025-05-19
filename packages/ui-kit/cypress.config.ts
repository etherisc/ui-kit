import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:6006', // Storybook default port
        specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
        screenshotOnRunFailure: true,
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
}); 