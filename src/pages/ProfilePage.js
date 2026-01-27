import { waitAndClick, waitForElementVisible, clickAndType } from '../utils/CustomCommands.js';
import Gestures from '../utils/Gestures.js';
import DeleteAccountPage from './DeleteAccountPage.js';

class ProfilePage {
    selectors = {
        userName: { droid: '~~user-name-complete-kyc' },
        skipHomeButton: { droid: '~~required-steps-skip-home-button' }
    };

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
