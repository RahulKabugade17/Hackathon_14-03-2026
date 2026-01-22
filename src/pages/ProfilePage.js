import { waitAndClick, waitForElementVisible, clickAndType } from '../utils/CustomCommands.js';
import Gestures from '../utils/Gestures.js';

class ProfilePage {
    selectors = {
        userName: { droid: '~~user-name-complete-kyc' },
        deleteAccountClickHere: { droid: '~~delete-account-click-here' },
        deleteAnywayButton: { droid: '~~delete-account-confirm-button' },
        deleteOtpInput0: { droid: '~~delete-account-otp-input-0' },
        deleteAccountSubmit: { droid: '~~delete-account-otp-submit-button' },
        understandButton: { droid: '#understand-btn' },
        finalDeleteButton: { droid: '#delete-btn' },
        skipHomeButton: { droid: '~~required-steps-skip-home-button' }
    };

    async deleteAccount(otp) {
        await Gestures.swipeUp(0.7);
        await waitAndClick(this.selectors.deleteAccountClickHere);
        await waitAndClick(this.selectors.deleteAnywayButton);
        await waitForElementVisible(this.selectors.deleteOtpInput0);
        await clickAndType(this.selectors.deleteOtpInput0, otp);
        await waitAndClick(this.selectors.deleteAccountSubmit);
        await waitAndClick(this.selectors.understandButton);
        await waitAndClick(this.selectors.finalDeleteButton);
    }

    async isUserLoggedIn() {
        await waitForElementVisible(this.selectors.userName);
        return await $(this.selectors.userName.droid).isDisplayed();
    }

    async skipToHome() {
        await waitAndClick(this.selectors.skipHomeButton);
    }

    async isMobileNumberDisplayed(mobile) {
        const selector = `android=new UiSelector().text("${mobile}")`;
        const el = await $(selector);
        return await el.isDisplayed();
    }
}

export default new ProfilePage();
