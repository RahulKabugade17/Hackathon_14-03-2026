import LoginPage from '../pages/LoginPage.js';
import ProfilePage from '../pages/ProfilePage.js';
import ProfileDetailsPage from '../pages/ProfileDetailsPage.js';
import LocationPage from '../pages/LocationPage.js';
import PanKycPage from '../pages/PanKycPage.js';
import BankKycPage from '../pages/BankKycPage.js';
import { handleSystemPermissions } from '../utils/CustomCommands.js';

export async function signupAs(persona, data) {
    if (!data) {
        throw new Error(`Signup data missing for persona: ${persona}`);
    }


    await LoginPage.login(data.mobileNumber, data.otp);

    await handleSystemPermissions();
    await LoginPage.handleOverlays();

    switch (persona) {
        case 'signup_contractor':
            await ProfileDetailsPage.selectContractorPersona();
            await LocationPage.selectLocation();
            await ProfileDetailsPage.enterDetails('Test', 'Contractor');
            await PanKycPage.verifyPan(data.pan);
            await BankKycPage.verifyBank(data.upi);
            break;

        case 'signup_painter':
            await ProfileDetailsPage.selectPainterPersona();
            await ProfileDetailsPage.addContractorDetails(data.contractorMobileNumber);
            await LocationPage.selectLocation();
            await ProfileDetailsPage.enterDetails('Test', 'Painter');
            await PanKycPage.verifyPan(data.pan);
            await BankKycPage.verifyBank(data.upi);
            break;

        default:
            throw new Error(`Unsupported signup persona: ${persona}`);
    }

    await ProfilePage.skipToHome();
}
