import { Given, Then } from '@wdio/cucumber-framework';
import HomePage from '../page-objects/home.page.js';
import { signupAs } from '../page-objects/signup.page.js';

Given('I am registered as {string}', async function (persona) {
    this.persona = persona;
    await signupAs(persona);
});

Then('I should land on the home dashboard', async function () {
    await HomePage.verifyHomePageLoaded();
    await HomePage.clickOnProfileSection();
});