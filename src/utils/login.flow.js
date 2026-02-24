import LanguagePage from '../page-objects/language.page.js';
import LoginPage from '../page-objects/login.page.js';
import loginData from '../test-data/login.data.json' with { type: 'json' };
import { handleSystemPermissions } from './custom-commands.js';

export async function loginAs(persona) {
    const data = loginData[persona];
    await LanguagePage.selectEnglish();
    await handleSystemPermissions();
    await LoginPage.login(data.mobileNumber, data.otp);
    if (persona === 'trade_contractor') {
        await LoginPage.clickConfirmLocationButton();
    }
}
