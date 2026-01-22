import { waitAndClick, waitForElementVisible } from '../utils/CustomCommands.js';

class HomePage {
    selectors = {
        promoCloseButton: { droid: '~Close' },
        onboardingSkipButtons: [
            '~topcard-opus-id-tooltip-skip-button',
            '~~ic-toggle-switch-tooltip-skip-button',
            '~ic-opus-id-tooltip-skip-button',
            '~~language-tooltip-skip-button'
        ],
        profileSection: { droid: '~user-type-complete-kyc' }

    };



    async goToProfile() {
        await waitAndClick(this.selectors.profileSection);
    }

    async skipTooltips() {
        for (const selector of this.selectors.onboardingSkipButtons) {
            const el = await $(selector);
            if (await el.isDisplayed()) {
                await el.click();
                console.log('[HOME] Onboarding skipped');
                return;
            }
        }
        console.log('[HOME] No onboarding to skip');
    }

    async closePromo() {
        await waitAndClick(this.selectors.promoCloseButton);
        console.log('[HOME] Promo closed');
    }
}

export default new HomePage();
