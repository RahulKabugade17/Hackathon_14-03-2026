import { waitAndClick, waitForElementVisible, setValueFast } from '../utils/CustomCommands.js';

class BankKycPage {
    selectors = {
        bankStep: { droid: '~~required-step-item-0' },
        upiInput: { droid: '~~upi-details-upi-id-input' },
        nextButton: { droid: '~~upi-details-next-button' },
        addButton: { droid: '~~confirm-upi-add-button' }
    };

    async verifyBank(upi) {
        await waitAndClick(this.selectors.bankStep);
        await waitForElementVisible(this.selectors.upiInput);
        await setValueFast(this.selectors.upiInput, upi);
        await waitAndClick(this.selectors.nextButton);
        await waitAndClick(this.selectors.addButton);
    }
}

export default new BankKycPage();
