
import { waitAndClick } from '../utils/CustomCommands.js';

class HomePage {
    selectors = {
        onboardingSkipButtons: [
            '~topcard-opus-id-tooltip-skip-button',
            '~~ic-toggle-switch-tooltip-skip-button',
            '~ic-opus-id-tooltip-skip-button'
        ],
        Rating: 'android=new UiSelector().resourceId("ct_nps-button-10")',
        Next: 'android=new UiSelector().resourceId("ct_nextButton")',
        OptionOne: 'android=new UiSelector().text("Application of Paint")',
        OptionTwo: 'android=new UiSelector().text("Quality of Products")',
        Submit: 'android=new UiSelector().resourceId("ct_submitButton")'
    };

    async skipOnboarding() {
        await driver.pause(500);
        for (const selector of this.selectors.onboardingSkipButtons) {
            const el = await $(selector);
            if (await el.isDisplayed()) {
                await el.click();
                return;
            }
        }
    }

    async feedback() {
        await waitAndClick(this.selectors.Rating);
        await waitAndClick(this.selectors.Next);
        await waitAndClick(this.selectors.OptionOne);
        await waitAndClick(this.selectors.OptionTwo);
        await waitAndClick(this.selectors.Submit);
        await driver.pause(5000);
    }

    async verifyHomePageLoaded() {
        await this.feedback();
        await this.skipOnboarding();
    }
}

export default new HomePage();
