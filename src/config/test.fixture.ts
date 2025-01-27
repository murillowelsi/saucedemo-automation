import { test as base } from "@playwright/test";
import CartPage from "../pages/cart.page";
import CheckoutPage from "../pages/checkout.page";
import InventoryPage from "../pages/inventory.page";
import LoginPage from "../pages/login.page";
import { Environment } from "./environment";

export type TestFixture = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  checkoutPage: CheckoutPage;
  cartPage: CartPage;
};

export const test = base.extend<TestFixture>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await page.goto(Environment.baseUrl);
    await use(loginPage);
  },

  inventoryPage: async ({ loginPage, page }, use) => {
    await loginPage.login(
      Environment.standardUser.username,
      Environment.standardUser.password
    );
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },

  checkoutPage: async ({ inventoryPage, page }, use) => {
    await inventoryPage.addItemToCart("Sauce Labs Backpack");
    await inventoryPage.navigateToCart();
    await page.click("#checkout");

    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  cartPage: async ({ inventoryPage, page }, use) => {
    await inventoryPage.addItemToCart("Sauce Labs Backpack");
    await inventoryPage.navigateToCart();
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
});

export { expect } from "@playwright/test";
