const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const { PensionCheckPage } = require('../pages/PensionCheckPage.js');

test.describe('Accessibility Compliance (WCAG AA)', () => {
  test('State Pension start page has no critical WCAG AA violations', async ({ page }) => {
    const pensionPage = new PensionCheckPage(page);
    await pensionPage.goto();
    await pensionPage.acceptCookiesIfVisible();

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
