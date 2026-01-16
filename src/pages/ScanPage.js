import { waitAndClick, waitForElementVisible } from '../utils/CustomCommands.js';

class ScanPage {
    selectors = {
        scanButton: {
            droid: '~Scan',
            ios: '',
        },
        onboardingSkipButton: {
            droid: '~Skip',
            ios: '',
        }
    };

    async goToScan() {
        await waitForElementVisible(this.selectors.scanButton);
        await waitAndClick(this.selectors.scanButton);
        console.log('[SCAN] Scan button clicked');
    }

    async skipOnboarding() {
        await waitAndClick(this.selectors.onboardingSkipButton);
        console.log('[SCAN] Onboarding skipped');
    }
}

export default new ScanPage();
