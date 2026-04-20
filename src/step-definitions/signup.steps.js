import { Given, Then } from '@wdio/cucumber-framework';
import { signupAs } from '../page-objects/signup.page.js';
import HomePage from '../page-objects/home.page.js';

Given('I am registered as {string}', async function (persona) {
    this.persona = persona;
    await signupAs(persona);
});

Then('I should land on the home dashboard', async function () {
    await HomePage.verifyDashboardAndDeleteUser(this.persona);
});
