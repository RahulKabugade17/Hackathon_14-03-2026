import { Given } from "@wdio/cucumber-framework";
import LanguagePage from "../pages/LanguagePage.js";
import LoginPage from "../pages/LoginPage.js";
import HomePage from "../pages/HomePage.js";
import loginData from "../fixtures/login.json" with { type: "json" };
import { handleSystemPermissions } from "../utils/CustomCommands.js";

Given("I login as contractor", async function () {
    const { mobileNumber, otp } = loginData;

    await LanguagePage.clickonSelectLanguageButton();
    await LanguagePage.clickonEnglishOption();

    await handleSystemPermissions();
    await LoginPage.login(mobileNumber);
    await LoginPage.enterOtp(otp);

    await HomePage.closePromo();
    await HomePage.skipOnboarding();

    console.log("[LOGIN] Contractor logged in successfully");
});
