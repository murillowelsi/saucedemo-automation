import { expect, test } from "../config/test.fixture";

test.describe("Cart Page Tests", () => {
  test("Verify added item in cart", async ({ cartPage }) => {
    const items = await cartPage.getCartItemNames();
    expect(items).toContain("Sauce Labs Backpack");
  });

  test("Remove item from cart", async ({ cartPage }) => {
    const initialCount = await cartPage.getCartItemCount();
    await cartPage.removeItem("Sauce Labs Backpack");
    const newCount = await cartPage.getCartItemCount();
    expect(newCount).toBe(initialCount - 1);
  });

  test("Continue shopping navigates back to inventory", async ({
    cartPage,
  }) => {
    await cartPage.continueShopping();
    await expect(cartPage.page).toHaveURL(/inventory.html/);
  });

  test("Proceed to checkout from cart", async ({ cartPage }) => {
    await cartPage.proceedToCheckout();
    await expect(cartPage.page).toHaveURL(/checkout-step-one.html/);
  });

  test("Verify multiple items in cart", async ({ inventoryPage, cartPage }) => {
    await inventoryPage.continueShopping();
    await inventoryPage.addItemToCart("Sauce Labs Bike Light");
    await inventoryPage.navigateToCart();

    const items = await cartPage.getCartItemNames();
    expect(items).toEqual(["Sauce Labs Backpack", "Sauce Labs Bike Light"]);
  });

  test("Verify empty cart state", async ({ cartPage }) => {
    await cartPage.removeItem("Sauce Labs Backpack");
    const items = await cartPage.getCartItemNames();
    expect(items).toHaveLength(0);
  });
});
