import {  Page,Locator } from "@playwright/test";

export class HeaderPanel {
  readonly profileMenuButton: Locator;
  readonly dashboardMenuButton: Locator;
    readonly myProfileMenuButton: Locator;
    readonly categoriesMenuButton: Locator;
    readonly handToolsMenuButton: Locator;
    readonly userMenuButton: Locator;
    constructor(readonly page: Page) {
         this.profileMenuButton = page.locator("[id='menu']");
    this.dashboardMenuButton = page.locator("[data-test='nav-admin-dashboard']");
        this.myProfileMenuButton = page.locator("[data-test='nav-my-profile']");
        this.categoriesMenuButton = page.locator("[data-test='nav-categories']");
        this.handToolsMenuButton = page.locator("[data-test='nav-hand-tools']");
        this.userMenuButton = page.locator("[data-test='nav-admin-users']");


    }
}     