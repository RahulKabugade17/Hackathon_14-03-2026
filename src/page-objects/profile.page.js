import { waitAndClick, waitForElementVisible, setValueFast } from '../utils/custom-commands.js';

class ProfileDetailsPage {
    selectors = {
        contractorCard: { droid: '~~usertype-select-contractor', ios: '' },
        painterCard: { droid: '~~usertype-select-painter', ios: '' },
        firstNameInput: { droid: '~~user-details-firstname-input', ios: '' },
        lastNameInput: { droid: '~~user-details-lastname-input', ios: '' },
        finishButton: { droid: '~~user-details-finish-button', ios: '' },
        profileDetailsStep: { droid: '~~required-step-item-0', ios: '' },
        contractorPhoneInput: { droid: '~~validate-mobile-phone-input', ios: '' },
        contractorPhoneNextButton: { droid: '~~validate-mobile-next-button', ios: '' },
        contractorDetailsNextButton: { droid: '~~contractor-details-next-button', ios: '' },
        skipHomeButton: { droid: '~~required-steps-skip-home-button', ios: '' },
        emailInput: { droid: '~~user-details-email-input', ios: '' },
        profileImagePicker: { droid: '~~user-details-profile-image-picker', ios: '' },
        galleryButton: { droid: '~~profile-image-gallery-button', ios: '' },
        selectionOk: { droid: 'android=new UiSelector().className("android.widget.Button").instance(6)', ios: '' },
        cropbutton: { droid: '~Crop', ios: '' },
        dateofbirth: { droid: '~~user-details-dob', ios: '' },
        datepickerbutton: { droid: '~~datepicker-ok-button', ios: '' },
        galleryImages: 'android=new UiSelector().descriptionMatches("^Photo taken on.*")',
    };

    async selectContractorPersona() {
        await waitAndClick(this.selectors.contractorCard);
    }

    async selectPainterPersona() {
        await waitAndClick(this.selectors.painterCard);
    }

    async addContractorDetails(phone) {
        await waitForElementVisible(this.selectors.contractorPhoneInput);
        await setValueFast(this.selectors.contractorPhoneInput, phone);
        await waitAndClick(this.selectors.contractorPhoneNextButton);
        await waitAndClick(this.selectors.contractorDetailsNextButton);
    }
    async uploadProfileImage() {
        await waitAndClick(this.selectors.profileImagePicker);
        await waitAndClick(this.selectors.galleryButton);
        await driver.waitUntil(
            async () => (await $$(this.selectors.galleryImages)).length > 0,
            { timeout: 15000, timeoutMsg: 'Gallery images not loaded' }
        );
        const firstImage = (await $$(this.selectors.galleryImages))[0];
        await firstImage.click();
        await waitAndClick(this.selectors.selectionOk);
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