import { waitAndClick, waitForElementVisible, setValueFast } from '../utils/CustomCommands.js';

class Bankaccountpage {
    selectors = {
        bankStep: { droid: '~~required-step-item-0' },
        nextButton: { droid: '~~upi-details-proceed-bank-button' },
        accountNumberInput: { droid: '~~bank-details-account-number-input' },
        confirmAccountNumberInput: { droid: '~~bank-details-re-account-number-input' },
        ifscCodeInput: { droid: '~~bank-details-ifsc-code-input' },
        checkbox: { droid: '~~bank-details-checkbox' },
        submitButton: { droid: '~~bank-details-next-button' },
        confirmBankButton: { droid: '~~confirm-bank-yes-button' }
    };

    async verifyBankDetails(accountNumber, ifscCode) {
        await waitAndClick(this.selectors.bankStep);
        await waitAndClick(this.selectors.nextButton);
        await waitForElementVisible(this.selectors.accountNumberInput);
        await setValueFast(this.selectors.accountNumberInput, accountNumber);
        await setValueFast(this.selectors.confirmAccountNumberInput, accountNumber);
        await setValueFast(this.selectors.ifscCodeInput, ifscCode);
        await waitAndClick(this.selectors.checkbox);
        await waitAndClick(this.selectors.submitButton);
        await waitAndClick(this.selectors.confirmBankButton);
    }
}

export default new Bankaccountpage();
