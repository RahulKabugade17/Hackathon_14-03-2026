import { Given, When, Then } from '@wdio/cucumber-framework';
import { signupAs } from '../utils/signup.flow.js';
import HomePage from '../pages/HomePage.js';
import LanguagePage from '../pages/LanguagePage.js';
import { handleSystemPermissions } from '../utils/CustomCommands.js';
import loginData from '../fixtures/login.json' with { type: 'json' };

Given('I launch the Birla Opus app', async () => {
    await LanguagePage.selectEnglish();
    await handleSystemPermissions();
});

When('I sign up as a {string}', async (persona) => {
    await signupAs(persona, loginData[persona]);
});

Then('I verify my profile on the dashboard', async () => {
    await HomePage.verifyHomePageLoaded();
});

// When('I perform irreversible account deletion with OTP', async () => {
//     await DeleteAccountPage.deleteAccount(loginData.contractor.otp);
// });

// Then('I verify the account is successfully deleted and released for reuse', async () => {
//     const atLoginPage = await LoginPage.isAtLoginPage();
//     await expect(atLoginPage).toBe(true);

//     await LoginPage.enterMobile(loginData.contractor.mobileNumber);
//     await LoginPage.acceptTermsAndPrivacy();
//     await LoginPage.clickSendOtp();

//     const bannerText = await LoginPage.getNotRegisteredMessage();
//     await expect(bannerText).toContain('This number is not registered with us');
// });
