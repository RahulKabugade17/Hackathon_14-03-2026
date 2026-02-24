import { waitAndClick, waitForElementVisible, setValueFast } from '../utils/custom-commands.js';

class PanKycPage {
    selectors = {
        panStep: {
            droid: '~~required-step-item-0',
            ios: ''
        },
        skipToPanButton: {
            droid: '~~aadhar-skip-to-pan-button',
            ios: ''
        },
        panInput: {
            droid: '~~pan-input',
            ios: ''
        },
        verifyButton: {
            droid: '~~pan-verify-button',
            ios: ''
        },
        saveButton: {
            droid: '~~verify-pan-save-button',
            ios: ''
        }
    };

    async verifyPan(pan) {
        await waitAndClick(this.selectors.panStep);
        await waitAndClick(this.selectors.skipToPanButton);
        await waitForElementVisible(this.selectors.panInput);
        await setValueFast(this.selectors.panInput, pan);
        await waitAndClick(this.selectors.verifyButton);
        await waitAndClick(this.selectors.saveButton);
    }
}

export default new PanKycPage();