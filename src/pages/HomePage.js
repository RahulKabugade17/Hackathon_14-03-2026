import { waitAndFindElement, waitAndClick } from '../utils/CustomCommands.js';

class HomePage {
    selectors = {
        promoCloseButton: { droid: '~Close' },
        onboardingSkipButtons: [
            '~topcard-opus-id-tooltip-skip-button',
            '~ic-toggle-switch-tooltip-skip-button',
            '~ic-opus-id-tooltip-skip-button'
        ]
    };



    async goToProfile() {
        await waitAndClick(this.selectors.profileSection);
    }

    async skipTooltips() {
        for (const selector of this.selectors.onboardingSkipButtons) {
            const el = await $(selector);
            if (await el.isDisplayed()) {
                await el.click();
                return;
            }
        }
    }

    async closePromo() {
        await waitAndClick(this.selectors.promoCloseButton, 5000).catch(() => { });
    }

    async verifyHomePageLoaded() {
        await this.closePromo();
        await this.skipOnboarding();
    }
}

export default new HomePage();
