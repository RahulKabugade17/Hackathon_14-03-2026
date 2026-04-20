import { waitAndClick, waitForVisible } from '../utils/custom-commands.js';
import DeleteAccountPage from './delete-account.page.js';
import signupData from '../test-data/signup.data.json';

class HomePage {

    selectors = {
        tooltipTitle: { droid: '~topcard-opus-id-tooltip-title' },
        icToggleSwitchTooltipTitle: { droid: '~ic-toggle-switch-tooltip-title' },
        icOpusIdTooltipTitle: { droid: '~ic-opus-id-tooltip-title' },
        onboardingSkipButtons: {
            droid: [
                '~topcard-opus-id-tooltip-skip-button',
                '~ic-toggle-switch-tooltip-skip-button',
                '~ic-opus-id-tooltip-skip-button'
            ]
        },
        profileCardnew: {
            droid: [
                '~incomplete-kyc-card',
                '~complete-kyc-top-card',
                '~institutional-top-card-main'
            ]
        },
        knowMoreButton: { droid: '~Know more' }
    };
    async skipOnboarding() {
        await driver.pause(2000);
        const el = await waitForVisible(this.selectors.onboardingSkipButtons);
        await el.click();
    }
    async clickProfileBasedOnPersona() {
        await driver.pause(2000);
        const profileCard = await waitForVisible(this.selectors.profileCardnew);
        await profileCard.click();
    }
    async handleOnboardingAndPopups(persona) {
        if (persona === 'painter' || persona === 'institutional_contractor' || persona === 'trade_contractor' || persona === 'painter-no-kyc') {
            await this.skipOnboarding();
            return;
        }
        if (persona === 'contractor' || persona === 'contractor-no-kyc') {
            return;
        }
    }
    async verifyHomePageLoaded(persona) {
        await driver.pause(15000);
        await this.handleOnboardingAndPopups(persona);

    }
    async verifyDashboardAndDeleteUser(persona) {
        await this.handleOnboardingAndPopups(persona)
        await this.clickProfileBasedOnPersona();
        const otp = signupData[persona].otp;
        await DeleteAccountPage.deleteAccount(otp);
    }
}
export default new HomePage();