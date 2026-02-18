import { Given, Then } from '@wdio/cucumber-framework';
import { signupAs } from '../pages/signup.flow.js';
import HomePage from '../pages/HomePage.js';
import LanguagePage from '../pages/LanguagePage.js';
import { handleSystemPermissions } from '../utils/CustomCommands.js';
import DeleteAccountPage from '../pages/DeleteAccountPage.js';
import loginData from '../fixtures/Login/login.json' with { type: 'json' };

Given('I am registered as {string}', async function (persona) {
    await LanguagePage.selectEnglish();
    await handleSystemPermissions();
    await signupAs(persona);
});

Then('I should land on the home dashboard and delete my account as {string}', async function (persona) {
    const data = loginData[persona];
    await HomePage.verifyHomePageLoaded();
    await DeleteAccountPage.deleteAccount(data.otp);
});
