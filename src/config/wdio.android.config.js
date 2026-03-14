import { baseConfig } from './wdio.base.config.js';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appPath = path.resolve(__dirname, '../../apps/app-uat.apk');

const deviceName = 'RZ8R91YMHJR';
const deviceVersion = '12.0';

export const config = {
    ...baseConfig,

    runner: 'local',
    maxInstances: 1,

    hostname: 'localhost',
    port: 4723,
    path: '/',

    specs: [
        path.resolve(__dirname, '../features/**/*.feature')
    ],

    framework: 'cucumber',

    services: [],

    capabilities: [{
        platformName: 'Android',
        'appium:platformVersion': deviceVersion,
        'appium:deviceName': deviceName,
        'appium:udid': deviceName,
        'appium:automationName': 'UiAutomator2',
        'appium:app': appPath,
        'appium:autoGrantPermissions': true,
        'appium:ignoreHiddenApiPolicyError': true,
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:newCommandTimeout': 600,
        'appium:adbExecTimeout': 200000,
        'appium:uiautomator2ServerInstallTimeout': 60000,
        'appium:allowInsecure': ['adb_shell'],
        'appium:appPackage': 'com.birlaopusid.contractorportal.uat',
        'appium:appActivity': 'com.birlaopusid.contractorportal.MainActivity',
        'appium:chromedriverAutodownload': true,
        'appium:autoWebviewTimeout': 20000,
        'appium:appWaitActivity': '*'
    }],

    logLevel: 'error',

    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
            reportedEnvironmentVars: {
                Application: 'Birla Opus App',
                Platform: 'Android',
                Environment: 'QA',
                Device_Id: deviceName,
                Device_Version: deviceVersion,
                Node_Version: process.version,
                OS: os.platform()
            }
        }]
    ],

    cucumberOpts: {
        require: [
            path.resolve(__dirname, '../step-definitions/**/*.js')
        ],
        timeout: 120000,
        scenarioLevelReporter: true,
        tagExpression: process.env.TAGS || ''
    }
};

export default config;
