import { Locator, Page } from "playwright";
import { BasePage } from "./Base.page";
import { expect } from "playwright/test";

export class LoginPage extends BasePage {
    signupHeader: Locator;
    signupNameInput: Locator;
    signupEmailInput: Locator;
    signupButton: Locator;

    constructor(page: Page) {
        super(page);
        this.signupHeader = page.getByText("New User Signup!");
        this.signupNameInput = page.getByRole("textbox", { name: "Name" });
        this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
        this.signupButton = page.getByRole("button", { name: "Signup" });
    }

    async verifySignupHeaderIsVisible() {
        await expect(this.signupHeader).toBeVisible();
    }

    async fillName(name: string) {
        await this.signupNameInput.fill(name);
    }

    async fillEmail(email: string) {
        await this.signupEmailInput.fill(email);
    }

    async clickSignupButton() {
        await this.signupButton.click();
    }
}