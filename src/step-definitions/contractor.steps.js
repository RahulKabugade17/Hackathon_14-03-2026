import { Then, When } from '@wdio/cucumber-framework';

import GeneralDetailsPage from '../page-objects/general-details.page.js';
import HomePage from '../page-objects/home.page.js';
import EditKycPage from '../page-objects/kyc-details.page.js';
import ProfileDetailsPage from '../page-objects/profile.page.js';
import contractorData from '../test-data/contractor.data.json' with { type: 'json' };

When('I edit my profile details and KYC details with valid information', async function () {
    const data = contractorData;
    await HomePage.skipOnboarding();
    await HomePage.verifyHomePageLoaded();
    await HomePage.clickCompleteKyc();
    await ProfileDetailsPage.verifyOpusIdCardDetails();
    await ProfileDetailsPage.uploadProfileImage();
    await ProfileDetailsPage.shareOpusId('Image');
    await ProfileDetailsPage.downloadOpusId('Image');
    await GeneralDetailsPage.clickGeneralDetails();
    await GeneralDetailsPage.editPersonalDetails(data.generalInformation);
    await ProfileDetailsPage.openKycDetails();
    await EditKycPage.editKycDetails();
});

Then('I should see all updates saved successfully, KYC status as verified, and payment method set as default', async function () {
    await EditKycPage.verifyKycDetails();
});
