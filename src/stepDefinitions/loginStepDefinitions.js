import { Given, When, Then } from "@wdio/cucumber-framework";
import loginPage from "../pages/login.js";
import loginData from "../fixtures/login.json";

Given("user is on the mobile login screen", async function () {
  await loginPage.clickLanguageContinue();
});

When("user logs in with mobile number and OTP", async function () {
  const { mobileNumber, otp } = loginData;  
  await loginPage.loginWithMobileAndOtp(mobileNumber, otp);
});

Then("user should be logged in successfully", async function () {
  
   await loginPage.verifyHomeScreen();
});
