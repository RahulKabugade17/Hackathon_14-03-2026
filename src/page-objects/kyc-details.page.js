import {
  waitAndClick,
  waitForElementVisible,
  setValueFast,
} from "../utils/custom-commands.js";

import userProfileData from "../test-data/userProfile_e2e.data.json" with { type: "json" };

class KycDetailsPage {
  selectors = {
    panNumber: { droid: "~~kyc-item-edit-button-PAN Number", ios: "" },
    addNewUPI: { droid: "~~kyc-item-edit-button-Add new UPI ID", ios: "" },
    panInput: { droid: "~~pan-input", ios: "" },
    verifyButton: { droid: "~~pan-verify-button", ios: "" },
    saveButton: { droid: "~~verify-pan-save-button", ios: "" },
    upiIdInput: { droid: "~~upi-details-upi-id-input", ios: "" },
    upiNextButton: { droid: "~~upi-details-next-button", ios: "" },
    confirmUPIIDButton: { droid: "~~confirm-upi-add-button", ios: "" },
    verifiedPan: {
      droid: 'android=new UiSelector().text("Verified")',
      ios: "",
    },
    defaultUPI: { droid: 'android=new UiSelector().text("Default")', ios: "" },
  };

  async updatePanDetails() {
    const data = userProfileData.kyc;

    await waitAndClick(this.selectors.panNumber);
    await waitForElementVisible(this.selectors.panInput);
    await setValueFast(this.selectors.panInput, data.pan);
    await waitAndClick(this.selectors.verifyButton);
    await waitAndClick(this.selectors.saveButton);
  }

  async addPaymentMethod(paymentType) {
    const data = userProfileData.kyc;

    switch (paymentType.toLowerCase()) {
      case "upi":
        await this.addNewUpiId(data.upi);
        break;

      default:
        throw new Error(`Unsupported payment type: ${paymentType}`);
    }
  }
  async addNewUpiId(upiId) {
    await waitAndClick(this.selectors.addNewUPI);
    await waitForElementVisible(this.selectors.upiIdInput);
    await setValueFast(this.selectors.upiIdInput, upiId);
    await waitAndClick(this.selectors.upiNextButton);
    await waitAndClick(this.selectors.confirmUPIIDButton);
  }

  async getPanVerificationStatus() {
    await waitForElementVisible(this.selectors.verifiedPan);
    return await $(this.selectors.verifiedPan).getText();
  }

  async isPaymentMethodDefault() {
    await waitForElementVisible(this.selectors.defaultUPI);
    return await $(this.selectors.defaultUPI).isDisplayed();
  }
}

export default new KycDetailsPage();
