import { Locator, Page } from "playwright";
import { BasePage } from "./Base.page";
import { expect } from "playwright/test";

export class DeleteAccountPage extends BasePage {
    accountDeletedHeader: Locator;
    continueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.accountDeletedHeader = page.getByRole("heading", { name: "Account Deleted!" });
        this.continueButton = page.getByRole("link", { name: "Continue" });
    }

    async verifyAccountDeleted() {
        await expect(this.accountDeletedHeader).toBeVisible();
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }
} 