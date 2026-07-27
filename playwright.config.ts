import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,

  globalSetup: "./PageObjects/setup/globalSetup.ts",

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["html"]
  ],
  use: {
    baseURL: process.env.URL || "https://practicesoftwaretesting.com/",
    trace: "on-first-retry",
    headless: false,
  },
   
  projects: [
    {
      name: "standard",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://practicesoftwaretesting.com/",
        storageState: "playwright/.auth/practicesoftwaretesting-state.json",
      },
    },
    {
      name: "buggy",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://with-bugs.practicesoftwaretesting.com/",
        storageState: "playwright/.auth/with-bugs-state.json",
      },
    },
  ],
});
