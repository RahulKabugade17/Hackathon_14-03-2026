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
        notRegisteredMessage: {
            droid: 'android=new UiSelector().textContains("This number is not registered with us")',
            ios: '',
        },
        referralSkip: { droid: '~~referral-skip-button' },
        onboardingNext: { droid: '~~onboarding-next-button' },
        onboardingSkip: { droid: '~~onboarding-skip-button' }
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
    }
    async enterOtp(otp) {
        await waitForElementVisible(this.selectors.otpField1);
        await clickAndType(this.selectors.otpField1, otp);
    }

    async getNotRegisteredMessage() {
        await waitForElementVisible(this.selectors.notRegisteredMessage);
        return await $(this.selectors.notRegisteredMessage.droid).getText();
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
        await waitAndClick(this.selectors.referralSkip);
        await waitAndClick(this.selectors.onboardingNext);
        await waitAndClick(this.selectors.onboardingNext);
        await waitAndClick(this.selectors.onboardingSkip);
    }
}

export default new LoginPage();
