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
        otpField1: {
            droid: '~~otp-code-field-1',
            ios: '',
        },
        mobileErrorText: {
            droid: '~~signin-mobile-error',
            ios: '~~signin-mobile-error'
        }
    };

    async login(mobile) {
        await waitForElementVisible(this.selectors.mobileInput);
        await setValueFast(this.selectors.mobileInput, mobile);
        await waitAndClick(this.selectors.termsCheckbox);
        await waitAndClick(this.selectors.requestOtpButton);

        console.log('[LOGIN] OTP request submitted');

        const errorType = await this.detectMobileErrorType();
        await this.handleMobileError(errorType);
    }

    async enterOtp(otp) {
        await waitForElementVisible(this.selectors.otpField1);
        await clickAndType(this.selectors.otpField1, otp);
        console.log('[OTP] OTP entered');
    }

    async getMobileErrorMessage() {
        try {
            const errorEl = await $(this.selectors.mobileErrorText);
            if (await errorEl.isDisplayed()) {
                return (await errorEl.getText()).toLowerCase();
            }
            return null;
        } catch {
            return null;
        }
    }

    async detectMobileErrorType() {
        const errorText = await this.getMobileErrorMessage();

        if (!errorText) {
            return 'NO_ERROR';
        }

        if (errorText.includes('invalid')) {
            return 'INVALID_MOBILE';
        }

        if (
            errorText.includes('try again') ||
            errorText.includes('seconds') ||
            errorText.includes('60')
        ) {
            return 'RATE_LIMIT';
        }

        return 'UNKNOWN';
    }

    async handleMobileError(errorType) {
        switch (errorType) {
            case 'INVALID_MOBILE':
                throw new Error('[LOGIN] Invalid mobile number');

            case 'RATE_LIMIT':
                console.warn('[LOGIN] OTP rate limit hit. Waiting 60 seconds...');
                await driver.pause(60000);

                await waitAndClick(this.selectors.requestOtpButton);

                const retryError = await this.detectMobileErrorType();
                if (retryError === 'RATE_LIMIT') {
                    throw new Error('[LOGIN] OTP still rate-limited after cooldown');
                }
                break;

            case 'UNKNOWN':
                throw new Error('[LOGIN] Unknown mobile validation error');

            case 'NO_ERROR':
            default:
                console.log('[LOGIN] No validation errors, proceeding to OTP');
        }
    }
}

export default new LoginPage();
