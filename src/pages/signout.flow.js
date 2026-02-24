import SignoutPage from './SignoutPage.js';
import { clickIfPresent } from '../utils/CustomCommands.js';

export async function signoutAs(persona) {
    await SignoutPage.openDrawerMenu();
    const tooltipSelectors = [
        SignoutPage.selectors.languageTooltipSubmitButton,
        SignoutPage.selectors.myProjectsTooltipSubmitButton,
        SignoutPage.selectors.icMyProjectsTooltipSubmitButton
    ];
    for (let i = 0; i < 2; i++) {
        for (const selector of tooltipSelectors) {
            await clickIfPresent(selector);
        }
        await driver.pause(200);
    }
    await SignoutPage.signout();
}