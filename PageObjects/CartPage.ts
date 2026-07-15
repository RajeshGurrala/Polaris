import { Locator, Page } from "@playwright/test";

export class CartPage {
  readonly productTitle: Locator;
  readonly proceedToCheckoutButtonOne: Locator;
  readonly proceedToCheckoutButtonTwo: Locator;

  constructor(page: Page) {
    this.productTitle = page.locator("[data-test='product-title']");
    this.proceedToCheckoutButtonOne = page.locator("[data-test='proceed-1']");
    this.proceedToCheckoutButtonTwo = page.locator("[data-test='proceed-2']");
  }
}
