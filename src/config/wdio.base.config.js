import allure from '@wdio/allure-reporter';

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