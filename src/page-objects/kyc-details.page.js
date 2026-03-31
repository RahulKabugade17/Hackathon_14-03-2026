import { waitAndClick, waitForElementVisible, setValueFast } from '../utils/custom-commands.js';

import painterData from '../test-data/painter.data.json' with { type: 'json' };

class KycDetailsPage {
    selectors = {
        panNumber: { droid: 'android=new UiSelector().text("PAN Number")', ios: '' },
        addNewUPI: { droid: 'android=new UiSelector().text("Add new UPI ID")', ios: '' },
        panInput: { droid: '~~pan-input', ios: '' },
        verifyButton: { droid: '~~pan-verify-button', ios: '' },
        saveButton: { droid: '~~verify-pan-save-button', ios: '' },
        upiIdInput: { droid: '~~upi-details-upi-id-input', ios: '' },
        upiNextButton: { droid: '~~upi-details-next-button', ios: '' },
        confirmUPIIDButton: { droid: '~~confirm-upi-add-button', ios: '' },
        verifiedPan: { droid: 'android=new UiSelector().text("Verified")', ios: '' },
        defaultUPI: { droid: 'android=new UiSelector().text("Default")', ios: '' }
    };

    async editKycDetails() {
        const data = painterData.kyc;
        await waitAndClick(this.selectors.panNumber);
        await waitForElementVisible(this.selectors.panInput);
        await setValueFast(this.selectors.panInput, data.pan);
        await waitAndClick(this.selectors.verifyButton);
        await waitAndClick(this.selectors.saveButton);
        await waitAndClick(this.selectors.addNewUPI);
        await waitForElementVisible(this.selectors.upiIdInput);
        await setValueFast(this.selectors.upiIdInput, data.upi);
        await waitAndClick(this.selectors.upiNextButton);
        await waitAndClick(this.selectors.confirmUPIIDButton);
    }

    async verifyKycDetails() {
        await waitForElementVisible(this.selectors.verifiedPan);
        await waitForElementVisible(this.selectors.defaultUPI);
    }

}  

export default new KycDetailsPage();