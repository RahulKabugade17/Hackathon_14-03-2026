import { waitAndClick } from '../utils/CustomCommands.js';
class LoginPage {

    constructor() {
        this.selectors = {
            mobileInput: '~~signin-mobile-input',
            termsCheckbox: '~~signin-pressable-unique',
            requestOtpButton: '~~signin-submit-btn',
            otpSubmitButton: '~~otp-submit-button'
        };
    }

    async login(mobile) {
        await $(this.selectors.mobileInput).setValue(mobile);
        await waitAndClick(this.selectors.termsCheckbox);
        await waitAndClick(this.selectors.requestOtpButton);
        console.log('[LOGIN] OTP requested');
    }

    async enterOtp(otp) {
        const firstField = $('~~otp-code-field-1');
        await firstField.waitForDisplayed({ timeout: 5000 });
        await firstField.click();
        for (const digit of otp) {
            const keyCode = 7 + Number(digit);
            await driver.pressKeyCode(keyCode);
        }
        console.log('[LOGIN] OTP submitted');
    }
}

export default new LoginPage();
