import {
  setValueFast,
  waitAndClick,
  waitForElementVisible,
} from "../utils/custom-commands.js";
import ProfileDetailsPage from "./profile.page.js";
import Gestures from "../utils/gestures.js";
import userProfileData from "../test-data/contractor_userProfile.data.json" with { type: "json" };
import painterData from "../test-data/painter_homepage.data.json" with { type: "json" };

class GeneralDetailsPage {
  selectors = {
    yourDetails: { droid: "~Your details", ios: "" },
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
    editGST: { droid: "~general-details-item-gst-number-subtitle", ios: "" },
    editCompanyName: {
      droid: "~general-details-item-company-name-subtitle",
      ios: "",
    },
    editFirmAddress: {
      droid: "~general-details-item-firm-address-subtitle",
      ios: "",
    },
    teamSizeTitle: { droid: "~general-details-item-team-size-title", ios: "" },
    editGSTInput: { droid: "~gst-number-modal-input", ios: "" },
    editCompanyNameInput: { droid: "~firm-name-edit-modal-input", ios: "" },
    editFirmAddressInput: { droid: "~firm-address-edit-modal-input", ios: "" },
    verifyGST: { droid: "~gst-number-modal-verify-button", ios: "" },
    cancelGST: { droid: "~gst-number-modal-cancel-button", ios: "" },
    saveButtonCompanyName: {
      droid: "~firm-name-edit-modal-save-button",
      ios: "",
    },
    saveButtonFirmAddress: {
      droid: "~firm-address-edit-modal-save-button",
      ios: "",
    },
    workLocationDetails: {
      droid: "~general-details-item-work-location-subtitle",
      ios: "",
    },
    manageYourTeamButton: { droid: "~~manage-your-team-button-text", ios: "" },
    teamMemberTab: { droid: "~my-team-tab-text-1", ios: "" },
    addNewTeamMemberButton: { droid: "~add-new-member-text", ios: "" },
    addMemberFirstNameInput: { droid: "~~add-member-firstname-input", ios: "" },
    addMemberLastNameInput: { droid: "~~add-member-lastname-input", ios: "" },
    addMemberOpusIdInput: { droid: "~~add-member-opusid-input", ios: "" },
    addMemberMobileInput: { droid: "~~add-member-phone-input", ios: "" },
    addMemberSubmitButton: { droid: "~~add-member-submit-button", ios: "" },
    addMemberCancelButton: { droid: "~add-member-cancel-button", ios: "" },
    sendRequestButton: { droid: "~~add-member-confirm-submit-button", ios: "" },
    sendRequestCancelButton: {
      droid: "~~add-member-confirm-cancel-button",
      ios: "",
    },
    pendingRequestCard: {
      droid: "~~team-member-card-Ram CrmTesting0708 dubey",
      ios: "",
    },
  };

  async scrollTillPerfectView(containerSelector) {
    for (let i = 0; i < 2; i++) {
      const firstName = await $(this.selectors.editFirstName);
      const email = await $(this.selectors.editEmail);

      const isFirstVisible = await firstName.isDisplayed();
      const isEmailVisible = await email.isDisplayed();

      if (isFirstVisible && isEmailVisible) {
        return true;
      }

      await Gestures.swipeUpInsideElement(containerSelector);
      await driver.pause(400);
    }

    throw new Error("Could not reach desired scroll position");
  }

  async navigateToYourDetails() {
    await waitAndClick(this.selectors.yourDetails);
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

    await this.scrollTillPerfectView(
      "//androidx.recyclerview.widget.RecyclerView",
    );
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
    await Gestures.scrollUntilElementVisible(
      this.selectors.workLocationDetails,
      3,
    );
  }

  async isWorkLocationDisplayed() {
    return await $(this.selectors.workLocationDetails).isDisplayed();
  }

  async editBusinessInformation() {
    const data = painterData.businessInformation;

    this.updatedPersonalDetails = {
      firstName: data.gstNumber,
      lastName: data.firmAddress,
      firmAddress: data.firmAddress,
    };

    await this.addGSTNo(data.gstNumber);
    await this.addCompanyName(data.companyName);
    await this.addFirmAddress(data.firmAddress);
  }

  async addGSTNo(gstNumber) {
    await Gestures.scrollUntilElementVisible(this.selectors.editGST, 1);
    await waitForElementVisible(this.selectors.editGST);
    await waitAndClick(this.selectors.editGST);
    await waitForElementVisible(this.selectors.editGSTInput);
    await setValueFast(this.selectors.editGSTInput, gstNumber);
    await waitAndClick(this.selectors.verifyGST);
  }

  async addCompanyName(companyName) {
    await waitAndClick(this.selectors.editCompanyName);
    await waitForElementVisible(this.selectors.editCompanyNameInput);
    await setValueFast(this.selectors.editCompanyNameInput, companyName);
    await waitAndClick(this.selectors.saveButtonCompanyName);
  }

  async addFirmAddress(firmAddress) {
    await waitAndClick(this.selectors.editFirmAddress);
    await setValueFast(this.selectors.editFirmAddressInput, firmAddress);
    await waitAndClick(this.selectors.saveButtonFirmAddress);
  }

  async scrollToManageYourTeamSection() {
    await Gestures.scrollUntilElementVisible(
      this.selectors.manageYourTeamButton,
      3,
    );
  }

  async openManageYourTeam() {
    await waitForElementVisible(this.selectors.manageYourTeamButton);
    await waitAndClick(this.selectors.manageYourTeamButton);
    await waitForElementVisible(this.selectors.teamMemberTab);
    await waitAndClick(this.selectors.teamMemberTab);
  }

  async addNewTeamMember() {
    await waitForElementVisible(this.selectors.addNewTeamMemberButton);
    await waitAndClick(this.selectors.addNewTeamMemberButton);
  }

  async addTeamMember() {
    const data = painterData.teamMember;
    await waitForElementVisible(this.selectors.addMemberFirstNameInput);
    await setValueFast(this.selectors.addMemberFirstNameInput, data.firstName);
    await setValueFast(this.selectors.addMemberLastNameInput, data.lastName);
    await setValueFast(this.selectors.addMemberMobileInput, data.mobileNumber);
  }

  async sendTeamMemberRequest() {
    await waitAndClick(this.selectors.addMemberSubmitButton);
    await waitForElementVisible(this.selectors.sendRequestButton);
    await waitAndClick(this.selectors.sendRequestButton);
  }

  async verifyTeamMemberRequestSuccess() {
    await waitForElementVisible(this.selectors.pendingRequestCard, 10000);
    await ProfileDetailsPage.goBack();
  }
}

export default new GeneralDetailsPage();
