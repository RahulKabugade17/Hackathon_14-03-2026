import LoginPage from './LoginPage.js';
import ProfileDetailsPage from './ProfileDetailsPage.js';
import LocationPage from './LocationPage.js';
import PanKycPage from './PanKycPage.js';
import BankKycPage from './BankKycPage.js';
import BankAccountPage from './Bankaccountpage.js';
import signupData from '../fixtures/Sign Up/signup.json' with { type: 'json' };
import kycData from '../fixtures/Sign Up/kyc.json' with { type: 'json' };

export async function signupAs(persona) {
    const signup = signupData[persona];
    await LoginPage.login(signup.mobileNumber, signup.otp);
    await LoginPage.handleOverlays();
    await ProfileDetailsPage.openProfileDetailsStep();
    switch (persona) {
        case 'painter':
            await ProfileDetailsPage.selectPainterPersona();
            await ProfileDetailsPage.addContractorDetails(signup.contractorMobileNumber);
            await LocationPage.selectLocation(signupData.defaultLocation);
            await ProfileDetailsPage.enterDetails(signup.firstName, signup.lastName);
            await PanKycPage.verifyPan(kycData.pan);
            await BankAccountPage.verifyBankDetails(kycData.account_number, kycData.ifsc_code);
            break;
        case 'contractor':
            await ProfileDetailsPage.selectContractorPersona();
            await LocationPage.selectLocation(signupData.defaultLocation);
            await ProfileDetailsPage.enterDetails(signup.firstName, signup.lastName);
            await PanKycPage.verifyPan(kycData.pan);
            await BankKycPage.verifyBank(kycData.upi);
            break;
    }
    await ProfileDetailsPage.skipToHome();
}