import allure from '@wdio/allure-reporter';

const APP_ID = 'com.birlaopusid.contractorportal.uat';

export const baseConfig = {
    runner: 'local',
    maxInstances: 1,
    framework: 'cucumber',
    waitforTimeout: 20000,

    beforeScenario: async function () {
        await driver.execute('mobile: clearApp', { appId: APP_ID });
        await driver.activateApp(APP_ID);
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
