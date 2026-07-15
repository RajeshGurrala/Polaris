import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,

  globalSetup: "./PageObjects/setup/globalSetup.ts",

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    trace: "on-first-retry",
    headless: false,
  },
  projects: [
    {
      name: "standardURL",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://practicesoftwaretesting.com/",
        storageState: "playwright/.auth/practicesoftwaretesting-state.json",
      },
    },
  ],
});
