import { waitAndClick, waitForElementVisible, setValueFast } from '../utils/custom-commands.js';

import { swipeScreen } from '../utils/custom-commands.js';
import painterData from '../test-data/painter.data.json' with { type: 'json' };
import { d } from '@serenity-js/core';

class GeneralDetailsPage {
    selectors = { 
        generalDetailsButton: { droid: '~General Details', ios: '' },
        editGST: { droid: '~general-details-item-gst-number-subtitle', ios: '' },
        editCompanyName: { droid: '~general-details-item-company-name-subtitle', ios: '' },
        editFirmAddress: { droid: '~general-details-item-firm-address-subtitle', ios: '' },
        teamSizeTitle: { droid: '~general-details-item-team-size-title', ios: '' },
        editGSTInput: { droid: '~gst-number-modal-input', ios: '' },
        editCompanyNameInput: { droid: '~firm-name-edit-modal-input', ios: '' },
        editFirmAddressInput: { droid: '~firm-address-edit-modal-input', ios: '' },
        verifyGST: { droid: '~gst-number-modal-verify-button', ios: '' },
        cancelGST: { droid: '~gst-number-modal-cancel-button', ios: '' },
        saveButtonCompanyName: { droid: '~firm-name-edit-modal-save-button', ios: '' },
        saveButtonFirmAddress: { droid: '~firm-address-edit-modal-save-button', ios: '' },
        workLocationDetails: { droid: '~general-details-item-work-location-subtitle', ios: '' },
        manageYourTeamButton: { droid: '~~manage-your-team-button-text', ios: '' },
        teamMemberTab: { droid: '~my-team-tab-text-1', ios: '' },
        addNewTeamMemberButton: { droid: '~add-new-member-text', ios: '' },
        addMemberFirstNameInput: { droid: '~~add-member-firstname-input', ios: '' },
        addMemberLastNameInput: { droid: '~~add-member-lastname-input', ios: '' },
        addMemberOpusIdInput: { droid: '~~add-member-opusid-input', ios: '' },
        addMemberMobileInput: { droid: '~~add-member-phone-input', ios: '' },
        addMemberSubmitButton: { droid: '~~add-member-submit-button', ios: '' },
        addMemberCancelButton: { droid: '~add-member-cancel-button', ios: '' },
        sendRequestButton: { droid: '~~add-member-confirm-submit-button', ios: '' },
        sendRequestCancelButton: { droid: '~~add-member-confirm-cancel-button', ios: '' },
        pendingRequestCard: { droid: '~~team-member-card-Ram CrmTesting0708 dubey', ios: '' },
    };

    async clickGeneralDetails() {
        await waitAndClick(this.selectors.generalDetailsButton);
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

    async scrollToBusinessInformation() {
        await this.scrollUntilVisible(this.selectors.teamSizeTitle);
    }

    async editBusinessInformation() {
        const data = painterData.businessInformation;
        await waitForElementVisible(this.selectors.editGST);
        await waitAndClick(this.selectors.editGST);
        await waitForElementVisible(this.selectors.editGSTInput);
        await setValueFast(this.selectors.editGSTInput, data.gstNumber);
        await waitAndClick(this.selectors.verifyGST);
        await waitAndClick(this.selectors.editCompanyName);
        await waitForElementVisible(this.selectors.editCompanyNameInput);
        await setValueFast(this.selectors.editCompanyNameInput, data.companyName);
        await waitAndClick(this.selectors.saveButtonCompanyName);
        await waitAndClick(this.selectors.editFirmAddress);
        await setValueFast(this.selectors.editFirmAddressInput, data.firmAddress);
        await waitAndClick(this.selectors.saveButtonFirmAddress);
    }

    async openManageYourTeam() {
        await this.scrollUntilVisible(this.selectors.manageYourTeamButton);
        await waitAndClick(this.selectors.manageYourTeamButton);
        await waitForElementVisible(this.selectors.teamMemberTab);
        await waitAndClick(this.selectors.teamMemberTab);
    }

    async addTeamMember() {
        const data = painterData.teamMember;
        await waitForElementVisible(this.selectors.addNewTeamMemberButton);
        await waitAndClick(this.selectors.addNewTeamMemberButton);
        await waitForElementVisible(this.selectors.addMemberFirstNameInput);
        await setValueFast(this.selectors.addMemberFirstNameInput, data.firstName);
        await setValueFast(this.selectors.addMemberLastNameInput, data.lastName);
        await setValueFast(this.selectors.addMemberMobileInput, data.mobileNumber);
        await waitAndClick(this.selectors.addMemberSubmitButton);
        await waitForElementVisible(this.selectors.sendRequestButton);
        await waitAndClick(this.selectors.sendRequestButton);
    }

    async verifyTeamMemberRequestSuccess() {
        await waitForElementVisible(this.selectors.pendingRequestCard, 10000);
        await driver.back();
        await driver.pause(2000);
        await driver.back();
    }

}

export default new GeneralDetailsPage();