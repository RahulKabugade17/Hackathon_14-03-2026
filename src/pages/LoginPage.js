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
        contractorPhoneInput: {
            droid: '~~validate-mobile-phone-input',
            ios: '',
        },
        contractorPhoneNextButton: {
            droid: '~~validate-mobile-next-button',
            ios: '',
        },
        contractorDetailsNextButton: {
            droid: '~~contractor-details-next-button',
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

    async enterContractorPhone(phone) {
        await waitForElementVisible(this.selectors.contractorPhoneInput);
        await setValueFast(this.selectors.contractorPhoneInput, phone);
    }

    async clickContractorPhoneNextButton() {
        await waitAndClick(this.selectors.contractorPhoneNextButton);
    }

    async clickContractorDetailsNextButton() {
        await waitAndClick(this.selectors.contractorDetailsNextButton);
    }

    async requestOtp(mobile) {
        await this.enterMobile(mobile);
        await this.acceptTermsAndPrivacy();
        await this.clickSendOtp();

        const errorType = await this.detectMobileErrorType();
        await this.handleMobileError(errorType);
    }
    async enterOtp(otp) {
        await waitForElementVisible(this.selectors.otpField1);
        await clickAndType(this.selectors.otpField1, otp);
        console.log('[OTP] OTP entered');
    }

}

export default new LoginPage();
