import { expect, test } from "../config/test.fixture";

test.describe("Inventory Page Tests", () => {
  test("Verify default product sorting A-Z", async ({ inventoryPage }) => {
    const productNames = await inventoryPage.getAllProductNames();
    const sortedNames = [...productNames].sort((a, b) => a.localeCompare(b));
    expect(productNames).toEqual(sortedNames);
  });

  test("Sort products by Price (low to high)", async ({ inventoryPage }) => {
    await inventoryPage.sortProductsBy("lohi");
    const prices = await inventoryPage.getAllProductPrices();
    const numericPrices = prices.map((price) =>
      parseFloat(price.replace("$", ""))
    );
    const sortedPrices = [...numericPrices].sort((a, b) => a - b);
    expect(numericPrices).toEqual(sortedPrices);
  });

  test("Add items to cart and verify count", async ({ inventoryPage }) => {
    await inventoryPage.addItemToCart("Sauce Labs Backpack");
    await inventoryPage.addItemToCart("Sauce Labs Bike Light");

    const itemCount = await inventoryPage.getCartItemCount();
    expect(itemCount).toBe(2);
  });

  test("Navigate to cart from inventory page", async ({ inventoryPage }) => {
    await inventoryPage.navigateToCart();
    await expect(inventoryPage.page).toHaveURL(/cart.html/);
  });

  test("Sort products by Name Z-A and verify order", async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortProductsBy("za");
    const productNames = await inventoryPage.getAllProductNames();
    const reverseSorted = [...productNames].sort((a, b) => b.localeCompare(a));
    expect(productNames).toEqual(reverseSorted);
  });
});
