import { Then } from '@wdio/cucumber-framework';
import { signoutAs } from '../pages/signout.flow.js';

Then('I should be able to sign out as {string}', async function (persona) {
    this.userType = persona;
    await signoutAs(persona);
});

