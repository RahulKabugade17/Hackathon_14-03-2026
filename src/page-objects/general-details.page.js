import {
  setValueFast,
  waitAndClick,
  waitForElementVisible,
} from "../utils/custom-commands.js";
import Gestures from "../utils/gestures.js";

import userProfileData from "../test-data/contractor_userProfile.data.json" with { type: "json" };

class GeneralDetailsPage {
  selectors = {
    generalDetailsButton: { droid: "~Your details", ios: "" },
    editFirstName: {
      droid: "~general-details-item-first-name-subtitle",
      ios: "",
    },
    editLastName: {
      droid: "~general-details-item-last-name-subtitle",
      ios: "",
    },
    editDOB: { droid: "~general-details-item-dob-subtitle", ios: "" },
    editCommunicationAddress: {
      droid: "~general-details-item-communication-address-subtitle",
      ios: "",
    },
    editPermanentAddress: {
      droid: "~general-details-item-permanent-address-subtitle",
      ios: "",
    },
    editEmail: {
      droid: "~general-details-item-email-address-subtitle",
      ios: "",
    },
    firstNameInput: { droid: "~first-name-edit-modal-input", ios: "" },
    lastNameInput: { droid: "~last-name-edit-modal-input", ios: "" },
    datePickerOkButton: { droid: "~~datepicker-ok-button", ios: "" },
    communicationAddressInput1: {
      droid: "~com-address-edit-modal-address-line1-input",
      ios: "",
    },
    communicationAddressInput2: {
      droid: "~com-address-edit-modal-address-line2-input",
      ios: "",
    },
    permanentAddressInput1: {
      droid: "~perm-address-edit-modal-address-line1-input",
      ios: "",
    },
    permanentAddressInput2: {
      droid: "~perm-address-edit-modal-address-line2-input",
      ios: "",
    },
    editEmailInput: { droid: "~email-address-edit-modal-input", ios: "" },
    saveButtonFirstName: {
      droid: "~first-name-edit-modal-save-button",
      ios: "",
    },
    saveButtonLastName: { droid: "~last-name-edit-modal-save-button", ios: "" },
    saveButtonCommunicationAddress: {
      droid: "~com-address-edit-modal-save-button",
      ios: "",
    },
    saveButtonPermanentAddress: {
      droid: "~perm-address-edit-modal-save-button",
      ios: "",
    },
    saveButtonEmail: {
      droid: "~email-address-edit-modal-save-button",
      ios: "",
    },
    workLocationDetails: {
      droid: "~general-details-item-work-location-subtitle",
      ios: "",
    },
  };

  async clickGeneralDetails() {
    await waitAndClick(this.selectors.generalDetailsButton);
    await waitForElementVisible(this.selectors.editFirstName);
    for (let i = 0; i < 1; i++) await Gestures.swipeUp(0.4);
  }

  async editGeneralInformation() {
    const data = userProfileData.generalInformation;

    this.updatedPersonalDetails = {
      firstName: data.firstName,
      lastName: data.lastName,
      communicationAddress: `${data.communicationAddress.addressLine1} ${data.communicationAddress.addressLine2}`,
      permanentAddress: `${data.permanentAddress.addressLine1} ${data.permanentAddress.addressLine2}`,
      email: data.email,
    };

    await this.updateFirstName(data.firstName);
    await this.updateLastName(data.lastName);
    await this.updateDOB();
    await this.updateCommunicationAddress(data.communicationAddress);
    await this.updatePermanentAddress(data.permanentAddress);
    await this.updateEmail(data.email);
  }

  async updateFirstName(firstName) {
    await waitAndClick(this.selectors.editFirstName);
    await waitForElementVisible(this.selectors.firstNameInput);
    await setValueFast(this.selectors.firstNameInput, firstName);
    await waitAndClick(this.selectors.saveButtonFirstName);
  }

  async updateLastName(lastName) {
    await waitAndClick(this.selectors.editLastName);
    await waitForElementVisible(this.selectors.lastNameInput);
    await setValueFast(this.selectors.lastNameInput, lastName);
    await waitAndClick(this.selectors.saveButtonLastName);
  }

  async updateDOB() {
    await waitAndClick(this.selectors.editDOB);
    await waitAndClick(this.selectors.datePickerOkButton);
  }

  async updateCommunicationAddress(address) {
    await waitAndClick(this.selectors.editCommunicationAddress);
    await waitForElementVisible(this.selectors.communicationAddressInput1);
    await setValueFast(
      this.selectors.communicationAddressInput1,
      address.addressLine1,
    );
    await setValueFast(
      this.selectors.communicationAddressInput2,
      address.addressLine2,
    );
    await waitAndClick(this.selectors.saveButtonCommunicationAddress);
  }

  async updatePermanentAddress(address) {
    await waitAndClick(this.selectors.editPermanentAddress);
    await waitForElementVisible(this.selectors.permanentAddressInput1);
    await setValueFast(
      this.selectors.permanentAddressInput1,
      address.addressLine1,
    );
    await setValueFast(
      this.selectors.permanentAddressInput2,
      address.addressLine2,
    );
    await waitAndClick(this.selectors.saveButtonPermanentAddress);
  }

  async updateEmail(email) {
    await waitAndClick(this.selectors.editEmail);
    await waitForElementVisible(this.selectors.editEmailInput);
    await setValueFast(this.selectors.editEmailInput, email);
    await waitAndClick(this.selectors.saveButtonEmail);
  }

  async arePersonalDetailsUpdated() {
    await waitForElementVisible(this.selectors.editFirstName);
    await waitForElementVisible(this.selectors.editLastName);
    await waitForElementVisible(this.selectors.editCommunicationAddress);
    await waitForElementVisible(this.selectors.editPermanentAddress);
    await waitForElementVisible(this.selectors.editEmail);

    const firstName = await $(this.selectors.editFirstName).getText();
    const lastName = await $(this.selectors.editLastName).getText();
    const communicationAddress = await $(
      this.selectors.editCommunicationAddress,
    ).getText();
    const permanentAddress = await $(
      this.selectors.editPermanentAddress,
    ).getText();
    const email = await $(this.selectors.editEmail).getText();

    return (
      firstName.trim() === this.updatedPersonalDetails.firstName &&
      lastName.trim() === this.updatedPersonalDetails.lastName &&
      communicationAddress.trim() ===
        this.updatedPersonalDetails.communicationAddress &&
      permanentAddress.trim() ===
        this.updatedPersonalDetails.permanentAddress &&
      email.trim() === this.updatedPersonalDetails.email
    );
  }

  async scrollToWorkInformationSection() {
    for (let i = 0; i < 2; i++) await Gestures.swipeUp(0.6);
    await waitForElementVisible(this.selectors.workLocationDetails);
  }

  async isWorkLocationDisplayed() {
    return await $(this.selectors.workLocationDetails).isDisplayed();
  }
}

export default new GeneralDetailsPage();
