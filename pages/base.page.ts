import { Locator, Page } from "playwright";
import { expect } from "playwright/test";

export class BasePage {
    page: Page;
    signUpLoginButton: Locator;
    loggedInLabel: Locator;
    deleteAccountButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signUpLoginButton = page.getByRole("link", { name: "Signup / Login" });
        this.loggedInLabel = page.getByText("Logged in as");
        this.deleteAccountButton = page.getByRole("link", { name: "Delete Account" });
    }

    async clickSignUpLoginButton() {
        await this.signUpLoginButton.click();
    }

    async verifyLoggedIn(expectedUsername: string) {
        await expect(this.loggedInLabel).toBeVisible();
        let receivedUsername = (await this.loggedInLabel.innerText()).replace("Logged in as", "").trim();
        await expect(receivedUsername).toBe(expectedUsername);
    }

    async clickDeleteAccountButton() {
        await this.deleteAccountButton.click();
    }
}

