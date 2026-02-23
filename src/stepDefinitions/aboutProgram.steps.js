import { When } from '@wdio/cucumber-framework';
import AboutProgramPage from '../pages/AboutProgram.page.js';


When('I verify all About Program menu items', async function () {
    await AboutProgramPage.verifyAllMenuItems();
});
