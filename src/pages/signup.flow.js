import LoginPage from './LoginPage.js';
import ProfilePage from './ProfilePage.js';
import ProfileDetailsPage from './ProfileDetailsPage.js';
import LocationPage from './LocationPage.js';
import PanKycPage from './PanKycPage.js';
import BankKycPage from './BankKycPage.js';
import Bankaccountpage from './Bankaccountpage.js';

import signupData from '../fixtures/Sign Up/signup.json' with { type: 'json' };
import kycData from '../fixtures/Sign Up/kyc.json' with { type: 'json' };

export async function signupAs(persona) {
    const signup = signupData[persona];
    const kyc = kycData;
    await LoginPage.login(signup.mobileNumber, signup.otp);
    await LoginPage.handleOverlays();
    await ProfileDetailsPage.openProfileDetailsStep();
    switch (persona) {
        case 'contractor':
            await ProfileDetailsPage.selectContractorPersona();
            await LocationPage.selectLocation();
            await ProfileDetailsPage.enterDetails('Test', 'Contractor');
            await PanKycPage.verifyPan(kyc.pan);
            await BankKycPage.verifyBank(kyc.upi);
            break;
        case 'painter':
            await ProfileDetailsPage.selectPainterPersona();
            await ProfileDetailsPage.addContractorDetails(signup.contractorMobileNumber);
            await LocationPage.selectLocation();
            await ProfileDetailsPage.enterDetails('Test', 'Painter');
            await PanKycPage.verifyPan(kyc.pan);
            await Bankaccountpage.verifyBankDetails(kyc.account_number, kyc.ifsc_code);
            break;
    }
    await ProfilePage.skipToHome();
}
