import { waitAndClick, waitForElementVisible, setValueFast } from '../utils/CustomCommands.js';

class PanKycPage {
    selectors = {
        panStep: { droid: '~~required-step-item-0' },
        skipToPanButton: { droid: '~~aadhar-skip-to-pan-button' },
        panInput: { droid: '~~pan-input' },
        verifyButton: { droid: '~~pan-verify-button' },
        saveButton: { droid: '~~verify-pan-save-button' }
    };

    async verifyPan(pan) {
        await waitAndClick(this.selectors.panStep);
        await waitAndClick(this.selectors.skipToPanButton);
        await waitForElementVisible(this.selectors.panInput);
        await setValueFast(this.selectors.panInput, pan);
        await waitAndClick(this.selectors.verifyButton);
        await waitAndClick(this.selectors.saveButton);
        console.log('[HOME] Pan verified');
    }
}

export default new PanKycPage();
