import { Locator, Page } from "@playwright/test";

export class UsersPage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly dateOfBirth: Locator;
  readonly street: Locator;
  readonly postalCode: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly country: Locator;
  readonly phone: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly roleSelect: Locator;
  readonly addUserButton: Locator;
  readonly saveButton: Locator;
  readonly profileMenuButton: Locator;
  readonly signOutButton: Locator;
  readonly failedLoginAttempts: Locator;
  readonly enabledCheckbox: Locator;
  readonly toastMessage: Locator;

  constructor(readonly page: Page) {
    this.firstNameInput = page.locator("[data-test='first-name']");
    this.lastNameInput = page.locator("[data-test='last-name']");
    this.dateOfBirth = page.locator("[data-test='dob']");
    this.street = page.locator("[data-test='street']");
    this.postalCode = page.locator("[data-test='postal_code']");
    this.city = page.locator("[data-test='city']");
    this.state = page.locator("[data-test='state']");
    this.country = page.locator("[data-test='country']");
    this.phone = page.locator("[data-test='phone']");
    this.emailInput = page.locator("[data-test='email']");
    this.passwordInput = page.locator("[data-test='password']");
    this.roleSelect = page.locator("[data-test='role']");
    this.addUserButton = page.locator("[data-test='user-add']");
    this.saveButton = page.locator("[data-test='user-submit']");
    this.profileMenuButton = page.locator("[id='menu']");
    this.signOutButton = page.locator("[data-test='nav-sign-out']");
    this.failedLoginAttempts = page.locator(
      "[data-test='failed_login_attempts']",
    );
    this.enabledCheckbox = page.locator("[data-test='enabled']");
    this.toastMessage = page.locator("[data-test='toast-message']");
  }

  async goto() {
    await this.page.goto("/admin/users");
  }

  async addUser(
    firstName: string,
    lastName: string,
    DOB: string,
    steet: string,
    postalCode: string,
    city: string,
    state: string,
    country: string,
    phone: string,
    email: string,
    password: string,
    failedLoginAttempts: number,
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.dateOfBirth.fill(DOB);
    await this.street.fill(steet);
    await this.postalCode.fill(postalCode);
    await this.city.fill(city);
    await this.state.fill(state);
    await this.country.selectOption({ label: country });
    await this.phone.fill(phone);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.failedLoginAttempts.fill(failedLoginAttempts.toString());
    await this.enabledCheckbox.check();
    await this.saveButton.click();
  }
}
