class HomePage {
    selectors = {
        onboardingSkipButtons: [
            '~topcard-opus-id-tooltip-skip-button',
            '~ic-toggle-switch-tooltip-skip-button',
            '~ic-opus-id-tooltip-skip-button'
        ]
    };
    async skipOnboarding() {
        for (const selector of this.selectors.onboardingSkipButtons) {
            try {
                const elements = await $$(selector);
                if (elements.length === 0) continue;
                const el = elements[0];
                await el.waitForDisplayed({ timeout: 3000 });
                await el.click();
                return;
            } catch (err) {
            }
        }
    }
    async verifyHomePageLoaded() {
        await driver.pause(5000);
        await this.skipOnboarding();
    }
}
export default new HomePage();