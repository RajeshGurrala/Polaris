import { Locator, Page } from "@playwright/test";
export class AccountPage {
  readonly firstName: Locator;
  readonly updateProfile: Locator;
  constructor(readonly page: Page) {
    this.firstName = page.locator("[data-test='first-name']");
    this.updateProfile = page.locator("[data-test='update-profile-submit']");
  }
}
