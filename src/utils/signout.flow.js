import SignoutPage from '../pages/SignoutPage.js';
import loginData from '../fixtures/login.json' with { type: 'json' };

export async function signoutAs(persona) {
    const data = loginData[persona];
    await SignoutPage.openDrawerMenu();
    if (persona === 'login_institutional_contractor') {
        await SignoutPage.icMyProjectsTooltipSubmitButton();
    }
    else if (persona === 'login_contractor' || persona === 'login_trade_contractor') {
        await SignoutPage.languageTooltipSubmitButton();
        await SignoutPage.myProjectsTooltipSubmitButton();
    }
    else if (persona === 'login_painter') {
        await SignoutPage.languageTooltipSubmitButton();
    }
    await SignoutPage.signout();
}
