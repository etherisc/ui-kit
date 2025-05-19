describe('Theme Visual Tests', () => {
    // Test Button component in light and dark mode
    it('Button component - Light Mode', () => {
        // Visit the Storybook directly first
        cy.visit('/');
        cy.contains('Button').should('be.visible');
        cy.log('Storybook is running and accessible');

        // Then go to a specific story in iframe mode
        cy.visit('/iframe.html?id=primitives-button--primary&viewMode=story');
        cy.get('body').should('be.visible');
        cy.document().then((doc) => {
            doc.documentElement.classList.remove('dark');
        });
        cy.wait(500); // Wait for theme to apply
        cy.screenshot('button-light-mode', { overwrite: true });
    });

    it('Button component - Dark Mode', () => {
        cy.visit('/iframe.html?id=primitives-button--primary&viewMode=story');
        cy.get('body').should('be.visible');
        cy.document().then((doc) => {
            doc.documentElement.classList.add('dark');
        });
        cy.wait(500); // Wait for theme to apply
        cy.screenshot('button-dark-mode', { overwrite: true });
    });
}); 