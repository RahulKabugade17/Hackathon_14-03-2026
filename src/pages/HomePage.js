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
        await waitAndClick(this.selectors.onboardingSkipButton);
        console.log('[HOME] Onboarding skipped');
    }

    async closePromo() {
        await waitAndClick(this.selectors.promoCloseButton);
        console.log('[HOME] Promo closed');
    }
}

export default new HomePage();
