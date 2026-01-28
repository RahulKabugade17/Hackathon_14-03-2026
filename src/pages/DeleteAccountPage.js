import { waitAndClick, waitForElementVisible, clickAndType } from '../utils/CustomCommands.js';
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
        deleteAnywayButton: { droid: '~~delete-account-confirm-button' },
        deleteOtpInput0: { droid: '~~delete-account-otp-input-0' },
        deleteAccountSubmit: { droid: '~~delete-account-otp-submit-button' },
        understandButton: { droid: '~~understand-button' },
        finalDeleteButton: { droid: '~~delete-button' }
    };

    async deleteAccount(otp) {
        for (let i = 0; i < 2; i++) {
            await Gestures.swipeUp(0.6);
            await driver.pause(600);
        }
        const el = await $(this.selectors.deleteAccountClickHere);
        await el.waitForDisplayed({ timeout: 1500 });
        await el.click();
        await waitAndClick(this.selectors.deleteAnywayButton);
        await clickAndType(this.selectors.deleteOtpInput0, otp);
        await waitAndClick(this.selectors.deleteAccountSubmit);
        await waitAndClick(this.selectors.understandButton);
        await waitAndClick(this.selectors.finalDeleteButton);
    }
}

export default new DeleteAccountPage();
