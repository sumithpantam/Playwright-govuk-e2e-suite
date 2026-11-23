
const { test, expect } = require('@playwright/test');
const { PensionCheckPage } = require('../pages/PensionCheckPage.js');

test.describe('GOV.UK State Pension journey', () => {

  test('shows the State Pension page heading and Start now button', async ({ page }) => {
    const pensionPage = new PensionCheckPage(page);

    await pensionPage.goto();
    await pensionPage.acceptCookiesIfVisible();

    await expect(pensionPage.heading).toBeVisible();
    await expect(pensionPage.startNowButton).toBeVisible();
  });

  test('Start now navigates to the HMRC service', async ({ page }) => {
    const pensionPage = new PensionCheckPage(page);

    await pensionPage.goto();
    await pensionPage.acceptCookiesIfVisible();

    await expect(pensionPage.startNowButton).toBeVisible();

    await pensionPage.startNowButton.click();

    // Confirm navigation to the HMRC service.
    await expect(page).toHaveURL(/tax\.service\.gov\.uk/i);
  });

});
