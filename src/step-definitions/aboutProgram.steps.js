import { When } from '@wdio/cucumber-framework';
import AboutProgramPage from '../page-objects/about-program.page.js';


When('I verify all About Program menu items', async function () {
    const persona = this.userType || global.userType;
    await AboutProgramPage.verifyAllMenuItems(persona);
});