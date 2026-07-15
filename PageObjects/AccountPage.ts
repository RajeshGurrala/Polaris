import { Locator, Page } from "@playwright/test";
export class AccountPage {
    readonly profileMenuButton: Locator;
    readonly myProfileMenuButton: Locator;
    readonly firstName: Locator;
    readonly updateProfile: Locator;
  constructor(readonly page: Page) {
    this.profileMenuButton = page.locator("[id='menu']");
    this.myProfileMenuButton = page.locator("[data-test='nav-my-profile']");
    this.firstName = page.locator("[data-test='first-name']");  
    this.updateProfile = page.locator("[data-test='update-profile-submit']");
  }
}