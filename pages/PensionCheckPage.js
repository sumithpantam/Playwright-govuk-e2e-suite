class PensionCheckPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: /check your state pension/i, level: 1 });
    this.startNowButton = page.getByRole('button', { name: /start now/i });
    this.cookieAcceptButton = page.getByRole('button', { name: /accept additional cookies/i });
  }

  async goto() {
    await this.page.goto('/check-state-pension');
  }

  async acceptCookiesIfVisible() {
    if (await this.cookieAcceptButton.isVisible()) {
      await this.cookieAcceptButton.click();
    }
  }
}

module.exports = { PensionCheckPage };
