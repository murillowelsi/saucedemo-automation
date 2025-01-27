import { Page } from "@playwright/test";
import BasePage from "./base.page";

export default class LoginPage extends BasePage {
  readonly usernameInput = "#user-name";
  readonly passwordInput = "#password";
  readonly loginButton = "#login-button";
  readonly errorMessage = '[data-test="error"]';

  constructor(page: Page) {
    super(page);
  }

  async enterUsername(username: string): Promise<void> {
    await this.page.fill(this.usernameInput, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.fill(this.passwordInput, password);
  }

  async clickLogin(): Promise<void> {
    await this.page.click(this.loginButton);
  }

  async getErrorMessage(): Promise<string> {
    return this.page.innerText(this.errorMessage);
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }
}
