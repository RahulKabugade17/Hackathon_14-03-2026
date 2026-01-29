import LanguagePage from '../pages/LanguagePage.js';
import LoginPage from '../pages/LoginPage.js';
import loginData from '../fixtures/login.json' with { type: 'json' };
import { handleSystemPermissions } from '../utils/CustomCommands.js';

export async function loginAs(persona) {
    const data = loginData[persona];
    await handleSystemPermissions();
    await LanguagePage.selectEnglish();
    await handleSystemPermissions();
    await LoginPage.login(data.mobileNumber, data.otp);
    if (persona === 'login_trade_contractor') {
        await LoginPage.clickConfirmLocationButton();
    }
}
