import { Locator, Page } from "@playwright/test";

export class CheckoutPage {
  readonly postCode: Locator;
  readonly houseNumber: Locator;
  readonly street: Locator;
  readonly proceedToCheckoutButtonThree: Locator;
  readonly paymentMethod: Locator;
  readonly confirmButton: Locator;
  readonly paymentSuccesfulMessage: Locator;
  readonly invoiceNumber: Locator;

  constructor(readonly page: Page) {
    this.postCode = page.locator("[data-test='postal_code']");
    this.houseNumber = page.locator("[data-test='house_number']");
    this.street = page.locator("[data-test='street']");
    this.proceedToCheckoutButtonThree = page.locator("[data-test='proceed-3']");
    this.paymentMethod = page.locator("[data-test='payment-method']");
    this.confirmButton = page.locator("[data-test='finish']");
    this.paymentSuccesfulMessage = page.locator(
      "[data-test='payment-success-message']",
    );
    this.invoiceNumber = page.locator("[id='order-confirmation'] span");
  }
}
