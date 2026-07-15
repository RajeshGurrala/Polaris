import {  Page,Locator } from "@playwright/test";

export class HandToolsPage {
  readonly pagination_nextButton: Locator;
  readonly pagination_prevButton: Locator;


  constructor(readonly page: Page) {
    this.pagination_nextButton = page.locator("[aria-label='Next']");
    this.pagination_prevButton = page.locator("[aria-label='Previous']");
  
  }

  async goto() {
    await this.page.goto("/category/hand-tools");
  }

  async clickProduct(itemName: string) {
    await this.page.getByText(`${itemName}`).click();
  }

  async toggleCheckboxByLabel( checkBoxLabel:string, shouldCheck = true) {
  const checkbox = this.page.locator('label', { hasText: checkBoxLabel }).locator('input');
  if (shouldCheck) {
    await checkbox.check();
  } else {
    await checkbox.uncheck();
}
}}