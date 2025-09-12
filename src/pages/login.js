import { waitAndClick, waitAndFindElement } from '../utils/CustomCommands.js';

class LoginPage {
  selectors = {
    languageContinueButton: {
      droid: '//android.widget.TextView[@text="Select(English)"]',
      ios: '//XCUIElementTypeStaticText[@label="Select(English)"]',
    },
    phoneNumberField: {
      droid: 'android=new UiSelector().resourceId("signin-mobile-input")',
      ios: '//XCUIElementTypeTextField[@label="Phone Number"]',
    },
    privacyPolicyCheckbox: {
      droid: 'android=new UiSelector().className("android.view.ViewGroup").instance(27)',
      ios: '//XCUIElementTypeCheckBox[@name="privacy_policy"]',
    },
    requestOtpButton: {
      droid: 'android=new UiSelector().text("Request OTP")',
      ios: '//XCUIElementTypeStaticText[@label="Request OTP"]',
    },
    otpField: {
      droid: 'android=new UiSelector().className("android.widget.EditText")',
      ios: 'android=new UiSelector().className("android.widget.EditText")',
    },
  };

  getLocator(selector) {
    return driver.isAndroid ? selector.droid : selector.ios;
  }

  async clickLanguageContinue() {
    const langBtn = await waitAndFindElement(this.getLocator(this.selectors.languageContinueButton));
    if (await langBtn.isDisplayed()) {
      await langBtn.click();
    }
  }

  async enterMobileAndRequestOtp(mobile) {
    const phoneField = await waitAndFindElement(this.getLocator(this.selectors.phoneNumberField));
    await phoneField.click();
    await phoneField.setValue(mobile);
    await waitAndClick(this.getLocator(this.selectors.privacyPolicyCheckbox));
    await waitAndClick(this.getLocator(this.selectors.requestOtpButton));
  }

  async submitOtp(otp) {
    const otpField = await waitAndFindElement(this.getLocator(this.selectors.otpField));
    await otpField.setValue(otp);
    // Optional: press submit/confirm button if exists
  }

  async loginWithMobileAndOtp(mobile, otp) {
    await this.enterMobileAndRequestOtp(mobile);
    if (otp) {
      await this.submitOtp(otp);
    }
  }
}

export default new LoginPage();
