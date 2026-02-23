import { waitAndClick, waitForElementVisible, setValueFast, clickAndType } from '../utils/CustomCommands.js';

class LoginPage {

    selectors = {
        mobileInput: {
            droid: '~~signin-mobile-input',
            ios: '',
        },
        termsCheckbox: {
            droid: '~~signin-pressable-unique',
            ios: '',
        },
        requestOtpButton: {
            droid: '~~signin-submit-btn',
            ios: '',
        },
        otpField0: {
            droid: '~~otp-code-field-0',
            ios: '',
        },
        confirmLocationButton: {
            droid: '~~confirm-location-confirm-button',
            ios: '',
        },
        referralSkip: {
            droid: '~~referral-skip-button',
            ios: ''
        },
        onboardingNext: {
            droid: '~~onboarding-next-button',
            ios: ''
        },
        onboardingSkip: {
            droid: '~~onboarding-skip-button',
            ios: ''
        }
    };

    async login(mobile, otp) {
        await waitForElementVisible(this.selectors.mobileInput);
        await setValueFast(this.selectors.mobileInput, mobile);
        await waitAndClick(this.selectors.termsCheckbox);
        await waitAndClick(this.selectors.requestOtpButton);
        await waitForElementVisible(this.selectors.otpField0, 30000);
        await clickAndType(this.selectors.otpField0, otp);
    }

    async clickConfirmLocationButton() {
        await waitAndClick(this.selectors.confirmLocationButton);
    }

    async handleOverlays() {
        await handleSystemPermissions();
        await waitAndClick(this.selectors.referralSkip);
        await waitAndClick(this.selectors.onboardingNext);
        await waitAndClick(this.selectors.onboardingNext);
        await waitAndClick(this.selectors.onboardingSkip);
    }
}

export default new LoginPage();
