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
    framework: 'cucumber',
    cucumberOpts: {
        timeout: cucumberTimeout,
        require: ['./src/stepDefinitions/**/*.js'],
        tags: ['@smoke'],
    },

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
