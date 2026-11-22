const { test, expect } = require('@playwright/test');
const { PensionCheckPage } = require('../pages/PensionCheckPage.js'); 
const { citizenData } = require('../test-data/citizenData.js');

test.describe('GOV.UK State Pension Start Journey', () => {
  test('displays main heading and navigates via Start now button', async ({ page }) => {
    const pensionPage = new PensionCheckPage(page);

    await pensionPage.goto();
    await pensionPage.acceptCookiesIfVisible();

    await expect(pensionPage.heading).toBeVisible();
    await expect(pensionPage.startNowButton).toBeVisible();

    await pensionPage.startNowButton.click();
    await expect(page).toHaveURL(/access-service|sign-in|gov\.uk/);
  });
});
