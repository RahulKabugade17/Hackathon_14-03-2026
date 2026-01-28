import {
    waitAndFindElement,
    waitAndClick,
    waitForElementVisible
} from '../utils/CustomCommands.js';

class HomePage {
    selectors = {
        promoCloseButton: { droid: '~Close' },
        onboardingSkipButtons: [
            '~topcard-opus-id-tooltip-skip-button',
            '~ic-toggle-switch-tooltip-skip-button',
            '~ic-opus-id-tooltip-skip-button'
        ],
        profileSection: { droid: '~user-type-complete-kyc' }
    };

    async skipOnboarding() {
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
        await driver.pause(600);
        await this.closePromo();
        await this.skipOnboarding();
    }

    async isProfileSectionVisible() {
        const el = await waitForElementVisible(this.selectors.profileSection);
        return await el.isDisplayed();
    }
}

export default new HomePage();
