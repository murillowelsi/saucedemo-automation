import { Environment } from "../config/environment";
import { expect, test } from "../config/test.fixture";

test.describe("Login Tests", () => {
  test(
    "Successful login with valid credentials",
    {
      tag: "@regression",
      annotation: [
        {
          type: "issue",
          description: "https://github.com/microsoft/playwright/issues/23180",
        },
        { type: "performance", description: "very slow test!" },
      ],
    },

    async ({ loginPage }) => {
      await loginPage.login(
        Environment.standardUser.username,
        Environment.standardUser.password
      );
      await expect(loginPage.page).toHaveURL(/inventory.html/);
    }
  );

  test(
    "Login with locked out user",
    {
      tag: "@smoke",
      annotation: [
        {
          type: "issue",
          description: "https://github.com/microsoft/playwright/issues/23180",
        },
        { type: "performance", description: "very slow test!" },
      ],
    },
    async ({ loginPage }) => {
      await loginPage.login(
        Environment.lockedOutUser.username,
        Environment.standardUser.password
      );
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toContain(
        "Epic sadface: Sorry, this user has been locked out."
      );
    }
  );
});
