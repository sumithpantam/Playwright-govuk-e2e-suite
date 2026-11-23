# Playwright Public Digital Service E2E & Accessibility Suite

[![Playwright Tests](https://github.com/sumithpantam/Playwright-govuk-e2e-suite/actions/workflows/playwright.yml/badge.svg)](https://github.com/sumithpantam/Playwright-govuk-e2e-suite/actions/workflows/playwright.yml)

---

## What This Project Covers

### 1. Functional End-to-End UI Testing (Page Object Model)
* **Maintainable Architecture:** Encapsulates page locators and user actions inside dedicated Page Object classes (`pages/PensionCheckPage.js`), separating test logic from DOM selectors.
* **Accessible, User-Centric Locators:** Prioritizes semantic role-based selectors (`getByRole`) over brittle CSS or XPath expressions to mirror how real users and assistive technologies interact with the page.
* **Cross-Browser Execution:** Validates citizen service navigation flows across **Chromium, Firefox, and WebKit** to ensure consistent rendering and behaviour.

### 2. Automated Accessibility Compliance (`@axe-core/playwright`)
* **Shift-Left WCAG Auditing:** Integrates Deque's `axe-core` engine directly into automated browser tests (`tests/accessibility.spec.js`).
* **Standards Coverage:** Audits rendered pages against **WCAG 2.0 and WCAG 2.1 Level A & AA** guidelines—checking colour contrast, ARIA attributes, landmark structure, and heading hierarchy, failing the CI build if critical accessibility barriers are detected.

### 3. REST API Contract & Negative Testing
* **Fast Headless API Validation:** Uses Playwright's `APIRequestContext` (`request` fixture) in `tests/api-validation.spec.js` to verify backend responses without browser overhead.
* **Positive & Negative Coverage:** Validates HTTP status codes (`200 OK` and `404 Not Found`), content metadata, and JSON schema structure against the public **GOV.UK Content API**.

### 4. Data-Driven & Ethical Testing Practices
* **Separation of Test Data:** Stores synthetic, non-PII test inputs and boundary values in `test-data/citizenData.js` to avoid hardcoding values inside test specs.
* **Responsible Public-Endpoint Testing:** Strictly executes low-volume, read-only `GET` requests against public informational endpoints without submitting live forms or using personal data.

### 5. CI/CD Pipeline & Automated Reporting
* **Continuous Integration:** Automatically triggers full test execution on every `push` and `pull_request` to `main` via **GitHub Actions** (`.github/workflows/playwright.yml`).
* **Diagnostic Artifacts:** Generates and uploads interactive **Playwright HTML Reports** and trace logs as downloadable GitHub Actions artifacts (`playwright-report`) for rapid failure triage.

---

## Project Structure

```text
playwright-govuk-e2e-suite/
├── .github/
│   └── workflows/
│       └── playwright.yml        # GitHub Actions CI/CD workflow & artifact upload
├── pages/
│   └── PensionCheckPage.js       # Page Object Model (locators & reusable actions)
├── test-data/
│   └── citizenData.js            # Synthetic, non-PII test data & boundary inputs
├── tests/
│   ├── ui-journey.spec.js        # End-to-end UI navigation & state verification
│   ├── accessibility.spec.js     # Automated WCAG 2.0/2.1 A & AA compliance checks
│   └── api-validation.spec.js    # REST API positive (200) & negative (404) tests
├── .gitignore                    # Excludes node_modules, local reports & trace files
├── package.json                  # Project dependencies & scripts
└── playwright.config.js          # Centralized baseURL, browser matrix & reporter config
```

---

## Tech Stack
* **Test Framework:** Playwright (`@playwright/test`)
* **Language:** JavaScript (Node.js)
* **Accessibility Engine:** `@axe-core/playwright`
* **Design Pattern:** Page Object Model (POM)
* **CI/CD & Reporting:** GitHub Actions + Playwright HTML Reporter

---

## Running the Project Locally

### 1. Clone the Repository
```bash
git clone https://github.com
cd playwright-govuk-e2e-suite
```

### 2. Install Dependencies & Browsers
```bash
npm install
npx playwright install --with-deps
```

### 3. Execute Tests
```bash
# Run all test suites across configured browsers
npx playwright test

# Run a specific test suite
npx playwright test tests/accessibility.spec.js

# Run in interactive Playwright UI mode
npx playwright test --ui

# View the HTML test report
npx playwright show-report
```

# Playwright Public Digital Service E2E & Accessibility Suite

[Playwright Tests](https://github.com/sumithpantam/Playwright-govuk-e2e-suite/actions/workflows/playwright.yml) ([status badge](https://github.com/sumithpantam/Playwright-govuk-e2e-suite/actions/workflows/playwright.yml/badge.svg))

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

The current configuration runs the tests in Chromium and WebKit. Firefox is not enabled.

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

