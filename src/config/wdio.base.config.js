import allure from '@wdio/allure-reporter';
import * as os from "os";

const maxInstances = 1;
const cucumberTimeout = 60000;
const waitTimeout = 10000;
const retryTimeout = 120000;
const retryCount = 2;
const logType = 'debug';
const bailCount = 0;

export const logPath = './logs';
export const baseConfig = {
    runner: 'local',
    path: '/wd/hub',
    maxInstances: maxInstances,
    logLevel: logType,
    bail: bailCount,
    waitforTimeout: waitTimeout,
    connectionRetryTimeout: retryTimeout,
    connectionRetryCount: retryCount,
    outputDir: logPath,
    // Disable Bidi protocol to avoid WebDriver Bidi errors
    enableBiDi: false,

    framework: 'cucumber',
    cucumberOpts: {
        timeout: cucumberTimeout,
        require: ['./src/stepDefinitions/**/*.js'],
        tags: ['@smoke'],
    },

    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs        List of spec file paths that are to be run
     * @param {Object}         browser      instance of created browser/device session
     */
    before: async function (capabilities, specs) {
        try {
            await import('../utils/CustomCommands.js');
        } catch (err) {
            console.warn('Warning: Failed to import custom commands:', err);
        }
    },

    afterStep: async function (step, context, { error }) {
        if (error) {
            const screenshot = await browser.takeScreenshot();
            allure.addAttachment('Screenshot on Failure', Buffer.from(screenshot, 'base64'), 'image/png');
        }
    },

    beforeScenario: async function () {
        await driver.startRecordingScreen();
    },

    afterScenario: async function (world, result) {
        const video = await driver.stopRecordingScreen();
        if (result.passed === false) {
            allure.addAttachment('Screen Recording', Buffer.from(video, 'base64'), 'video/mp4');
        }
    },
};
