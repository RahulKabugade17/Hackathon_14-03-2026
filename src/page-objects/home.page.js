import { waitAndClick, waitForVisible } from '../utils/custom-commands.js';
import DeleteAccountPage from './delete-account.page.js';
import signupData from '../test-data/signup.data.json';
class HomePage {
    selectors = {
        tooltipTitle: { droid: '~topcard-opus-id-tooltip-title' },
        icToggleSwitchTooltipTitle: { droid: '~ic-toggle-switch-tooltip-title' },
        icOpusIdTooltipTitle: { droid: '~ic-opus-id-tooltip-title' },
        onboardingSkipButtons: [
            '~topcard-opus-id-tooltip-skip-button',
            '~ic-toggle-switch-tooltip-skip-button',
            '~ic-opus-id-tooltip-skip-button'
        ],
        userNameIncompleteKyc: { droid: '~user-name-incomplete-kyc' },
        profileSection: { droid: '~user-type-complete-kyc' }
    };
    async skipOnboarding() {
        for (const selector of this.selectors.onboardingSkipButtons) {
            const el = await $(selector);
            if (await el.isDisplayed()) {
                await el.click();
                return;
            }
        }
    }
    async verifyHomePageLoaded() {
        await Promise.race([
            waitForVisible(this.selectors.tooltipTitle),
            waitForVisible(this.selectors.icToggleSwitchTooltipTitle),
            waitForVisible(this.selectors.icOpusIdTooltipTitle)
        ]);
        await this.skipOnboarding();
    }
    async clickProfileBasedOnPersona(persona) {
        const isNoKycUser = persona.includes('no-kyc');
        const selector = isNoKycUser
            ? this.selectors.userNameIncompleteKyc
            : this.selectors.profileSection;
        await waitAndClick(selector);
    }
    async verifyDashboardAndDeleteUser(persona) {
        await this.verifyHomePageLoaded();
        await this.clickProfileBasedOnPersona(persona);
        const otp = signupData[persona].otp;
        await DeleteAccountPage.deleteAccount(otp);
    }
}
export default new HomePage();