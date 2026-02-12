import allure from '@wdio/allure-reporter';

const APP_ID = 'com.birlaopusid.contractorportal.uat';

export const baseConfig = {

    beforeScenario: async function () {
        await driver.reloadSession();
    },

    afterStep: async function (step, scenario, { error }) {
        if (error) {
            const screenshot = await browser.takeScreenshot();
            allure.addAttachment(
                'Failure Screenshot',
                Buffer.from(screenshot, 'base64'),
                'image/png'
            );
        }
    }
};
