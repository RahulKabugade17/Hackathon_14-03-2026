import { waitAndClick, waitForElementVisible, setValueFast } from '../utils/CustomCommands.js';

class BankAccountPage {
    selectors = {
        bankStep: {
            droid: '~~required-step-item-0',
            ios: ''
        },
        nextButton: {
            droid: '~~upi-details-proceed-bank-button',
            ios: ''
        },
        accountNumberInput: {
            droid: '~~bank-details-account-number-input',
            ios: ''
        },
        confirmAccountNumberInput: {
            droid: '~~bank-details-re-account-number-input',
            ios: ''
        },
        ifscCodeInput: {
            droid: '~~bank-details-ifsc-code-input',
            ios: ''
        },
        checkbox: {
            droid: '~~bank-details-checkbox',
            ios: ''
        },
        submitButton: {
            droid: '~~bank-details-next-button',
            ios: ''
        },
        confirmBankButton: {
            droid: '~~confirm-bank-yes-button',
            ios: ''
        }
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

export default new BankAccountPage();
