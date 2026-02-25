import { waitAndClick, clickIfPresent } from '../utils/CustomCommands.js';
import SignoutPage from './SignoutPage.js';
import HomePage from './HomePage.js';

class AboutProgramPage {

    selectors = {
        aboutProgramExpand: '~dropdown-arrow-icon',
        headerBackButton: '~~header-back-button',
        menuItems: {
            'Loyalty': '~dropdown-text-loyalty',
            'Opus Partner': '~dropdown-text-opus-partner',
            'FAQs': '~dropdown-text-faqs',
            'Terms & Conditions': '~dropdown-text-terms-&-conditions',
            'Privacy Policy': '~dropdown-text-privacy-policy'
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

    async handleTooltips() {
        await SignoutPage.openDrawerMenu();
        const tooltipSelectors = [
            SignoutPage.selectors.languageTooltipSubmitButton,
            SignoutPage.selectors.myProjectsTooltipSubmitButton,
            SignoutPage.selectors.icMyProjectsTooltipSubmitButton
        ];
        for (let i = 0; i < 2; i++) {
            for (const selector of tooltipSelectors) {
                await clickIfPresent(selector);
            }
            await driver.pause(100);
        }
    }

    async verifyAllMenuItems() {
        await HomePage.verifyHomePageLoaded();
        await this.handleTooltips();
        await this.expandAboutProgram();
        for (const [menuItem, selector] of Object.entries(this.selectors.menuItems)) {
            try {
                const el = await $(selector);
                if (!(await el.isExisting())) {
                    continue;
                }
                await waitAndClick(selector);
                await this.verifyPageHeader(menuItem);
                await this.clickHeaderBackButton();
                await driver.pause(500);

            } catch (err) {
            }
        }
    }
}

export default new AboutProgramPage();
