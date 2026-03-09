import allure from '@wdio/allure-reporter';
import cucumberJson from 'wdio-cucumberjs-json-reporter';
import fs from 'fs-extra';

export const baseConfig = {

    onPrepare: function (config, capabilities) {
        global.testStartTime = Date.now();
        fs.removeSync('./reports/json/');
        fs.removeSync('./allure-results');
        fs.ensureDirSync('./reports/json/');
    },

    beforeScenario: async function () {
        await driver.reloadSession();
    },

    afterStep: async function (step, scenario, { error }) {
        if (error) {
            const screenshot = await browser.takeScreenshot();

            // For Allure
            allure.addAttachment(
                'Failure Screenshot',
                Buffer.from(screenshot, 'base64'),
                'image/png'
            );

            // For Cucumber HTML Reporter
            cucumberJson.attach(screenshot, 'image/png');
        }
    }
};
