import { waitAndClick, waitForVisible } from '../utils/custom-commands.js';
import HomePage from './home.page.js';
import Gestures from '../utils/gestures.js';


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
        TooltipSkip: {
            droid: [
                '~language-tooltip-skip-button',
                '~language-tooltip-submit-button',

                '~my-projects-tooltip-submit-button',
                '~ic-my-projects-tooltip-submit-button'
            ]
        },
        signOutButton: {
            droid: '~sign-out-button',
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
        await waitAndClick(this.selectors.openDrawerMenu.droid);
    }

    async verifyPageHeader(menuItem) {
        const header = await $(`//*[@text="${menuItem}"]`);
        await header.waitForDisplayed({ timeout: 10000 });
        const actualText = await header.getText();
        expect(actualText).toEqual(menuItem);
    }
    async handleTooltips() {
        await this.openDrawerMenu();
        await driver.pause(1000);
        const el = await waitForVisible(this.selectors.TooltipSkip);
        await el.click();
    }

    async verifyAllMenuItems(persona) {
        await HomePage.verifyHomePageLoaded(persona)
        await this.handleTooltips();
        await this.expandAboutProgram();
        await Gestures.scrollUntilElementVisible(this.selectors.signOutButton.droid, 2);
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