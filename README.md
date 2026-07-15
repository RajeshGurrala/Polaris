# Polaris — Playwright Test Suite

End-to-end test automation suite for [Practice Software Testing](https://practicesoftwaretesting.com/) built with Playwright and TypeScript.

The suite runs against two environments:

| Project    | URL                                           |
| ---------- | --------------------------------------------- |
| `standard` | https://practicesoftwaretesting.com           |
| `buggy`    | https://with-bugs.practicesoftwaretesting.com |

Tests on the `buggy` project are expected to surface failures caused by intentional defects in that environment.

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
│   ├── HeaderPanel.ts
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
│       ├── practicesoftwaretesting-state.json   # standard project auth
│       └── with-bugs-state.json                 # buggy project auth
└── playwright.config.ts
```

## Authentication

Before any tests run, `globalSetup.ts` logs in as an admin user against **both** environments and saves a separate browser storage state file for each. These state files are loaded automatically by each project, so tests start already authenticated.

Credentials are currently hard-coded in `PageObjects/setup/globalSetup.ts`. Move them to environment variables before committing to a shared repository.

## Running Tests

### By project (recommended)

```bash
# Run all tests against the stable environment
npx playwright test --project=standard

# Run all tests against the buggy environment
npx playwright test --project=buggy
```

### UI mode

```bash
npx playwright test --ui --project=standard
npx playwright test --ui --project=buggy
```

### All projects at once

```bash
npx playwright test
```

### Other useful commands

| Command                                           | Description                             |
| ------------------------------------------------- | --------------------------------------- |
| `npx playwright test --headed --project=standard` | Run standard tests in a visible browser |
| `npx playwright show-report`                      | Open the last HTML report               |

## Test Cases

| #   | Description                                                 | Type     | Notes                                                                                     |
| --- | ----------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------- |
| 1   | View product details                                        | UI + API | Fetches product from API after navigation; asserts UI description and price match the API |
| 2   | View invoice after purchase                                 | UI       | Cash on delivery end-to-end flow; verifies invoice appears in the admin dashboard         |
| 3   | Filter products and verify pagination                       | UI + API | Intercepts the filter API response and asserts filtered UI cards match the API data       |
| 4   | Admin adds a new user; new user logs in and updates profile | UI       | Full user lifecycle including wrong-password check and profile update                     |

## Configuration

Key settings in `playwright.config.ts`:

- **Browser:** Desktop Chrome (both projects)
- **Parallelism:** Fully parallel (single worker on CI)
- **Retries:** 2 on CI, 0 locally
- **Trace:** Captured on first retry
- **Reporter:** HTML

## Utils

`CommonFunctions` provides:

- `generateStreetName(length)` — generates a random alphanumeric string (used for unique test data)
- `getAuthToken(stateFilePath)` — reads the `auth-token` from a saved Playwright storage state file
