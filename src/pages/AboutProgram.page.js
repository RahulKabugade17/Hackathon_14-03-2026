import { waitAndClick } from '../utils/CustomCommands.js';
import SignoutPage from './SignoutPage.js';
import HomePage from './HomePage.js';

class AboutProgramPage {

    selectors = {
        aboutProgramExpand: '~dropdown-arrow-icon',
        headerBackButton: '~~header-back-button',
        menuItems: {
            'FAQs': '~dropdown-text-faqs',
            'Privacy Policy': '~dropdown-text-privacy-policy',
            'Terms & Conditions': '~dropdown-text-terms-&-conditions',
            'Opus Partner': '~dropdown-text-opus-partner',
            'Loyalty': '~dropdown-text-loyalty'
        }
    };

    async expandAboutProgram() {
        await waitAndClick(this.selectors.aboutProgramExpand);
    }

    async clickAboutProgramMenu(menuItem) {
        await waitAndClick(this.selectors.menuItems[menuItem]);
    }

    async clickHeaderBackButton() {
        await waitAndClick(this.selectors.headerBackButton);
    }

    async verifyPageHeader(menuItem) {
        const header = await $(`android=new UiSelector().text("${menuItem}")`);
        const actualText = await header.getText();
        expect(actualText).toEqual(menuItem);
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

    async openAboutProgram(menuItem, persona) {
        await HomePage.verifyHomePageLoaded();
        await this.handleTooltips(persona);
        await this.expandAboutProgram();
        await this.clickAboutProgramMenu(menuItem);
        await this.verifyPageHeader(menuItem);
        await this.clickHeaderBackButton();
    }
}

export default new AboutProgramPage();
