import { Given, Then } from '@wdio/cucumber-framework';
import { loginAs } from '../utils/login.flow.js';
import HomePage from '../page-objects/home.page.js';

Given('the user is logged in as {string}', async function (persona) {
    this.userType = persona;
    global.userType = persona;
    await loginAs(persona);
});

Then('the user should see the dashboard', async function () {
    await HomePage.verifyHomePageLoaded(global.userType);
});