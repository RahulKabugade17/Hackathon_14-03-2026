import allure from '@wdio/allure-reporter';
import * as os from "os";

const maxInstances = 1;
const cucumberTimeout = 120000;
const waitTimeout = 20000;
const retryTimeout = 150000;
const retryCount = 3;
const logType = 'info';
const bailCount = 0;

export const logPath = './logs';

export const baseConfig = {
    runner: 'local',

    maxInstances,

    logLevel: logType,
    bail: bailCount,

    waitforTimeout: waitTimeout,
    connectionRetryTimeout: retryTimeout,
    connectionRetryCount: retryCount,

    outputDir: logPath,
    framework: 'cucumber',

    cucumberOpts: {
        timeout: cucumberTimeout,
        require: ['./step_definitions/**/*.js'],
        tagExpression: '@smoke'
    },

    before: async function () {
        try {
            await import('../utils/CustomCommands.js');
            console.log('✔ Custom commands loaded');
        } catch (err) {
            console.warn('⚠ Failed to load custom commands:', err);
        }
    },

    beforeScenario: async function () {
        await driver.startRecordingScreen();
    },

    afterStep: async function (step, scenario, { error }) {
        if (error) {
            const screenshot = await browser.takeScreenshot();
            allure.addAttachment('Failure Screenshot', Buffer.from(screenshot, 'base64'), 'image/png');
        }
    },

    afterScenario: async function (world, result) {
        const video = await driver.stopRecordingScreen();
        if (result.passed === false) {
            allure.addAttachment('Failure Recording', Buffer.from(video, 'base64'), 'video/mp4');
        }
    }
};
