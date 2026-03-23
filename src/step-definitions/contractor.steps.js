import { Then, When } from '@wdio/cucumber-framework';

import GeneralDetailsPage from '../page-objects/general-details.page.js';
import HomePage from '../page-objects/home.page.js';
import EditKycPage from '../page-objects/kyc-details.page.js';
import ProfileDetailsPage from '../page-objects/profile.page.js';
import DeleteAccountPage from '../page-objects/delete-account.page.js';
import contractorData from '../test-data/contractor.data.json' with { type: 'json' };

When('I click on Loyalty Tier Card', async function () {
    await HomePage.skipOnboarding();
    await HomePage.verifyHomePageLoaded();
    await HomePage.clickCompleteKyc();
    await ProfileDetailsPage.verifyOpusIdCardDetails();
});

When('I update my profile image', async function () {
    await ProfileDetailsPage.uploadProfileImage();
});

When('I share my Opus ID as Image', async function () {
    await ProfileDetailsPage.shareOpusId('Image');
});

When('I download my Opus ID as Image', async function () {
    await ProfileDetailsPage.downloadOpusId('Image');
});

When('I update my general details', async function () {
    const data = contractorData;
    await GeneralDetailsPage.clickGeneralDetails();
    await GeneralDetailsPage.editPersonalDetails(data.generalInformation);
});

When('I verify my work location', async function () {
    await ProfileDetailsPage.openKycDetails();
});

When('I update my kyc details', async function () {
    await ProfileDetailsPage.openKycDetails();
    await EditKycPage.editKycDetails();
});

Then('I should see all updates saved successfully, KYC status as verified, and payment method set as default', async function () {
    await EditKycPage.verifyKycDetails();

    await HomePage.clickOnProfileSection();
    const data = contractorData;
    await DeleteAccountPage.deleteAccount(data.otp);
});
