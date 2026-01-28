import { waitAndClick } from '../utils/CustomCommands.js';
class LanguagePage {

    selectors = {
        selectLanguageButton: {
            droid: '~~select-language-item-en',
            ios: '',
        },
        englishOption: {
            droid: '~~select-language-button',
            ios: '',
        },
    };
    async selectEnglish() {
        await waitAndClick(this.selectors.selectLanguageButton);
        await waitAndClick(this.selectors.englishOption);
    }
}

export default new LanguagePage();
