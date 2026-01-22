class HomePage {
    selectors = {
        promoCloseButton: {
            droid: '~Close',
            ios: '',
        },
        onboardingSkipButtons: [
            '~~topcard-opus-id-tooltip-skip-button',
            '~~ic-toggle-switch-tooltip-skip-button',
            '~ic-opus-id-tooltip-skip-button'
        ]
    };

    async skipOnboarding() {
        for (const selector of this.selectors.onboardingSkipButtons) {
            const el = await $(selector);
            if (await el.isDisplayed()) {
                await el.click();
                console.log('[HOME] Onboarding skipped');
                return;
            }
        }
        console.log('[HOME] No onboarding to skip');
    }

    async closePromo() {
        const el = await $(this.selectors.promoCloseButton.droid);
        if (await el.isDisplayed()) {
            await el.click();
            console.log('[HOME] Promo closed');
        }
    }
}

export default new HomePage();
