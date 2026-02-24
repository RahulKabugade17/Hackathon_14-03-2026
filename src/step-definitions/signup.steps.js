import { Given, Then } from '@wdio/cucumber-framework';
import { signupAs } from '../page-objects/signup.page.js';
import HomePage from '../page-objects/home.page.js';
import LanguagePage from '../page-objects/language.page.js';
import { handleSystemPermissions } from '../utils/custom-commands.js';
import DeleteAccountPage from '../page-objects/delete-account.page.js';
import signupData from '../test-data/signup.data.json';

Given('I am registered as {string}', async function (persona) {
    this.persona = persona;
    await LanguagePage.selectEnglishLanguage();
    await handleSystemPermissions();
    await signupAs(persona);
});

Then('I should land on the home dashboard', async function () {
    await HomePage.verifyHomePageLoaded();
    await HomePage.clickOnProfileSection();
    const otp = signupData[this.persona].otp
    await DeleteAccountPage.deleteAccount(otp);
});
