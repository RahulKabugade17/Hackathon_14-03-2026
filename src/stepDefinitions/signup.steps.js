import { Given, Then } from '@wdio/cucumber-framework';
import { signupAs } from '../pages/signup.flow.js';
import HomePage from '../pages/HomePage.js';
import LanguagePage from '../pages/LanguagePage.js';
import { handleSystemPermissions } from '../utils/CustomCommands.js';
import DeleteAccountPage from '../pages/DeleteAccountPage.js';
import signupData from '../fixtures/Sign Up/signup.json' with { type: 'json' };

Given('I am registered as {string}', async function (persona) {
    this.persona = persona;
    await LanguagePage.selectEnglish();
    await handleSystemPermissions();
    await signupAs(persona);
});

Then('I should land on the home dashboard', async function () {
    await HomePage.verifyHomePageLoaded();
    const otp = signupData[this.persona].otp
    await DeleteAccountPage.deleteAccount(otp);
});
