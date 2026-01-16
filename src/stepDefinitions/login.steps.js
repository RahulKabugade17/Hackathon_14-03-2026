import { Given } from "@wdio/cucumber-framework";
import LanguagePage from "../pages/LanguagePage.js";
import LoginPage from "../pages/LoginPage.js";
import HomePage from "../pages/HomePage.js";
import loginData from "../fixtures/login.json" with { type: "json" };
import { handleSystemPermissions } from "../utils/CustomCommands.js";
import { loginContractor } from "../utils/loginApiClient.js";

Given("I login as contractor", async function () {
    const { mobileNumber, otp } = loginData;
    // this.authToken = await loginContractor(mobileNumber, otp); 
    // console.log("✅ AUTH TOKEN OBTAINED");

    await LanguagePage.clickonSelectLanguageButton();
    await LanguagePage.clickonEnglishOption();

    await handleSystemPermissions();

    try {
        await LoginPage.login(mobileNumber);
        await LoginPage.enterOtp(otp);
    } catch (error) {
        throw new Error(`[LOGIN FLOW FAILED] ${error.message}`);
    }

    await HomePage.closePromo();
    await HomePage.skipOnboarding();
});
