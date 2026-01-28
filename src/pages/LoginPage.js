import { waitAndClick, waitForElementVisible, setValueFast, clickAndType, handleSystemPermissions } from '../utils/CustomCommands.js';

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
        notRegisteredMessage: {
            droid: 'android=new UiSelector().textContains("This number is not registered with us")',
            ios: '',
        },
        confirmLocationButton: {
            droid: '~~confirm-location-confirm-button',
            ios: '',
        },
        referralSkip: { droid: '~~referral-skip-button' },
        onboardingNext: { droid: '~~onboarding-next-button' },
        onboardingSkip: { droid: '~~onboarding-skip-button' }
    };


    async login(mobile, otp) {
        await waitForElementVisible(this.selectors.mobileInput);
        await setValueFast(this.selectors.mobileInput, mobile);
        await waitAndClick(this.selectors.termsCheckbox);
        await waitAndClick(this.selectors.requestOtpButton);
        await waitForElementVisible(this.selectors.otpField0);
        await clickAndType(this.selectors.otpField0, otp);
    }

    async getNotRegisteredMessage() {
        await waitForElementVisible(this.selectors.notRegisteredMessage);
        return await $(this.selectors.notRegisteredMessage.droid).getText();
    }
    async clickConfirmLocationButton() {
        await waitAndClick(this.selectors.confirmLocationButton);
    }

    async isAtLoginPage() {
        try {
            await waitForElementVisible(this.selectors.mobileInput);
            return await $(this.selectors.mobileInput.droid).isDisplayed();
        } catch (e) {
            return false;
        }
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
