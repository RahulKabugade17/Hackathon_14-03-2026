import { waitAndClick, waitForElementVisible, setValueFast } from '../utils/CustomCommands.js';

class ProfileDetailsPage {
    selectors = {
        contractorCard: { droid: '~~usertype-select-contractor' },
        firstNameInput: { droid: '~~user-details-firstname-input' },
        lastNameInput: { droid: '~~user-details-lastname-input' },
        finishButton: { droid: '~~user-details-finish-button' },
        profileDetailsStep: { droid: '~~required-step-item-0' }
    };

    async selectContractorPersona() {
        await waitAndClick(this.selectors.profileDetailsStep);
        await waitAndClick(this.selectors.contractorCard);
        console.log('[HOME] Contractor persona selected');
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
