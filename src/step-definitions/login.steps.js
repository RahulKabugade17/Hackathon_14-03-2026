import { Given, Then } from '@wdio/cucumber-framework';
import { loginAs } from '../utils/login.flow.js';
import HomePage from '../page-objects/home.page.js';

Given('I am logged in as {string}', async function (persona) {
    this.userType = persona;
    await loginAs(persona);
});

Then('I should see the dashboard', async function () {
    await HomePage.verifyHomePageLoaded();
});
