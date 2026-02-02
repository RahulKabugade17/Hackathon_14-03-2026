import { Then } from '@wdio/cucumber-framework';
import HelpCenterPage from '../pages/HelpCenter.page.js';
import HomePage from '../pages/HomePage.js';

Then('I execute the Help Center and Support verification flow', async () => {
    await HomePage.verifyHomePageLoaded();
    await HelpCenterPage.navigateToHelpCenter();
    await HelpCenterPage.verifyAllHelpOptionsVisible();
    await HelpCenterPage.tapCallNow();
    await HelpCenterPage.validateDialerOpened();
    await HelpCenterPage.returnFromDialer();
    await HelpCenterPage.tapFAQs();
    await HelpCenterPage.verifyFaqScreenOpened();
    await HelpCenterPage.navigateBack();
    await HelpCenterPage.tapFindMoreHelp();
    await HelpCenterPage.tapOnboardingNext();
    await HelpCenterPage.tapOnboardingNext();
    await HelpCenterPage.tapOnboardingSkip();
});
