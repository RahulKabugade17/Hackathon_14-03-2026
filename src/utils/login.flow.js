import LanguagePage from '../pages/LanguagePage.js';
import LoginPage from '../pages/LoginPage.js';
import HomePage from '../pages/HomePage.js';
import loginData from '../fixtures/login.json' with { type: 'json' };
import { handleSystemPermissions } from '../utils/CustomCommands.js';

export async function loginAs(persona) {
    const data = loginData[persona];

    if (!data) {
        throw new Error(`Login data not found for persona: ${persona}`);
    }

    await LanguagePage.clickonSelectLanguageButton();
    await LanguagePage.clickonEnglishOption();
    await handleSystemPermissions();

    await LoginPage.enterMobile(data.mobileNumber);
    await LoginPage.acceptTermsAndPrivacy();
    await LoginPage.clickSendOtp();
    await LoginPage.enterOtp(data.otp);

    if (persona === 'painter') {
        //await LoginPage.enterContractorPhone(data.contractorMobileNumber);
        //await LoginPage.clickContractorPhoneNextButton();
        //await LoginPage.clickContractorDetailsNextButton();
    }

    if (persona === 'trade_contractor') {
        await LoginPage.clickConfirmLocationButton();
    }

    await HomePage.closePromo();
    await HomePage.skipOnboarding();

    console.log(`[LOGIN FLOW COMPLETED] Persona: ${persona}`);
}
