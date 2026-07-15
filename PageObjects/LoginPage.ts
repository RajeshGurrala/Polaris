import { Page } from "@playwright/test";

export class LoginPage {
  constructor(readonly page: Page) {}

  async goto() {
    await this.page.goto("/auth/login");
  }

  async login(email: string, password: string) {
    await this.page.fill("[data-test='email']", email);
    await this.page.fill("[data-test='password']", password);
    await this.page.click("[data-test='login-submit']");
  }
}
