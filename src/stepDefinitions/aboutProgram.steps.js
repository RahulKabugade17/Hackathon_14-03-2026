import { When } from '@wdio/cucumber-framework';
import AboutProgramPage from '../pages/AboutProgram.page.js';
import HomePage from '../pages/HomePage.js';
import SignoutPage from '../pages/SignoutPage.js';

When('I open {string} from About Program', async function (menuItem) {
    await HomePage.verifyHomePageLoaded();
    await AboutProgramPage.handleTooltips(this.userType);
    await AboutProgramPage.expandAboutProgram();
    await AboutProgramPage.clickAboutProgramMenu(menuItem);
    await AboutProgramPage.verifyPageHeader(menuItem);
    await AboutProgramPage.clickHeaderBackButton();
});
Then('I should be able to sign out', async function () {
    await SignoutPage.signout();
});

