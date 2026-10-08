import { Locator, Page } from "playwright";
import { BasePage } from "./Base.page";
import { expect } from "playwright/test";

export class AccountCreatedPage extends BasePage {
    accountCreatedHeader: Locator;
    continueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.accountCreatedHeader = page.getByRole("heading", { name: "Account Created!" });
        this.continueButton = page.getByRole("link", { name: "Continue" });
    }

    async verifyAccountCreated() {
        await expect(this.accountCreatedHeader).toBeVisible();
    }

    async clickContinueButton() {
        await this.continueButton.click(); 
    }
}