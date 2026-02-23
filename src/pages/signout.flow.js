import SignoutPage from './SignoutPage.js';

export async function signoutAs(persona) {
    await SignoutPage.openDrawerMenu();
    const tooltipSelectors = [
        SignoutPage.selectors.languageTooltipSubmitButton,
        SignoutPage.selectors.myProjectsTooltipSubmitButton,
        SignoutPage.selectors.icMyProjectsTooltipSubmitButton
    ];

    // run multiple passes to handle animation/race
    for (let i = 0; i < 2; i++) {
        for (const selector of tooltipSelectors) {
            await clickIfPresent(selector);
        }
        await driver.pause(200);
    }
    await SignoutPage.signout();
}