import { expect, test } from "@playwright/test";
import { AccountPage } from "../PageObjects/AccountPage";
import { CartPage } from "../PageObjects/CartPage";
import { CheckoutPage } from "../PageObjects/CheckoutPage";
import { HandToolsPage } from "../PageObjects/HandToolsPage";
import { LoginPage } from "../PageObjects/LoginPage";
import { ProductDetailPage } from "../PageObjects/ProductDetailPage";
import { UsersPage } from "../PageObjects/UsersPage";
import { CommonFunctions } from "../utils/CommonFunctions";
import { HeaderPanel } from "../PageObjects/HeaderPanel";

// ─── 1. View Product Details ──────────────────────────────────────────────────

const commonFunctions = new CommonFunctions();
const token = commonFunctions.getAuthToken(
  "playwright/.auth/practicesoftwaretesting-state.json",
);

test.describe("1. View Product Details", () => {
  test("access a product and view its details", async ({ page }) => {
    const handToolsPage = new HandToolsPage(page);
    const productDetailPage = new ProductDetailPage(page);

    await page.goto("/");
    const headerPanel = new HeaderPanel(page);
    await headerPanel.categoriesMenuButton.click();
    await headerPanel.handToolsMenuButton.click();
    await handToolsPage.clickProduct("Combination Pliers");

    //extract the product ID from the URL
    const itemId = page.url().split("/").pop();

    //API test- to get the product details from the backend using the product ID and the Bearer token for authentication
    const response = await page.request.get(
      `https://api.practicesoftwaretesting.com/products/${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      },
    );
    const itemFromAPI = await response.json();

    await expect(productDetailPage.productname).toHaveText(
      "Combination Pliers",
    );
    //this is an assertion to check that the product description on the frontend match the data from the backend API
    await expect(productDetailPage.productDescription).toContainText(
      itemFromAPI.description,
    );
    await expect(productDetailPage.productPrice).toContainText(`14.15`);
    await expect(productDetailPage.addToCartButton).toBeVisible();
  });
});

// ─── 2. View invoice after purchase ──────────────────────────────────────────

test.describe("2. View invoice after purchase", () => {
  test("customer purchases a product with cash on delivery and views invoice", async ({
    page,
  }) => {
    const handToolsPage = new HandToolsPage(page);
    const productDetailPage = new ProductDetailPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const headerPanel = new HeaderPanel(page);
    await page.goto("/");
    await headerPanel.categoriesMenuButton.click();
    await headerPanel.handToolsMenuButton.click();
    await handToolsPage.clickProduct("Combination Pliers");
    await productDetailPage.addToCartButton.click();
    await expect(productDetailPage.productAddedToCartMessage).toHaveText(
      "Product added to shopping cart.",
    );
    //cart page
    await productDetailPage.cartButton.click();
    await expect(cartPage.productTitle).toHaveText("Combination Pliers");
    await productDetailPage.cartButton.click();
    await cartPage.proceedToCheckoutButtonOne.click();
    await cartPage.proceedToCheckoutButtonTwo.click();

    //checkout page
    await checkoutPage.postCode.fill("SL1 6EP");
    await checkoutPage.houseNumber.fill("1");
    const commonFunctions = new CommonFunctions();
    const streetName =
      "street-" + (await commonFunctions.generateStreetName(10));
      await page.waitForTimeout(500); 
    //clearing pre populated street name
    await checkoutPage.street.press("ControlOrMeta+A");
await page.waitForTimeout(500); 
    await checkoutPage.street.press("Backspace");
    await checkoutPage.street.pressSequentially(streetName, { delay: 100 });
    await checkoutPage.proceedToCheckoutButtonThree.click();
    await expect(page.getByRole("heading", { name: "Payment" })).toBeVisible();
    await checkoutPage.paymentMethod.selectOption("Cash on Delivery");
    await checkoutPage.confirmButton.click();
    await expect(checkoutPage.paymentSuccesfulMessage).toHaveText(
      "Payment was successful",
    );
    await checkoutPage.confirmButton.click();
    //extracting invoice number
    const invoiceNumber = await checkoutPage.invoiceNumber.textContent();
    
    await headerPanel.profileMenuButton.click();
    await headerPanel.dashboardMenuButton.click();

    await page.waitForLoadState("networkidle");

    const firstRow = page.locator("table.table tbody tr").first();

    await expect(firstRow).toBeVisible({ timeout: 10000 });

    const targetRow = page.locator("table.table tbody tr", {
      hasText: invoiceNumber ?? undefined,
    });

    await expect(targetRow).toBeVisible();
    await expect(targetRow).toContainText(streetName);
    //asserting the invoice number initially presented is same as the one in the dashboard table
    await expect(page.locator("table.table tbody tr").first()).toContainText(
      invoiceNumber!,
    );
  });
});

// ─── 3. Filter products and pagination ───────────────────────────────────────

test.describe("3. Filter products and pagination", () => {
  test("category filter updates the product list and pagination works", async ({
    page,
  }) => {
    const handToolsPage = new HandToolsPage(page);
    const headerPanel = new HeaderPanel(page);
    await page.goto("/");
    await headerPanel.categoriesMenuButton.click();
    await headerPanel.handToolsMenuButton.click();

    //these are items before filter is applied
    const initialNames = await page
      .locator(".card .card-title")
      .allTextContents();

    //trigger a promise to wait for the API response when the filter is applied
    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().includes("/products") &&
        response.request().method() === "QUERY",
    );

    //apply the filter
    await handToolsPage.toggleCheckboxByLabel("Hand Saw", true);

    const filteredItems = await page.locator(".card").all();
    for (const item of filteredItems) {
      await expect(item.locator(".card-body")).toContainText("Saw");
    }

    //API test- to verify that the filtered items match the backend API response for the same filter
    const response = await responsePromise;
    const filteredItemsFromAPI = await response.json();
    const apiProducts = filteredItemsFromAPI.data;
    for (let i = 0; i < filteredItems.length; i += 1) {
      await expect(filteredItems[i].locator(".card-body")).toContainText(
        apiProducts[i].name,
      );
    }

    await handToolsPage.toggleCheckboxByLabel("Hand Saw", false);
    await expect(page.locator(".card")).toHaveCount(initialNames.length, {
      timeout: 10000,
    });
    const resetNames = await page
      .locator(".card .card-title")
      .allTextContents();
    expect(resetNames).toEqual(initialNames);

    //checks page scroll works
    const footer = page.locator("[class^=container-fluid]");
    await expect(footer).not.toBeInViewport();
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeInViewport();

    //checks pagination works
    const prevButtonContainer = page.locator("li", {
      has: page.locator('[data-test="pagination-prev"]'),
    });
    await expect(prevButtonContainer).toContainClass("disabled");
    await handToolsPage.pagination_nextButton.click();
    const namesOnNextPage = await page
      .locator(".card .card-title")
      .allTextContents();
    expect(namesOnNextPage).not.toEqual(initialNames);
    await expect(prevButtonContainer).not.toContainClass("disabled");
    await handToolsPage.pagination_prevButton.click();
    expect(await page.locator(".card .card-title").allTextContents()).toEqual(
      initialNames,
    );
  });
});

// ─── 4. Add a user and login as the user ─────────────────────────────────────

test.describe("4. Add a user and login as the user", () => {
  test("admin adds a new user and the new user can log in", async ({
    page,
  }) => {
    const usersPage = new UsersPage(page);
    const loginPage = new LoginPage(page);
    const headerPanel = new HeaderPanel(page);
    const commonFunctions = new CommonFunctions();

    const randomValue = await commonFunctions.generateStreetName(10);
    const email = `user${randomValue}@example.com`;
    const password = `User@${randomValue}!`;
    const firstName = `new${randomValue}`;
    const lastName = `user`;
    await page.goto("/");
    await headerPanel.profileMenuButton.click();
    await headerPanel.userMenuButton.click();
    await usersPage.addUserButton.click();
    await usersPage.addUser(
      firstName,
      lastName,
      "2000-01-10",
      "Main St",
      "SL12EP",
      "London",
      "London",
      "Ukraine",
      "0203371922",
      email,
      password,
      1,
    );
    await page.waitForLoadState("networkidle");
    await usersPage.profileMenuButton.click();
    await usersPage.signOutButton.click();
    await loginPage.goto();

    //login with wrong password and verify that login fails
    await loginPage.login(email, "wrongpassword");
    await expect(page).not.toHaveURL(/account/);

    //login with correct password and verify that login succeeds
    await loginPage.login(email, password);
    await expect(page).toHaveURL(/account/);

    const accountPage = new AccountPage(page);
    await expect(headerPanel.profileMenuButton).toContainText(firstName);
    await headerPanel.profileMenuButton.click();
    await headerPanel.myProfileMenuButton.click();
    await expect(accountPage.firstName).toHaveValue(firstName);
    await accountPage.firstName.fill(`updated${firstName}`);
    await accountPage.updateProfile.click();
    await page.reload();
    await expect(accountPage.firstName).toHaveValue(`updated${firstName}`);
  });
});
