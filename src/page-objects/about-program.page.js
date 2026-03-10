import { waitAndClick, clickIfPresent } from '../utils/custom-commands.js';
import HomePage from './home.page.js';

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
        },
        openDrawerMenu: {
            droid: '~open-drawer-menu',
            ios: ''
        },
        languageTooltipSubmitButton: {
            droid: '~language-tooltip-submit-button',
            ios: ''
        },
        myProjectsTooltipSubmitButton: {
            droid: '~my-projects-tooltip-submit-button',
            ios: ''
        },
        icMyProjectsTooltipSubmitButton: {
            droid: '~ic-my-projects-tooltip-submit-button',
            ios: ''
        }
    };

    async expandAboutProgram() {
        await waitAndClick(this.selectors.aboutProgramExpand);
    }

    async clickHeaderBackButton() {
        await waitAndClick(this.selectors.headerBackButton);
    }

    async openDrawerMenu() {
        await waitAndClick(this.selectors.openDrawerMenu);
    }

    async verifyPageHeader(menuItem) {
        const header = await $(`//*[@text="${menuItem}"]`);
        await header.waitForDisplayed({ timeout: 10000 });
        const actualText = await header.getText();
        expect(actualText).toEqual(menuItem);
    }

    async handleTooltips() {
        await this.openDrawerMenu();
        const tooltipSelectors = [
            this.selectors.languageTooltipSubmitButton,
            this.selectors.myProjectsTooltipSubmitButton,
            this.selectors.icMyProjectsTooltipSubmitButton
        ];
        let tooltipFound = true;
        while (tooltipFound) {
            tooltipFound = false;
            for (const selector of tooltipSelectors) {
                const clicked = await clickIfPresent(selector);
                if (clicked) {
                    tooltipFound = true;
                    break;
                }
            }
        }
    }

    async verifyAllMenuItems() {
        await HomePage.verifyHomePageLoaded();
        await this.handleTooltips();
        await this.expandAboutProgram();
        for (const [menuItem, selector] of Object.entries(this.selectors.menuItems)) {
            const el = await $(selector);
            if (!(await el.isExisting())) continue;
            await waitAndClick(selector);
            await this.verifyPageHeader(menuItem);
            await this.clickHeaderBackButton();
            await driver.pause(500);
        }
    }
}

export default new AboutProgramPage();