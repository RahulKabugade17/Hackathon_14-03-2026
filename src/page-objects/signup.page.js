import LoginPage from './login.page.js';
import ProfileDetailsPage from './profile.page.js';
import LocationPage from './location.page.js';
import PanKycPage from './pankyc.page.js';
import BankKycPage from './bankupi.page.js';
import BankAccountPage from './bank-account.page.js';
import signupData from '../test-data/signup.data.json';
import kycData from '../test-data/kyc.data.json';
import LanguagePage from '../page-objects/language.page.js';
import Gestures from '../utils/gestures.js';
import { handleSystemPermissions } from '../utils/custom-commands.js';

export async function signupAs(persona) {
    const signup = signupData[persona];
    await LanguagePage.selectEnglishLanguage();
    await handleSystemPermissions();
    await LoginPage.login(signup.mobileNumber, signup.otp);
    await LoginPage.handleOverlays();
    await ProfileDetailsPage.openProfileDetails();
    switch (persona) {
        case 'painter':
            await ProfileDetailsPage.selectPainterPersona();
            await ProfileDetailsPage.addContractorDetails(signup.contractorMobileNumber);
            await LocationPage.selectLocation(signupData.defaultLocation);
            await ProfileDetailsPage.uploadProfileImage();
            await ProfileDetailsPage.enterDetails(signup.firstName, signup.lastName, signup.email);
            await PanKycPage.verifyPan(kycData.pan);
            await BankAccountPage.verifyBankDetails(kycData.account_number, kycData.ifsc_code);
            break;
        case 'painter-no-kyc':
            await ProfileDetailsPage.selectPainterPersona();
            await ProfileDetailsPage.addContractorDetails(signup.contractorMobileNumber);
            await LocationPage.selectcurrentlocation();
            await ProfileDetailsPage.uploadProfileImage();
            await ProfileDetailsPage.enterDetails(signup.firstName, signup.lastName, signup.email);
            break;
        case 'contractor':
            await ProfileDetailsPage.selectContractorPersona();
            await LocationPage.selectLocation(signupData.defaultLocation);
            await ProfileDetailsPage.uploadProfileImage();
            await ProfileDetailsPage.enterDetails(signup.firstName, signup.lastName, signup.email);
            await PanKycPage.verifyPan(kycData.pan);
            await BankKycPage.verifyBank(kycData.upi);
            break;
        case 'contractor-no-kyc':
            await ProfileDetailsPage.selectContractorPersona();
            await LocationPage.selectcurrentlocation();
            await ProfileDetailsPage.uploadProfileImage();
            await ProfileDetailsPage.enterDetails(signup.firstName, signup.lastName, signup.email);
            break;

    }
    for (let i = 0; i < 2; i++) await Gestures.swipeUp(0.6);
    await ProfileDetailsPage.skipToHome();
}