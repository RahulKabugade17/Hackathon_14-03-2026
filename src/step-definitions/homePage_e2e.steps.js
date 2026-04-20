import { Then, When } from '@wdio/cucumber-framework';

import GeneralDetailsPage from '../page-objects/general-details.page.js';
import HomePage from '../page-objects/home.page.js';
import EditKycPage from '../page-objects/kyc-details.page.js';
import ProfileDetailsPage from '../page-objects/profile.page.js';
import DeleteAccountPage from '../page-objects/delete-account.page.js';
import painterData from '../test-data/painter.data.json' with { type: 'json' };

When('I click on Profile Completion', async function () {
    await HomePage.skipOnboarding();
    await HomePage.verifyHomePageLoaded();
    await HomePage.clickCompleteKyc();
});

When('I navigate to General Details section', async function () {
    await GeneralDetailsPage.clickGeneralDetails();
});

When('I scroll down to Business Information section', async function () {
    await GeneralDetailsPage.scrollToBusinessInformation();
});

When('I add GST No, Company Name, and Firm Address', async function () {
    await GeneralDetailsPage.editBusinessInformation();
});

When('I navigate to KYC Details section', async function () {
    await ProfileDetailsPage.openKycDetails();
});

When('I add PAN and UPI details and verify them', async function () {
    await EditKycPage.editKycDetails();
    await EditKycPage.verifyKycDetails();
});

When('I navigate to Manage Your Team section', async function () {
    await GeneralDetailsPage.clickGeneralDetails();
    await GeneralDetailsPage.openManageYourTeam();
});

When('I add new team members with their details', async function () {
    await GeneralDetailsPage.addTeamMember();
});

Then('I should see team member request is created successfully', async function () {
    await GeneralDetailsPage.verifyTeamMemberRequestSuccess();

    await HomePage.clickOnProfileSection();
    const data = painterData;
    await DeleteAccountPage.deleteAccount(data.otp);
});
