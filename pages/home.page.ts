import { Locator, Page } from "playwright";
import { BasePage } from "./Base.page";
import { expect } from "playwright/test";

export class HomePage extends BasePage {
    pageURL: string;
    slides: Locator;

    constructor(page: Page) {
        super(page);
        this.slides = page.locator("#slider-carousel");
        this.pageURL = "https://www.automationexercise.com/";
    }

    async go() {
        await this.page.goto(this.pageURL);
    }

    async verifyHomePageIsVisible() {
        await expect(this.slides).toBeVisible();
    }
}