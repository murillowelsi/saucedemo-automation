import { Page } from "@playwright/test";
import BasePage from "./base.page";

export default class InventoryPage extends BasePage {
  private continueShoppingBtn = "#continue-shopping";
  private sortDropdown = ".product_sort_container";
  private itemNames = ".inventory_item_name";
  private itemPrices = ".inventory_item_price";
  private addToCartButton = (itemName: string) =>
    `//div[text()='${itemName}']/ancestor::div[@class='inventory_item_description']//button`;
  private shoppingCart = ".shopping_cart_link";
  private cartItemCount = ".shopping_cart_badge";

  constructor(page: Page) {
    super(page);
  }

  async sortProductsBy(option: "az" | "za" | "lohi" | "hilo"): Promise<void> {
    const options = {
      az: "az",
      za: "za",
      lohi: "lohi",
      hilo: "hilo",
    };
    await this.page.selectOption(this.sortDropdown, options[option]);
  }

  async getAllProductNames(): Promise<string[]> {
    return this.page.locator(this.itemNames).allTextContents();
  }

  async getAllProductPrices(): Promise<string[]> {
    return this.page.locator(this.itemPrices).allTextContents();
  }

  async addItemToCart(itemName: string): Promise<void> {
    await this.page.click(this.addToCartButton(itemName));
  }

  async getCartItemCount(): Promise<number> {
    const count = await this.page.locator(this.cartItemCount).textContent();
    return count ? parseInt(count) : 0;
  }

  async navigateToCart(): Promise<void> {
    await this.page.click(this.shoppingCart);
  }

  async continueShopping(): Promise<void> {
    await this.page.locator(this.continueShoppingBtn).click();
  }
}
