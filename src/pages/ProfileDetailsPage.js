import { waitAndClick, waitForElementVisible, setValueFast } from '../utils/CustomCommands.js';

class ProfileDetailsPage {
    selectors = {
        contractorCard: { droid: '~~usertype-select-contractor' },
        painterCard: { droid: '~~usertype-select-painter' },
        firstNameInput: { droid: '~~user-details-firstname-input' },
        lastNameInput: { droid: '~~user-details-lastname-input' },
        finishButton: { droid: '~~user-details-finish-button' },
        profileDetailsStep: { droid: '~~required-step-item-0' },
        contractorPhoneInput: { droid: '~~validate-mobile-phone-input' },
        contractorPhoneNextButton: { droid: '~~validate-mobile-next-button' },
        contractorDetailsNextButton: { droid: '~~contractor-details-next-button' },
    };

    async selectContractorPersona() {
        await waitAndClick(this.selectors.profileDetailsStep);
        await waitAndClick(this.selectors.contractorCard);
        console.log('[HOME] Contractor persona selected');
    }

    async selectPainterPersona() {
        await waitAndClick(this.selectors.profileDetailsStep);
        await waitAndClick(this.selectors.painterCard);
        console.log('[HOME] Painter persona selected');
    }

    async addContractorDetails(phone) {
        await waitForElementVisible(this.selectors.contractorPhoneInput);
        await setValueFast(this.selectors.contractorPhoneInput, phone);
        await waitAndClick(this.selectors.contractorPhoneNextButton);
        await waitAndClick(this.selectors.contractorDetailsNextButton);
        console.log('[HOME] Contractor details added');
    }


    async enterDetails(fname, lname) {
        await waitForElementVisible(this.selectors.firstNameInput);
        await setValueFast(this.selectors.firstNameInput, fname);
        await setValueFast(this.selectors.lastNameInput, lname);
        await waitAndClick(this.selectors.finishButton);
        console.log('[HOME] Profile details entered');
    }
}

export default new ProfileDetailsPage();
