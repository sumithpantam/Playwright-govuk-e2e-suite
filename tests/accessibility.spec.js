const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const { PensionCheckPage } = require('../pages/PensionCheckPage.js');


test.describe('Automated accessibility checks (WCAG A/AA rules)', () => {
  test('State Pension page has no detected violations for selected WCAG rules', async ({ page }) => {
    const pensionPage = new PensionCheckPage(page);

    await pensionPage.goto();
    await pensionPage.acceptCookiesIfVisible();

    const scanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    // Print useful details to the test output if violations are found.
    if (scanResults.violations.length > 0) {
      console.error(
        'Accessibility violations detected:',
        JSON.stringify(
          scanResults.violations.map((violation) => ({
            id: violation.id,
            impact: violation.impact,
            description: violation.description,
            help: violation.help,
            helpUrl: violation.helpUrl,
            affectedNodes: violation.nodes.map((node) => node.target),
          })),
          null,
          2
        )
      );
    }


    expect(scanResults.violations, 'axe-core detected WCAG A/AA rule violations').toEqual([]);
  });
});