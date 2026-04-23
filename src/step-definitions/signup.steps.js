import { Given, Then } from '@wdio/cucumber-framework';
import { signupAs } from '../page-objects/signup.page.js';
import HomePage from '../page-objects/home.page.js';

Given('the user is registered as {string}', async function (persona) {
    this.persona = persona;
    await signupAs(persona);
});

Then('the user should land on the home dashboard', async function () {
    await HomePage.verifyDashboardAndDeleteUser(this.persona);
});
