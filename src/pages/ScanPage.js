import { waitAndClick } from '../utils/CustomCommands.js';
const path = require('path');
const fs = require('fs');

class ScanPage {

    selectors = {
        scanButton: {
            droid: '//android.widget.TextView[@text="Scan"]',
            ios: '',
        },
        onboardingSkipButton: {
            droid: '~Skip',
            ios: '',
        },
        manualEntryButton: {
            droid: '~Enter code manually',
            ios: '',
        },
        scanSuccessMessage: {
            droid: '//*[@text="Coupon Validated Successfully"]',
            ios: '',
        },
        scanErrorMessage: {
            droid: '//*[@text="Invalid QR Code"]',
            ios: '',
        }
    };

    async goToScan() {
        await waitForElementVisible(this.selectors.scanButton);
        await waitAndClick(this.selectors.scanButton);
    }

    async skipOnboarding() {
        await waitAndClick(this.selectors.onboardingSkipButton);
    }
}

export default new ScanPage();
