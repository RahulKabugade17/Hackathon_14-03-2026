import { When, Then } from '@wdio/cucumber-framework';
import AboutProgramPage from '../pages/AboutProgram.page.js';
import SignoutPage from '../pages/SignoutPage.js';

When('I open {string} from About Program', async function (menuItem) {
    await AboutProgramPage.openAboutProgram(menuItem, this.userType);
});

Then('I should be able to sign out', async function () {
    await SignoutPage.signout();
});