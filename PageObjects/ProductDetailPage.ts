import { Page,Locator } from "@playwright/test";



export class ProductDetailPage {

    readonly productname: Locator;
      readonly productDescription: Locator;
      readonly productPrice: Locator;
      readonly addToCartButton: Locator;
      readonly productAddedToCartMessage: Locator;
      readonly cartButton:Locator

  constructor(readonly page: Page) {
        this.productname = page.locator("[data-test='product-name']");
    this.productDescription = page.locator("[data-test='product-description']");
    this.productPrice = page.locator("[data-test='unit-price']");
    this.addToCartButton = page.locator("[data-test='add-to-cart']");
    this.productAddedToCartMessage = page.locator("#toast-container");
    this.cartButton = page.locator("[data-test='nav-cart']");
  }


}
