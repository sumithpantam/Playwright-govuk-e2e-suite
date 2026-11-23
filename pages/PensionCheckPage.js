
class PensionCheckPage {
  constructor(page) {
    this.page = page;

    this.heading = page.getByRole('heading', {
      name: /check your state pension forecast/i,
      level: 1,
    });

    // GOV.UK presents Start now as a button.
    this.startNowButton = page.getByRole('button', {
      name: /^start now$/i,
    });

    this.cookieAcceptButton = page.getByRole('button', {
      name: /accept additional cookies/i,
    });

    this.cookieConfirmationHideButton = page.getByRole('button', {
      name: /hide cookie message/i,
    });
  }

  async goto() {
    await this.page.goto('/check-state-pension');
  }

  async acceptCookiesIfVisible() {
    if (await this.cookieAcceptButton.isVisible()) {
      await this.cookieAcceptButton.click();

      if (await this.cookieConfirmationHideButton.isVisible()) {
        await this.cookieConfirmationHideButton.click();
      }
    }
  }
}

module.exports = { PensionCheckPage };
