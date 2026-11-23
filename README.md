# Playwright Public Digital Service E2E & Accessibility Suite

[![Playwright Tests](https://github.com/sumithpantam/Playwright-govuk-e2e-suite/actions/workflows/playwright.yml/badge.svg)](https://github.com/sumithpantam/Playwright-govuk-e2e-suite/actions/workflows/playwright.yml)

---

## What This Project Covers

### 1. End-to-End UI Testing

- Uses Playwright to check the GOV.UK State Pension start page.
- Checks that the page heading and **Start now button** are visible.
- Clicks the Start now button and checks that the browser moves to the next service page.
- Keeps the page locators in `pages/PensionCheckPage.js` so the test is easier to read.

### 2. Accessibility Testing

- Uses `@axe-core/playwright` to scan the State Pension start page.
- Checks for WCAG 2.0 and WCAG 2.1 Level A and AA issues reported by axe-core.
- The test expects the scan to return no violations for this page.

### 3. GOV.UK Content API Checks

- Checks that the State Pension content endpoint returns the expected page details.
- Checks that a request for a page that does not exist returns a `404` response.

### 4. GitHub Actions

- Runs the Playwright tests when changes are pushed or a pull request is opened for `main` or `master`.
- Uploads the Playwright HTML report as a workflow artifact.

The tests cover the public start page and content API. They do not complete the State Pension application or submit personal information.

---

## Project Structure

```text
Playwright-govuk-e2e-suite/
├── .github/
│   └── workflows/
│       └── playwright.yml       # Runs the tests in GitHub Actions
├── pages/
│   └── PensionCheckPage.js      # Page locators and actions
├── test-data/
│   └── citizenData.js           # Test data used by the UI journey
├── tests/
│   ├── ui-journey.spec.js       # State Pension start-page test
│   ├── accessibility.spec.js    # Accessibility scan
│   └── api-validation.spec.js   # Content API checks
├── .gitignore
├── package-lock.json
├── package.json
└── playwright.config.js         # Test settings and browser projects
```

---

## Tools Used

- **Test framework:** Playwright Test
- **Language:** JavaScript (Node.js)
- **Accessibility checks:** `@axe-core/playwright`
- **Page design:** Page Object Model
- **Automation:** GitHub Actions
- **Report:** Playwright HTML report

The current configuration runs the tests in Chromium, Firefox and WebKit.

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
# Run all tests
npx playwright test

# Run one test file
npx playwright test tests/accessibility.spec.js

# Open Playwright's interactive test runner
npx playwright test --ui

# View the HTML report
npx playwright show-report
```

There are no test commands defined in `package.json`, so the tests are run with `npx playwright`.

