import { waitAndClick, clickIfPresent, waitForElementVisible, clickAndType } from '../utils/CustomCommands.js';
import Gestures from '../utils/Gestures.js';
class DeleteAccountPage {
    selectors = {
        deleteAccountClickHere: {
            droid: [
                '~~delete-account-click-here',
                'android=new UiSelector().description("~~delete-account-click-here")',
                'android=new UiSelector().resourceId("~~delete-account-click-here")',
                '//android.widget.TextView[@content-desc="~~delete-account-click-here"]',
                '//android.widget.TextView[contains(@text,"delete your Opus ID")]',
                '//android.widget.TextView[contains(@text,"click here")]'
            ]
        },
        deleteAnywayButton: {
            droid: '~~delete-account-confirm-button',
            ios: ''
        },
        deleteOtpInput0: {
            droid: '~~delete-account-otp-input-0',
            ios: ''
        },
        deleteAccountSubmit: {
            droid: '~~delete-account-otp-submit-button',
            ios: ''
        },
        understandButton: {
            droid: '~~understand-button',
            ios: ''
        },
        finalDeleteButton: {
            droid: '~~delete-button',
            ios: ''
        }
    };

    async deleteAccount(otp) {
        for (let i = 0; i < 2; i++) {
            await Gestures.swipeUp(0.6);
        }
        await waitAndClick(this.selectors.deleteAccountClickHere);
        await waitAndClick(this.selectors.deleteAnywayButton);
        await waitForElementVisible(this.selectors.deleteOtpInput0, 15000);
        await clickAndType(this.selectors.deleteOtpInput0, otp);
        await waitAndClick(this.selectors.deleteAccountSubmit);
        await waitAndClick(this.selectors.understandButton);
        await waitAndClick(this.selectors.finalDeleteButton);
    }
}

export default new DeleteAccountPage(); 
