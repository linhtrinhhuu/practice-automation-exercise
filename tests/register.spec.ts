import { test } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { SignupPage } from "../pages/signup.page";
import { AccountCreatedPage } from "../pages/account-created.page";
import { DeleteAccountPage } from "../pages/delete-account.page";

test.describe("Register user", async () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let signupPage: SignupPage;
    let accountCreatedPage: AccountCreatedPage;
    let deleteAccountPage: DeleteAccountPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        signupPage = new SignupPage(page);
        accountCreatedPage = new AccountCreatedPage(page);
        deleteAccountPage = new DeleteAccountPage(page);
    });

    test("Register a valid user", async () => {
        let randomStr = Math.random().toString(36).substring(2, 8);
        const registerData = {
            userName: `linh ${randomStr}`,
            email: `linh${randomStr}@mail.com`,
            password: `1999${randomStr}`,
            firstName: "Linh",
            lastName: "Trinh",
            address: "PD",
            country: "Singapore",
            state: "N/A",
            city: "HN",
            zipCode: "100000",
            mobileNumber: "8476555269"
        };

        // Step 1: Negative homepage and verify it is visible
        await test.step("Step 1: Negative homepage and verify it is visible", async () => {
            await homePage.go();
            await homePage.verifyHomePageIsVisible();
        });

        // Step 2: Negative login page and verify it is visible
        await test.step("Step 2: Negative login page and verify it is visible", async () => {
            await homePage.clickSignUpLoginButton();
            await loginPage.verifySignupHeaderIsVisible();
        });

        // Step 3: Perform to signup an account and verify signup page is visible
        await test.step("Step 3: Perform to signup an account and verify signup page is visible", async () => {
            await loginPage.fillName(registerData.userName);
            await loginPage.fillEmail(registerData.email);
            await loginPage.clickSignupButton();

            await signupPage.verifyInformationHeaderIsVisible();
        });

        // Step 4: Fill details to create account and verify account created
        await test.step("Step 4: Fill details to create account and verify account created", async () => {
            //Account Information
            await signupPage.checkOnMrTitle();
            // await signupPage.fillUserName(`Q${registerData.userName}`);
            // await signupPage.fillEmail(`Q${registerData.email}`);
            await signupPage.fillPassword(`Q${registerData.password}`);
            await signupPage.selectDateOfBirth("23", "December", "1999");
            await signupPage.checkOnNewsletter();
            await signupPage.checkOnReceiveOffers();

            // Address Information
            await signupPage.fillFirstName(registerData.firstName);
            await signupPage.fillLastName(registerData.lastName);
            await signupPage.fillAddress(registerData.address);
            await signupPage.selectCountry(registerData.country);
            await signupPage.fillState(registerData.state);
            await signupPage.fillCity(registerData.city);
            await signupPage.fillZipCode(registerData.zipCode);
            await signupPage.fillMobileNumber(registerData.mobileNumber);
            await signupPage.clickCreateAccountButton();

            await accountCreatedPage.verifyAccountCreated();
        });

        // Step 5: Verify account logged in
        await test.step("Step 5: Verify account logged in", async () => {
            await accountCreatedPage.clickContinueButton();
            await homePage.verifyLoggedIn(registerData.userName);
        });

        // Step 6: Delete account and verify account deleted
        await test.step("Step 6: Delete account and verify account deleted", async () => {
            await homePage.clickDeleteAccountButton();
            await deleteAccountPage.verifyAccountDeleted();

            await deleteAccountPage.clickContinueButton();
        });
    });
});