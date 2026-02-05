import { waitForElementVisible, waitAndClick } from '../utils/CustomCommands.js';
import SignoutPage from './SignoutPage.js';

class AboutProgramPage {

    selectors = {
        aboutProgramExpand: {
            droid: '~dropdown-arrow-icon',
            ios: ''
        },

        menuItems: {
            'FAQs': '~dropdown-text-faqs',
            'Privacy Policy': '~dropdown-text-privacy-policy',
            'Terms & Conditions': '~dropdown-text-terms-&-conditions',
            'Opus Partner': '~dropdown-text-opus-partner',
            'Loyalty': '~dropdown-text-loyalty'
        },

        headerBackButton: {
            droid: '~~header-back-button',
            ios: ''
        }
    };
    async expandAboutProgram() {
        await waitAndClick(this.selectors.aboutProgramExpand);
    }

    async clickAboutProgramMenu(menuItem) {
        const selector = this.selectors.menuItems[menuItem];

        if (!selector) {
            throw new Error(`No accessibility id mapped for menu item: ${menuItem}`);
        }

        await waitAndClick({ droid: selector });
    }

    async clickHeaderBackButton() {
        await waitAndClick(this.selectors.headerBackButton);
    }

    /* ---------------- VERIFICATION ---------------- */

    async verifyPageHeader(menuItemText) {
        const headerSelector = {
            droid: `android=new UiSelector().text("${menuItemText}")`,
            ios: ''
        };

        const header = await $(headerSelector.droid);
        await header.waitForDisplayed({ timeout: 10000 });
    }

    async handleTooltips(persona) {
        await SignoutPage.openDrawerMenu();
        if (persona === 'institutional_contractor') {
            await SignoutPage.icMyProjectsTooltipSubmitButton();
        }
        else if (persona === 'contractor' || persona === 'trade_contractor') {
            await SignoutPage.languageTooltipSubmitButton();
            await SignoutPage.myProjectsTooltipSubmitButton();
        }
        else if (persona === 'painter') {
            await SignoutPage.languageTooltipSubmitButton();
        }
    }
}

export default new AboutProgramPage();
