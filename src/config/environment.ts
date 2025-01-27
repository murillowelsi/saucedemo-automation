export class Environment {
  static get baseUrl(): string {
    return process.env.BASE_URL || "";
  }

  static get standardUser(): { username: string; password: string } {
    return {
      username: process.env.STANDARD_USER_USERNAME || "",
      password: process.env.STANDARD_USER_PASSWORD || "",
    };
  }

  static get lockedOutUser(): { username: string; password: string } {
    return {
      username: process.env.LOCKED_OUT_USER || "",
      password: process.env.STANDARD_USER_PASSWORD || "",
    };
  }

  static get checkoutUser(): {
    firstName: string;
    lastName: string;
    zipCode: string;
  } {
    return {
      firstName: process.env.CHECKOUT_USER_FIRSTNAME || "",
      lastName: process.env.CHECKOUT_USER_LASTNAME || "",
      zipCode: process.env.CHECKOUT_USER_ZIPCODE || "",
    };
  }
}
