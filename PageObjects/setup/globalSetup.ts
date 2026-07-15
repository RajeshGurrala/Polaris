import { chromium, FullConfig } from "@playwright/test";
import { LoginPage } from "../LoginPage";
const BASE_URL = "https://practicesoftwaretesting.com";

const CREDENTIALS = {
  username: "admin@practicesoftwaretesting.com",
  password: "welcome01",
};

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch({
    headless: false,
    channel: "chrome",
    args: ["--start-maximized"],
  });

  const context = await browser.newContext({ viewport: null });
  const page = await context.newPage();

  const loginPage = new LoginPage(page);
  await page.goto(`${BASE_URL}/auth/login`);
  await loginPage.login(CREDENTIALS.username, CREDENTIALS.password);
  await page.waitForURL("**/admin/dashboard");

  await page.context().storageState({
    path: "playwright/.auth/practicesoftwaretesting-state.json",
  });

  await context.close();
  await browser.close();
}

export default globalSetup;
