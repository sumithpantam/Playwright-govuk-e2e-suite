# Playwright Public Digital Service E2E & Accessibility Suite

[![Playwright Tests](https://github.com/sumithpantam/Playwright-govuk-e2e-suite/actions/workflows/playwright.yml/badge.svg)](https://github.com/sumithpantam/Playwright-govuk-e2e-suite/actions/workflows/playwright.yml)

This project uses Playwright and JavaScript to check the GOV.UK State Pension start page and its public Content API.

---

## Tests and Skills Demonstrated

The suite currently has five test cases across three test files. Playwright is configured to run them in Chromium, Firefox and WebKit.

### UI journey — `tests/ui-journey.spec.js`

**Check the start page**

- Opens `/check-state-pension`.
- Accepts the cookie prompt if it appears, then hides the confirmation message if shown.
- Checks that the page heading and **Start now** button are visible.
- Uses the `PensionCheckPage` page object and role-based locators for the heading and button.

**Check Start now navigation**

- Opens the same page and handles the cookie prompt.
- Clicks the **Start now** button.
- Checks that the browser reaches the HMRC service at `tax.service.gov.uk`.

These checks cover the journey from the GOV.UK start page to the service. They do not continue through sign-in or complete a State Pension application.

### Accessibility — `tests/accessibility.spec.js`

- Scans the State Pension start page with `@axe-core/playwright`.
- Runs axe-core rules tagged for WCAG 2.0 and 2.1 Level A and AA.
- Prints violation details, including impact and affected page elements, if axe-core finds any.
- Fails the test if the scan reports violations for the selected rules.

This is an automated check of one page. It does not establish that the whole service conforms to WCAG.

### Content API — `tests/api-validation.spec.js`

**Check the State Pension content endpoint**

- Sends a `GET` request to the Content API endpoint.
- Checks for HTTP `200` and a JSON content type.
- Checks that `base_path` and `document_type` have the expected values.
- Checks that `title` is a non-empty string and includes the expected service title.

The endpoint and expected values are kept in `test-data/contentApiTestData.js` and imported by the API test. This keeps the test steps separate from the values they check.

**Check an unknown content path**

- Sends a `GET` request to a path that does not exist.
- Checks that the API returns HTTP `404`.

---

## Project Structure

```text
Playwright-govuk-e2e-suite/
├── .github/
│   └── workflows/
│       └── playwright.yml          # Runs the tests in GitHub Actions
├── pages/
│   └── PensionCheckPage.js         # Page locators and cookie actions
├── test-data/
│   └── contentApiTestData.js       # API endpoints and expected values
├── tests/
│   ├── ui-journey.spec.js          # Start page and Start now navigation
│   ├── accessibility.spec.js       # axe-core scan of the start page
│   └── api-validation.spec.js      # Content API response checks
├── .gitignore
├── package-lock.json
├── package.json
└── playwright.config.js            # Browser projects and test settings
```

---

## Tools and Test Settings

- **Test framework:** Playwright Test
- **Language:** JavaScript (Node.js)
- **Accessibility checks:** `@axe-core/playwright`
- **Page design:** Page Object Model
- **Browsers:** Chromium, Firefox and WebKit
- **CI:** GitHub Actions
- **Report:** Playwright HTML report

On CI, Playwright is configured for up to two retries and one worker. It captures screenshots and video on failure, and a trace on the first retry. The workflow uploads the HTML report as an artifact.

---

## Running the Project Locally

### 1. Clone the Repository

```bash
git clone https://github.com/sumithpantam/Playwright-govuk-e2e-suite.git
cd Playwright-govuk-e2e-suite
```

### 2. Install Dependencies and Browsers

```bash
npm ci
npx playwright install
```

### 3. Run the Tests

```bash
# Run all tests in the configured browsers
npx playwright test

# Run one test file
npx playwright test tests/api-validation.spec.js

# Open Playwright's interactive test runner
npx playwright test --ui

# View the HTML report
npx playwright show-report
```

There are no test commands defined in `package.json`, so the tests are run with `npx playwright`.
