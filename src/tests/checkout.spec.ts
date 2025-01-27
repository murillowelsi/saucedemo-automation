import { Environment } from "../config/environment";
import { expect, test } from "../config/test.fixture";

test.describe("Checkout Process Tests", () => {
  test("Complete checkout with valid information", async ({ checkoutPage }) => {
    await checkoutPage.enterUserInfo(
      Environment.checkoutUser.firstName,
      Environment.checkoutUser.lastName,
      Environment.checkoutUser.zipCode
    );
    await checkoutPage.continueToOverview();
    await checkoutPage.completeCheckout();

    const confirmation = await checkoutPage.getOrderConfirmation();
    expect(confirmation).toContain("Thank you for your order!");
  });

  test("Verify required field validations", async ({ checkoutPage }) => {
    await checkoutPage.continueToOverview();
    const errorMessage = await checkoutPage.getErrorMessage();
    expect(errorMessage).toContain("Error: First Name is required");
  });

  test("Verify payment calculations", async ({ checkoutPage }) => {
    await checkoutPage.enterUserInfo(
      Environment.checkoutUser.firstName,
      Environment.checkoutUser.lastName,
      Environment.checkoutUser.zipCode
    );
    await checkoutPage.continueToOverview();

    const paymentDetails = await checkoutPage.getPaymentDetails();
    const itemTotal = parseFloat(
      paymentDetails.itemTotal.replace(/[^0-9.]/g, "")
    );
    const tax = parseFloat(paymentDetails.tax.replace(/[^0-9.]/g, ""));
    const total = parseFloat(paymentDetails.total.replace(/[^0-9.]/g, ""));

    expect(total).toBeCloseTo(itemTotal + tax);
  });

  test("Validate order completion flow", async ({ checkoutPage }) => {
    await checkoutPage.enterUserInfo(
      Environment.checkoutUser.firstName,
      Environment.checkoutUser.lastName,
      Environment.checkoutUser.zipCode
    );
    await checkoutPage.continueToOverview();
    await checkoutPage.completeCheckout();

    await expect(checkoutPage.page).toHaveURL(/checkout-complete.html/);
    const confirmation = await checkoutPage.getOrderConfirmation();
    expect(confirmation).toMatch(/THANK YOU FOR YOUR ORDER/i);
  });
});
