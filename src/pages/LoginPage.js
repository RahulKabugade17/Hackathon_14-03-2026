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
        confirmLocationButton: {
            droid: '~~confirm-location-confirm-button',
            ios: '',
        },
    };

    async enterMobile(mobile) {
        await waitForElementVisible(this.selectors.mobileInput);
        await setValueFast(this.selectors.mobileInput, mobile);
    }

    async acceptTermsAndPrivacy() {
        await waitAndClick(this.selectors.termsCheckbox);
    }

    async clickSendOtp() {
        await waitAndClick(this.selectors.requestOtpButton);
    }
    async clickConfirmLocationButton() {
        await waitAndClick(this.selectors.confirmLocationButton);
    }

    async login(mobile, otp) {
        await this.enterMobile(mobile);
        await this.acceptTermsAndPrivacy();
        await this.clickSendOtp();
        await waitForElementVisible(this.selectors.otpField1);
        await clickAndType(this.selectors.otpField1, otp);
    }

}

export default new LoginPage();
