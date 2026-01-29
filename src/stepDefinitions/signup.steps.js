import { Given, Then } from '@wdio/cucumber-framework';
import { signupAs } from '../utils/signup.flow.js';
import HomePage from '../pages/HomePage.js';
import LanguagePage from '../pages/LanguagePage.js';
import { handleSystemPermissions } from '../utils/CustomCommands.js';
import loginData from '../fixtures/login.json' with { type: 'json' };

Given('I am registered as {string}', async function (persona) {
    await LanguagePage.selectEnglish();
    await handleSystemPermissions();
    await signupAs(persona, loginData[persona]);
});

Then('I should land on the home dashboard', async () => {
    await HomePage.verifyHomePageLoaded();
});
