import { waitAndClick, waitForElementVisible, setValueFast } from '../utils/custom-commands.js';

import { swipeScreen } from '../utils/custom-commands.js';
import contractorData from '../test-data/contractor.data.json' with { type: 'json' };

class GeneralDetailsPage {
    selectors = { 
        generalDetailsButton: { droid: '~General Details', ios: '' },
        editFirstName: { droid: '~general-details-item-first-name-subtitle', ios: '' },
        editLastName: { droid: '~general-details-item-last-name-subtitle', ios: '' },
        editDOB: { droid: '~general-details-item-dob-subtitle', ios: '' },
        editCommunicationAddress: { droid: '~general-details-item-communication-address-subtitle', ios: '' },
        editPermanentAddress: { droid: '~general-details-item-permanent-address-subtitle', ios: '' },
        editEmail: { droid: '~general-details-item-email-address-subtitle', ios: '' },
        editGST: { droid: '~general-details-item-gst-number-subtitle', ios: '' },
        editCompanyName: { droid: '~general-details-item-company-name-subtitle', ios: '' },
        editFirmAddress: { droid: '~general-details-item-firm-address-subtitle', ios: '' },
        teamSizeTitle: { droid: '~general-details-item-team-size-title', ios: '' },
        firstNameInput: { droid: '~first-name-edit-modal-input', ios: '' },
        lastNameInput: { droid: '~last-name-edit-modal-input', ios: '' },
        dateSelect: { droid: '~~datepicker-day-2008-03-13', ios: '' },
        datePickerOkButton: { droid: '~~datepicker-ok-button', ios: '' },
        communicationAddressInput1: { droid: '~com-address-edit-modal-address-line1-input', ios: '' },
        communicationAddressInput2: { droid: '~com-address-edit-modal-address-line2-input', ios: '' },
        permanentAddressInput1: { droid: '~perm-address-edit-modal-address-line1-input', ios: '' },
        permanentAddressInput2: { droid: '~perm-address-edit-modal-address-line2-input', ios: '' },
        editEmailInput: { droid: '~email-address-edit-modal-input', ios: '' },
        editGSTInput: { droid: '~gst-number-modal-input', ios: '' },
        editCompanyNameInput: { droid: '~firm-name-edit-modal-input', ios: '' },
        editFirmAddressInput: { droid: '~firm-address-edit-modal-input', ios: '' },
        saveButtonFirstName: { droid: '~first-name-edit-modal-save-button', ios: '' },
        saveButtonLastName: { droid: '~last-name-edit-modal-save-button', ios: '' },
        saveButtonCommunicationAddress: { droid: '~com-address-edit-modal-save-button', ios: '' },
        saveButtonPermanentAddress: { droid: '~perm-address-edit-modal-save-button', ios: '' },
        saveButtonEmail: { droid: '~email-address-edit-modal-save-button', ios: '' },
        verifyGST: { droid: '~gst-number-modal-verify-button', ios: '' },
        cancelGST: { droid: '~gst-number-modal-cancel-button', ios: '' },
        saveButtonCompanyName: { droid: '~firm-name-edit-modal-save-button', ios: '' },
        saveButtonFirmAddress: { droid: '~firm-address-edit-modal-save-button', ios: '' },
        workLocationDetails: { droid: '~general-details-item-work-location-subtitle', ios: '' }
    };

    async clickGeneralDetails() {
        await waitAndClick(this.selectors.generalDetailsButton);
        await waitForElementVisible(this.selectors.editFirstName);
    }

    async scrollUntilVisible(selector, maxSwipes = 5) {
        for (let i = 0; i < maxSwipes; i++) {
        const el = await $(selector.droid);

        if (await el.isDisplayed().catch(() => false)) {
            return el;
        }

            await swipeScreen(0.7, 0.4);
        }

        throw new Error(`Element not found after ${maxSwipes} swipes: ${selector.droid}`);
    }

    async editPersonalDetails() {
        const data = contractorData;
        await waitAndClick(this.selectors.editFirstName);
        await waitForElementVisible(this.selectors.firstNameInput);
        await setValueFast(this.selectors.firstNameInput, data.generalInformation.firstName);
        await waitAndClick(this.selectors.saveButtonFirstName);
        await waitAndClick(this.selectors.editLastName);
        await waitForElementVisible(this.selectors.lastNameInput);
        await setValueFast(this.selectors.lastNameInput, data.generalInformation.lastName);
        await waitAndClick(this.selectors.saveButtonLastName);
        await waitAndClick(this.selectors.editDOB);
        await waitAndClick(this.selectors.dateSelect);
        await waitAndClick(this.selectors.datePickerOkButton);
        await waitAndClick(this.selectors.editCommunicationAddress);
        await waitForElementVisible(this.selectors.communicationAddressInput1);
        await setValueFast(this.selectors.communicationAddressInput1, data.generalInformation.communicationAddress.addressLine1);
        await setValueFast(this.selectors.communicationAddressInput2, data.generalInformation.communicationAddress.addressLine2);
        await waitAndClick(this.selectors.saveButtonCommunicationAddress);
        await waitAndClick(this.selectors.editPermanentAddress);
        await waitForElementVisible(this.selectors.permanentAddressInput1);
        await setValueFast(this.selectors.permanentAddressInput1, data.generalInformation.permanentAddress.addressLine1);
        await setValueFast(this.selectors.permanentAddressInput2, data.generalInformation.permanentAddress.addressLine2);
        await waitAndClick(this.selectors.saveButtonPermanentAddress);
        await waitAndClick(this.selectors.editEmail);
        await waitForElementVisible(this.selectors.editEmailInput);
        await setValueFast(this.selectors.editEmailInput, data.generalInformation.email);
        await waitAndClick(this.selectors.saveButtonEmail);
        await this.scrollUntilVisible(this.selectors.teamSizeTitle);
        await waitForElementVisible(this.selectors.editGST);
        await waitAndClick(this.selectors.editGST);
        await waitForElementVisible(this.selectors.editGSTInput);
        await setValueFast(this.selectors.editGSTInput, data.businessInformation.gstNumber);
        await waitAndClick(this.selectors.verifyGST);
        await waitAndClick(this.selectors.editCompanyName);
        await waitForElementVisible(this.selectors.editCompanyNameInput);
        await setValueFast(this.selectors.editCompanyNameInput, data.businessInformation.companyName);
        await waitAndClick(this.selectors.saveButtonCompanyName);
        await waitAndClick(this.selectors.editFirmAddress);
        await setValueFast(this.selectors.editFirmAddressInput, data.businessInformation.firmAddress);
        await waitAndClick(this.selectors.saveButtonFirmAddress);
        await this.scrollUntilVisible(this.selectors.workLocationDetails);
        await waitForElementVisible(this.selectors.workLocationDetails);
    }
}

export default new GeneralDetailsPage();