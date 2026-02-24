import { waitAndClick } from '../utils/custom-commands.js';

class LanguagePage {
    selectors = {
        englishOption: {
            droid: '~~select-language-item-en',
            ios: ''
        },
        selectLanguageButton: {
            droid: '~~select-language-button',
            ios: ''
        }
    };

    async selectEnglishLanguage() {
        await waitAndClick(this.selectors.englishOption);
        await waitAndClick(this.selectors.selectLanguageButton);
    }
}

export default new LanguagePage();