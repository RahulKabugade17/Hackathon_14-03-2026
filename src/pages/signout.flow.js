import SignoutPage from './SignoutPage.js';
import loginData from '../fixtures/Login/login.json' with { type: 'json' };

export async function signoutAs(persona) {
    const data = loginData[persona];
    await SignoutPage.openDrawerMenu();
    if (persona === 'institutional_contractor') {
        await SignoutPage.icMyProjectsTooltipSubmitButton();
    }
    else if (persona === 'contractor' || persona === 'trade_contractor') {
        await SignoutPage.languageTooltipSubmitButton();
        await SignoutPage.myProjectsTooltipSubmitButton();
    }
    else if (persona === 'painter') {
        await SignoutPage.languageTooltipSubmitButton();
    }
    await SignoutPage.signout();
}
