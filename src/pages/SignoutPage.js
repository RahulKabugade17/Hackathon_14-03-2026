import {
    waitAndClick
} from '../utils/CustomCommands.js';

class SignoutPage {
    selectors = {
        openDrawerMenu: { droid: '~open-drawer-menu' },
        languageTooltipSubmitButton: { droid: '~language-tooltip-submit-button' },
        myProjectsTooltipSubmitButton: { droid: '~my-projects-tooltip-submit-button' },
        icMyProjectsTooltipSubmitButton: { droid: '~ic-my-projects-tooltip-submit-button' },
        signoutButton: { droid: '~sign-out-button' },
        logoutButton: { droid: '~logout-button' }
    };

    async openDrawerMenu() {
        await waitAndClick(this.selectors.openDrawerMenu);
    }

    async languageTooltipSubmitButton() {
        await waitAndClick(this.selectors.languageTooltipSubmitButton);
    }

    async myProjectsTooltipSubmitButton() {
        await waitAndClick(this.selectors.myProjectsTooltipSubmitButton);
    }

    async icMyProjectsTooltipSubmitButton() {
        await waitAndClick(this.selectors.icMyProjectsTooltipSubmitButton);
    }

    async signoutButton() {
        await waitAndClick(this.selectors.signoutButton);
    }

    async logoutButton() {
        await waitAndClick(this.selectors.logoutButton);
    }

    async signout() {
        await this.signoutButton();
        await this.logoutButton();
    }

}

export default new SignoutPage();
