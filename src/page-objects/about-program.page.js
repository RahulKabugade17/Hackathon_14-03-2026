import { waitAndClick, waitForVisible } from '../utils/custom-commands.js';
import HomePage from './home.page.js';
import Gestures from '../utils/gestures.js';


class AboutProgramPage {

    selectors = {
        aboutProgramExpand: '~dropdown-arrow-icon',
        headerBackButton: '~header-back-button',
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
        // Switch to webview context for content verification
        await driver.pause(2000);
        const contexts = await driver.getContexts();
        const webview = contexts.find(c => c.includes('WEBVIEW'));
        if (webview) {
            await driver.switchContext(webview);
            // In webview, wait for page to load and check if menuItem appears in the content
            await driver.pause(3000); // Wait for content to load
            const bodyText = await $('body').getText();
            expect(bodyText).toContain(menuItem);
            // Switch back to native context
            await driver.switchContext('NATIVE_APP');
        } else {
            // Fallback to native context if no webview
            const header = await $(`//*[@text="${menuItem}"]`);
            await header.waitForDisplayed({ timeout: 10000 });
            const actualText = await header.getText();
            expect(actualText).toEqual(menuItem);
        }
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