import { Then } from '@wdio/cucumber-framework';
import HelpCenterPage from '../pages/HelpCenter.page.js';
import HomePage from '../pages/HomePage.js';

Then('I execute the Help Center and Support verification flow', async () => {
    await HomePage.verifyHomePageLoaded();
    await HelpCenterPage.navigateToHelpCenter();
    await HelpCenterPage.verifyAllHelpOptionsVisible();
    await HelpCenterPage.call();
    await HelpCenterPage.faqs();
    await HelpCenterPage.Findmorehelp();
});
