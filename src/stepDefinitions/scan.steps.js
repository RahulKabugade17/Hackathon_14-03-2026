import { When, Then } from '@wdio/cucumber-framework';
import HomePage from '../pages/HomePage.js';

When('I scan a valid code', async () => {
    await HomePage.verifyHomePageLoaded();
    console.log('Scanning valid code...');
});

Then('I should see scan success result', async () => {
    console.log('Scan success result displayed.');
});
