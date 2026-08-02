import { chromium } from "@playwright/test";
import { LoginPage } from "../LoginPage";

const CREDENTIALS = {
  username: "admin@practicesoftwaretesting.com",
  password: "welcome01",
};

const SITES = [
  {
    baseURL: "https://practicesoftwaretesting.com",
    storageStateFile: "auth/standardState.json",
  },
  {
    baseURL: "https://with-bugs.practicesoftwaretesting.com/#",
    storageStateFile: "auth/withBugs.json",
  },
];

export default async function globalSetup() {
  const browser = await chromium.launch();


  for (const site of SITES) {
    const context = await browser.newContext({viewport:null});
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


