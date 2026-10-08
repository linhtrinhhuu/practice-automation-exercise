import { Locator, Page } from "playwright";
import { BasePage } from "./Base.page";
import { expect } from "playwright/test";

export class SignupPage extends BasePage {
    informationHeader: Locator;
    mrTitleRadioButton: Locator;
    mrsTitleRadioButton: Locator;
    usernameInput: Locator;
    // emailInput: Locator;
    passwordInput: Locator;
    birthDaySelect: Locator;
    birthMonthSelect: Locator;
    birthYearSelect: Locator;
    newsletterCheckbox: Locator;
    offersCheckbox: Locator;

    firstNameInput: Locator;
    lastNameInput: Locator;
    addressInput: Locator;
    countrySelect: Locator;
    stateInput: Locator;
    cityInput: Locator;
    zipCodeInput: Locator;
    mobileNumberInput: Locator;

    createAccountButton: Locator;

    constructor(page: Page) {
        super(page);
        this.informationHeader = page.getByText("Enter Account Information");
        this.mrTitleRadioButton = page.getByRole("radio", { name: "Mr." });
        this.mrsTitleRadioButton = page.getByRole("radio", { name: "Mrs." });
        this.usernameInput = page.getByRole("textbox", { name: /Name */ });
        // this.emailInput = page.getByRole("textbox", { name: "Email" });
        this.passwordInput = page.getByRole("textbox", { name: "Password" });
        this.birthDaySelect = page.getByRole("combobox").filter({hasText: "Day"});
        this.birthMonthSelect = page.getByRole("combobox").filter({hasText: "Month"});
        this.birthYearSelect = page.getByRole("combobox").filter({hasText: "Year"});
        this.newsletterCheckbox = page.getByRole("checkbox", { name: "Sign up for our newsletter!" });
        this.offersCheckbox = page.getByRole("checkbox", { name: "Receive special offers" });
        
        this.firstNameInput = page.getByRole("textbox", { name: "First name" });
        this.lastNameInput = page.getByRole("textbox", { name: "Last name" });
        this.addressInput = page.getByRole("textbox", { name: "Address *" });
        this.countrySelect = page.getByRole("combobox", { name: "Country" });
        this.stateInput = page.getByRole("textbox", { name: "State" });
        this.cityInput = page.locator("#city"); // City and Zipcode have same label is city so I have to get locator by id. 
        this.zipCodeInput = page.locator("#zipcode");
        this.mobileNumberInput = page.getByRole("textbox", {name: "Mobile Number"});

        this.createAccountButton = page.getByRole("button", {name: "Create Account"});
    }

    async verifyInformationHeaderIsVisible() {
        await expect(this.informationHeader).toBeVisible;
    }

    async checkOnMrTitle() {
        await this.mrTitleRadioButton.check();
    }

    async checkOnMrsTitle() {
        await this.mrsTitleRadioButton.check();
    }

    async fillUserName(username: string) {
        await this.usernameInput.fill(username);
    }

    // async fillEmail(email: string) {
    //     await this.emailInput.fill(email);
    // }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async selectDateOfBirth(day: string, month: string, year: string) {
        await this.birthDaySelect.selectOption(day);
        await this.birthMonthSelect.selectOption(month);
        await this.birthYearSelect.selectOption(year);
    }

    async checkOnNewsletter() {
        await this.newsletterCheckbox.check();
    }

    async checkOnReceiveOffers() {
        await this.offersCheckbox.check();
    }

    async fillFirstName(firstName: string) {
        await this.firstNameInput.fill(firstName);
    }

    async fillLastName(lastName: string) {
        await this.lastNameInput.fill(lastName);
    }

    async fillAddress(address: string) {
        await this.addressInput.fill(address);
    }

    async selectCountry(country: string) {
        await this.countrySelect.selectOption(country);
    }

    async fillState(state: string) {
        await this.stateInput.fill(state);
    }

    async fillCity(city: string) {
        await this.cityInput.fill(city);
    }

    async fillZipCode(zipCode: string) {
        await this.zipCodeInput.fill(zipCode);
    }

    async fillMobileNumber(mobileNumber: string) {
        await this.mobileNumberInput.fill(mobileNumber);
    }

    async clickCreateAccountButton(){
        await this.createAccountButton.click();
    }
}