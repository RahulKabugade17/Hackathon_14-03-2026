import { waitAndClick, waitForElementVisible, setValueFast } from '../utils/CustomCommands.js';

class ProfileDetailsPage {
    selectors = {
        contractorCard: {
            droid: '~~usertype-select-contractor',
            ios: ''
        },
        painterCard: {
            droid: '~~usertype-select-painter',
            ios: ''
        },
        firstNameInput: {
            droid: '~~user-details-firstname-input',
            ios: ''
        },
        lastNameInput: {
            droid: '~~user-details-lastname-input',
            ios: ''
        },
        finishButton: {
            droid: '~~user-details-finish-button',
            ios: ''
        },
        profileDetailsStep: {
            droid: '~~required-step-item-0',
            ios: ''
        },
        contractorPhoneInput: {
            droid: '~~validate-mobile-phone-input',
            ios: ''
        },
        contractorPhoneNextButton: {
            droid: '~~validate-mobile-next-button',
            ios: ''
        },
        contractorDetailsNextButton: {
            droid: '~~contractor-details-next-button',
            ios: ''
        },
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


    async enterDetails(fname, lname) {
        await waitForElementVisible(this.selectors.firstNameInput);
        await setValueFast(this.selectors.firstNameInput, fname);
        await setValueFast(this.selectors.lastNameInput, lname);
        await waitAndClick(this.selectors.finishButton);
    }
    async openProfileDetailsStep() {
        await waitAndClick(this.selectors.profileDetailsStep);
    }
}

export default new ProfileDetailsPage();
