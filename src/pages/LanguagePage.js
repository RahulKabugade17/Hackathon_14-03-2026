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
    async clickonSelectLanguageButton() {
        await waitAndClick(this.selectors.selectLanguageButton);

    }
    async clickonEnglishOption() {
        await waitAndClick(this.selectors.englishOption);

    }
}

export default new LanguagePage();
