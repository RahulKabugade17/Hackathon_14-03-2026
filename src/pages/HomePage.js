class HomePage {
    selectors = {
        onboardingSkipButtons: [
            '~topcard-opus-id-tooltip-skip-button',
            '~~ic-toggle-switch-tooltip-skip-button',
            '~ic-opus-id-tooltip-skip-button'
        ],
        profileSection: {
            droid: '~user-type-complete-kyc',
            ios: ''
        }
    };
    async skipOnboarding() {
        for (const selector of this.selectors.onboardingSkipButtons) {
            const el = await $(selector);
            if (await el.waitForDisplayed({ timeout: 5000 })) {
                await el.click();
                return;
            }
        }
    }
    async verifyHomePageLoaded() {
        await driver.pause(5000);
        await this.skipOnboarding();
    }
}
export default new HomePage();
