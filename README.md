# Polaris — Playwright Test Suite

End-to-end test automation suite for [Practice Software Testing](https://practicesoftwaretesting.com/) built with Playwright and TypeScript.

## Prerequisites

- Node.js v18+
- npm

## Installation

```bash
npm install
npx playwright install
```

## Project Structure

```
├── PageObjects/            # Page Object Model classes
│   ├── AccountPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── HandToolsPage.ts
│   ├── LoginPage.ts
│   ├── ProductDetailPage.ts
│   ├── UsersPage.ts
│   └── setup/
│       └── globalSetup.ts  # Authentication setup (runs before all tests)
├── tests/
│   └── tests_on_practiceSoftwareTesting.spec.ts
├── utils/
│   └── CommonFunctions.ts  # Shared helper utilities
├── playwright/
│   └── .auth/              # Saved authentication state (git-ignored)
└── playwright.config.ts
```

## Authentication

A global setup step runs before the test suite. It logs in as an admin user and saves the browser storage state to `playwright/.auth/practicesoftwaretesting-state.json`, which is reused across tests to avoid repeated logins.

Credentials are currently hard-coded in `PageObjects/setup/globalSetup.ts`. Move them to environment variables before committing to a shared repository.

## Running Tests

| Command                        | Description                    |
| ------------------------------ | ------------------------------ |
| `npx playwright test`          | Run all tests headlessly       |
| `npx playwright test --ui`     | Open Playwright UI mode        |
| `npx playwright test --headed` | Run tests in a visible browser |
| `npx playwright show-report`   | View the HTML test report      |

## Test Cases

| #   | Description                                                 | Status  |
| --- | ----------------------------------------------------------- | ------- |
| 1   | View product details (validates UI against API response)    | Active  |
| 2   | View invoice after purchase (cash on delivery flow)         | Skipped |
| 3   | Filter products and verify pagination                       | Skipped |
| 4   | Admin adds a new user; new user logs in and updates profile | Skipped |

## Configuration

Key settings in `playwright.config.ts`:

- **Base URL:** `https://practicesoftwaretesting.com/`
- **Browser:** Desktop Chrome
- **Parallelism:** Fully parallel (single worker on CI)
- **Retries:** 2 on CI, 0 locally
- **Trace:** Captured on first retry
- **Reporter:** HTML

## Utils

`CommonFunctions` provides:

- `generateStreetName(length)` — generates a random alphanumeric string (used for unique test data)
- `getAuthToken(stateFilePath)` — reads the `auth-token` from a saved Playwright storage state file
