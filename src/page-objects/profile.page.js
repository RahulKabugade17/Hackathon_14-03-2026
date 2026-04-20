import {
  setValueFast,
  waitAndClick,
  waitForElementVisible,
} from "../utils/custom-commands.js";

class ProfileDetailsPage {
  selectors = {
    contractorCard: { droid: "~~usertype-select-contractor", ios: "" },
    painterCard: { droid: "~~usertype-select-painter", ios: "" },
    headerBackButton: { droid: "~header-back-button", ios: "" },
    memberTypeTitle: 'android=new UiSelector().text("Member contractor")',
    profileCompletePercentage: "~profile-picture-completion-percentage",
    kycDetailsButton: { droid: "~KYC Details", ios: "" },
    shareIdButton: { droid: "~~card-view-share-button", ios: "" },
    shareIdImage: { droid: "~Image", ios: "" },
    shareIdPDF: { droid: "~PDF", ios: "" },
    shareIdContact: { droid: "~Contact", ios: "" },
    downloadIdButton: { droid: "~~card-view-download-button", ios: "" },
    downloadIdImage: { droid: "~Image", ios: "" },
    downloadIdPDF: { droid: "~PDF", ios: "" },
    downloadIdContact: { droid: "~Contact", ios: "" },
    cardShareOptions: {
      droid:
        '//com.android.internal.widget.RecyclerView[@resource-id="android:id/sem_chooser_recycler_ranked_app"]',
      ios: "",
    },
    cardDowloadedSuccessfully: {
      droid: 'android=new UiSelector().text("Card Downloaded successfully")',
      ios: "",
    },
    firstNameInput: { droid: "~~user-details-firstname-input", ios: "" },
    lastNameInput: { droid: "~~user-details-lastname-input", ios: "" },
    finishButton: { droid: "~~user-details-finish-button", ios: "" },
    profileDetailsStep: { droid: "~~required-step-item-0", ios: "" },
    contractorPhoneInput: { droid: "~~validate-mobile-phone-input", ios: "" },
    contractorPhoneNextButton: {
      droid: "~~validate-mobile-next-button",
      ios: "",
    },
    contractorDetailsNextButton: {
      droid: "~~contractor-details-next-button",
      ios: "",
    },
    skipHomeButton: { droid: "~~required-steps-skip-home-button", ios: "" },
    emailInput: { droid: "~~user-details-email-input", ios: "" },
    profileImagePicker: {
      droid: "~~user-details-profile-image-picker",
      ios: "",
    },
    profileCompletePercentage: {
      droid:
        '//android.widget.TextView[@content-desc="profile-picture-completion-percentage"]',
      ios: "",
    },
    galleryButton: { droid: "~~profile-image-gallery-button", ios: "" },
    selectionOk: {
      droid:
        'android=new UiSelector().className("android.widget.Button").instance(6)',
      ios: "",
    },
    cropbutton: { droid: "~Crop", ios: "" },
    dateofbirth: { droid: "~~user-details-dob", ios: "" },
    datepickerbutton: { droid: "~~datepicker-ok-button", ios: "" },
    galleryImages:
      'android=new UiSelector().descriptionMatches("^Photo taken on.*")',
  };

  async selectContractorPersona() {
    await waitAndClick(this.selectors.contractorCard);
  }

  async selectPainterPersona() {
    await waitAndClick(this.selectors.painterCard);
  }

  async verifyOpusIdCardDetails() {
    await waitForElementVisible(this.selectors.memberTypeTitle);
  }

  async openKycDetails() {
    await waitAndClick(this.selectors.kycDetailsButton);
  }

  async shareOpusId(option) {
    await waitAndClick(this.selectors.shareIdButton);
    switch (option) {
      case "Image":
        await waitAndClick(this.selectors.shareIdImage);
        break;
      case "PDF":
        await waitAndClick(this.selectors.shareIdPDF);
        break;
      case "Contact":
        await waitAndClick(this.selectors.shareIdContact);
        break;
      default:
        throw new Error(`Unknown share option: ${option}`);
    }
  }

  async verifyShareOptionsVisible() {
    await waitForElementVisible(this.selectors.cardShareOptions);

    const shareOptions = await $(this.selectors.cardShareOptions);
    await expect(shareOptions).toBeDisplayed();

    await driver.back();
  }

  async downloadOpusId(option) {
    await waitAndClick(this.selectors.downloadIdButton);
    switch (option) {
      case "Image":
        await waitAndClick(this.selectors.downloadIdImage);
        break;
      case "PDF":
        await waitAndClick(this.selectors.downloadIdPDF);
        break;
      case "Contact":
        await waitAndClick(this.selectors.downloadIdContact);
        break;
      default:
        throw new Error(`Unknown download option: ${option}`);
    }
  }

  async verifyOpusIdDownloadSuccessfully() {
    const successMessage = await $(this.selectors.cardDowloadedSuccessfully);
    await expect(successMessage).toBeDisplayed();
  }

  async addContractorDetails(phone) {
    await waitForElementVisible(this.selectors.contractorPhoneInput);
    await setValueFast(this.selectors.contractorPhoneInput, phone);
    await waitAndClick(this.selectors.contractorPhoneNextButton);
    await waitAndClick(this.selectors.contractorDetailsNextButton);
  }

  async isProfileImageUpdated() {
    await waitForElementVisible(this.selectors.profileCompletePercentage);
    const currentPercentageText = await $(
      this.selectors.profileCompletePercentage,
    ).getText();
    const currentProfileCompletion = await currentPercentageText.trim();
    return (await currentProfileCompletion) === "43%";
  }

  async uploadProfileImage() {
    await waitAndClick(this.selectors.profileCompletePercentage);
    await waitAndClick(this.selectors.galleryButton);
    await driver.waitUntil(
      async () => (await $$(this.selectors.galleryImages)).length > 0,
      { timeout: 15000, timeoutMsg: "Gallery images not loaded" },
    );
    const firstImage = (await $$(this.selectors.galleryImages))[0];
    await firstImage.click();
    //await waitAndClick(this.selectors.selectionOk);
    const cropBtn = await $(this.selectors.cropbutton.droid);
    await cropBtn.waitForDisplayed({ timeout: 10000 });
    await cropBtn.click();
  }

  async enterDetails(fname, lname, email) {
    await waitForElementVisible(this.selectors.firstNameInput);
    await setValueFast(this.selectors.firstNameInput, fname);
    await setValueFast(this.selectors.lastNameInput, lname);
    await setValueFast(this.selectors.emailInput, email);
    await waitAndClick(this.selectors.dateofbirth);
    await waitAndClick(this.selectors.datepickerbutton);
    await waitAndClick(this.selectors.finishButton);
  }

  async openProfileDetails() {
    await waitAndClick(this.selectors.profileDetailsStep);
  }

  async skipToHome() {
    await waitAndClick(this.selectors.skipHomeButton);
  }
}

export default new ProfileDetailsPage();
