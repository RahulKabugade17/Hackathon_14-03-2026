class BirlaOpusPage {
    selectors = {
        languageContinueButton: {
            droid: 'android=new UiSelector().text("Select(English)")',
            ios: 'android=new UiSelector().text("Select(English)")',
        },
        phoneNumberField: {
            droid: 'android=new UiSelector().resourceId("signin-mobile-input")',
            ios: '~phone_number',
        },
        checkmarkButton: {
            droid: '~button-CHECKMARK',
            ios: '~button-CHECKMARK',
        },
        TermsAndConditions: {
            droid: 'android=new UiSelector().className("android.view.ViewGroup").instance(27)',
            ios: 'android=new UiSelector().className("android.view.ViewGroup").instance(27)',
        },
        RequestOTP: {
            droid: 'android=new UiSelector().text("Request OTP")',
            ios: '~Request OTP',
        },
        otpField: {
            droid: '~ctOtpModalOtpInput',
            ios: '~ctOtpModalOtpInput',
        },
        submitOtpButton: {
            droid: '~ctOtpModalSubmitButton',
            ios: '~ctOtpModalSubmitButton',
        },
        homeScreenElement: {
            droid: 'android=new UiSelector().className("android.view.View")',
            ios: '~home-screen',
        }
    }

    async selectLanguage() {
        const langBtn = await $(this.selectors.languageContinueButton);
        if (await langBtn.isDisplayed()) {
            await langBtn.click();
        }
    }

    async enterMobile(mobile) {
        await this.selectLanguage();
        await $(this.selectors.phoneNumberField).setValue(mobile);
        await $(this.selectors.checkmarkButton).click();
        await $(this.selectors.TermsAndConditions).click();
        await $(this.selectors.RequestOTP).click();
    }

    async submitOtp(otp) {
        await $(this.selectors.otpField).setValue(otp);
        await $(this.selectors.submitOtpButton).click();
    }

    async assertLoggedIn() {
        const loggedIn = await $(this.selectors.homeScreenElement).isDisplayed();
        if (!loggedIn) {
            throw new Error('User is not logged in');
        }
    }
}

export default new BirlaOpusPage();