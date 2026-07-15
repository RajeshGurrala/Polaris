import { chromium, FullConfig } from "@playwright/test";
import { LoginPage } from "../LoginPage";

const CREDENTIALS = {
  username: "admin@practicesoftwaretesting.com",
  password: "welcome01",
};

const SITES = [
  {
    baseURL: "https://practicesoftwaretesting.com",
    storageStateFile: "playwright/.auth/practicesoftwaretesting-state.json",
  },
  {
    baseURL: "https://with-bugs.practicesoftwaretesting.com/#",
    storageStateFile: "playwright/.auth/with-bugs-state.json",
  },
];

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch({
    headless: false,
    channel: "chrome",
    args: ["--start-maximized"],
  });


  for (const site of SITES) {
    const context = await browser.newContext({ viewport: null });
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    await page.goto(`${site.baseURL}/auth/login`);
    await loginPage.login(CREDENTIALS.username, CREDENTIALS.password);
    await page.waitForURL("**/admin/dashboard");
    await context.storageState({ path: site.storageStateFile });
    await context.close();
  }

  await browser.close();
}

export default globalSetup;
