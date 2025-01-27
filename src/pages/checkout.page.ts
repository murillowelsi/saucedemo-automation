import { Page } from "@playwright/test";
import BasePage from "./base.page";

export default class CheckoutPage extends BasePage {
  private firstNameInput = "#first-name";
  private lastNameInput = "#last-name";
  private zipCodeInput = "#postal-code";
  private continueButton = "#continue";
  private finishButton = "#finish";
  private completeHeader = ".complete-header";
  private errorMessage = '[data-test="error"]';
  private itemTotal = ".summary_subtotal_label";
  private tax = ".summary_tax_label";
  private total = ".summary_total_label";

  constructor(page: Page) {
    super(page);
  }

  async enterUserInfo(
    firstName: string,
    lastName: string,
    zipCode: string
  ): Promise<void> {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.zipCodeInput, zipCode);
  }

  async continueToOverview(): Promise<void> {
    await this.page.click(this.continueButton);
  }

  async completeCheckout(): Promise<void> {
    await this.page.click(this.finishButton);
  }

  async getOrderConfirmation(): Promise<string> {
    return this.page.innerText(this.completeHeader);
  }

  async getErrorMessage(): Promise<string> {
    return this.page.innerText(this.errorMessage);
  }

  async getPaymentDetails(): Promise<{
    itemTotal: string;
    tax: string;
    total: string;
  }> {
    return {
      itemTotal: await this.page.locator(this.itemTotal).innerText(),
      tax: await this.page.locator(this.tax).innerText(),
      total: await this.page.locator(this.total).innerText(),
    };
  }
}
