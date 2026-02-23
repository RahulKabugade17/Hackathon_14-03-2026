import { waitAndClick, waitForElementVisible } from '../utils/CustomCommands.js';

class ProfilePage {
    selectors = {
        userName: {
            droid: '~~user-name-complete-kyc',
            ios: ''
        },
        skipHomeButton: {
            droid: '~~required-steps-skip-home-button',
            ios: ''
        }
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
