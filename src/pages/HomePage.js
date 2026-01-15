import { waitAndClick } from '../utils/CustomCommands.js';

class HomePage {
    selectors = {
        promoCloseButton: {
            droid: '~Close',
            ios: '',
        },
        onboardingSkipButton: {
            droid: '~Skip',
            ios: '',
        },
    };

    async skipOnboarding() {
        try {
            const el = await $(this.selectors.onboardingSkipButton);
            if (await el.isDisplayed()) {
                await waitAndClick(this.selectors.onboardingSkipButton);
            }
        } catch { }
    }

    async closePromo() {
        try {
            const el = await $(this.selectors.promoCloseButton);
            if (await el.isDisplayed()) {
                await waitAndClick(this.selectors.promoCloseButton);
            }
        } catch { }
    }
}

export default new HomePage();
