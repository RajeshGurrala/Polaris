import { Page } from "@playwright/test";

export class LoginPage {
  constructor(readonly page: Page) {}

  async goto() {
    await this.page.goto("/auth/login");
  }

  async login(email: string, password: string) {
    await this.page.locator("[data-test='email']").fill (email);
    await this.page.locator("[data-test='password']").fill(password);
    await this.page.click("[data-test='login-submit']");
  }
}
