// import { Given } from '@wdio/cucumber-framework';
import { Given } from '@wdio/cucumber-framework';
import { loginAs } from '../utils/login.flow.js';

Given('I am logged in as {string}', async function (persona) {
    this.userType = persona;
    await loginAs(persona);
});
