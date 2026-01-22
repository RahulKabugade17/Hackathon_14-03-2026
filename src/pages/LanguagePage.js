import { waitAndClick } from '../utils/CustomCommands.js';

class LanguagePage {
    selectors = {
        englishOption: { droid: '~~select-language-item-en' },
        selectLanguageButton: { droid: '~~select-language-button' }
    };

    async selectEnglish() {
        await waitAndClick(this.selectors.englishOption);
        await waitAndClick(this.selectors.selectLanguageButton);
    }

    async clickonEnglishOption() {
        await waitAndClick(this.selectors.englishOption);
    }

    async clickonSelectLanguageButton() {
        await waitAndClick(this.selectors.selectLanguageButton);
    }
}

export default new LanguagePage();
