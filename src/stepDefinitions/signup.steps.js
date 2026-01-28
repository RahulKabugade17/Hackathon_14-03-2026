import { Given, When, Then } from '@wdio/cucumber-framework';
import { handleSystemPermissions } from '../utils/CustomCommands.js';
import LoginPage from '../pages/LoginPage.js';
import HomePage from '../pages/HomePage.js';
import ProfilePage from '../pages/ProfilePage.js';
import LanguagePage from '../pages/LanguagePage.js';
import LocationPage from '../pages/LocationPage.js';
import ProfileDetailsPage from '../pages/ProfileDetailsPage.js';
import PanKycPage from '../pages/PanKycPage.js';
import BankKycPage from '../pages/BankKycPage.js';
import DeleteAccountPage from '../pages/DeleteAccountPage.js';
import loginData from '../fixtures/login.json' with { type: 'json' };

Given('I launch the Birla Opus app', async () => {
    await LanguagePage.selectEnglish();
    await handleSystemPermissions();
});

When('I sign up as a {string}', async (persona) => {
    const data = loginData[persona];
    if (!data) {
        throw new Error(`No signup data found for persona: ${persona}`);
    }
    await LoginPage.login(data.mobileNumber, data.otp);
    await handleSystemPermissions();
    await LoginPage.handleOverlays();

    switch (persona) {
        case 'new_contractor':
            await ProfileDetailsPage.selectContractorPersona();
            await LocationPage.selectLocation();
            await ProfileDetailsPage.enterDetails('Test', 'Contractor');
            await PanKycPage.verifyPan(data.pan);
            await BankKycPage.verifyBank(data.upi);
            await ProfilePage.skipToHome();
            break;

        case 'new_painter':
            await ProfileDetailsPage.selectPainterPersona();
            await LocationPage.selectLocation();
            await ProfileDetailsPage.enterDetails('Test', 'Painter');
            await PanKycPage.verifyPan(data.pan);
            await BankKycPage.verifyBank(data.upi);
            await ProfilePage.skipToHome();
            break;

        default:
            throw new Error(`Unsupported signup persona: ${persona}`);
    }
});


Then('I verify my profile on the dashboard', async () => {
    await HomePage.verifyHomePageLoaded();
    await HomePage.isProfileSectionVisible();
    // const isMobileVisible = await ProfilePage.isMobileNumberDisplayed(
    //     loginData.contractor.mobileNumber
    // );
    // await expect(isMobileVisible).toBe(true);
});

When('I perform irreversible account deletion with OTP', async () => {
    await DeleteAccountPage.deleteAccount(loginData.contractor.otp);
});

Then('I verify the account is successfully deleted and released for reuse', async () => {
    const atLoginPage = await LoginPage.isAtLoginPage();
    await expect(atLoginPage).toBe(true);

    await LoginPage.enterMobile(loginData.contractor.mobileNumber);
    await LoginPage.acceptTermsAndPrivacy();
    await LoginPage.clickSendOtp();

    const bannerText = await LoginPage.getNotRegisteredMessage();
    await expect(bannerText).toContain('This number is not registered with us');
});
