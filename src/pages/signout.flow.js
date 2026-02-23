import SignoutPage from './SignoutPage.js';

export async function signoutAs(persona) {
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