import { Page } from "@playwright/test";
import BasePage from "./base.page";

export default class CartPage extends BasePage {
  private cartItems = ".cart_item";
  private itemName = ".inventory_item_name";
  private removeButton = (itemName: string) =>
    `//div[text()='${itemName}']/ancestor::div[@class='cart_item']//button`;
  private continueShoppingButton = "#continue-shopping";
  private checkoutButton = "#checkout";

  constructor(page: Page) {
    super(page);
  }

  async getCartItemNames(): Promise<string[]> {
    return this.page.locator(this.itemName).allTextContents();
  }

  async removeItem(itemName: string): Promise<void> {
    await this.page.click(this.removeButton(itemName));
  }

  async continueShopping(): Promise<void> {
    await this.page.click(this.continueShoppingButton);
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.click(this.checkoutButton);
  }

  async getCartItemCount(): Promise<number> {
    return (await this.getCartItemNames()).length;
  }
}
