import { baseConfig } from './wdio.base.config.js';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const relativePath = 'apps/app-uat.apk';
const appPath = path.resolve(relativePath);

const deviceName = 'ZD222W38XD';
const deviceVersion = '16.0';

const droidConf = {
    ...baseConfig,

    runner: 'local',
    maxInstances: 1,

    hostname: '127.0.0.1',
    port: 4723,
    path: '/',

    specs: [
        path.resolve(__dirname, '../features/**/*.feature')
    ],

    connectionRetryTimeout: 150000,
    connectionRetryCount: 0,
    specFileRetries: 0,
    specFileRetriesDelay: 0,

    framework: 'cucumber',

    services: [
        ['appium', {
            args: {
                port: 4723,
                address: '127.0.0.1',
                relaxedSecurity: true
            },
            command: 'appium'
        }]
    ],

    capabilities: [{
        platformName: 'Android',
        'appium:platformVersion': deviceVersion,
        'appium:deviceName': deviceName,
        'appium:automationName': 'UiAutomator2',
        'appium:app': appPath,
        'appium:autoGrantPermissions': true,
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:chromedriverAutodownload': true,
        'appium:enablePerformanceLogging': true,
        'appium:newCommandTimeout': 600,
        'appium:adbExecTimeout': 120000,
        'appium:uiautomator2ServerInstallTimeout': 60000,
        'wdio:allowInsecure': ['adb_shell']
    }],

    logLevel: 'error',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 20000,

    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
            useCucumberStepReporter: true,
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
            './src/stepDefinitions/**/*.js',
            './src/support/hooks.js'
        ],
        timeout: 120000,
        tagExpression: process.env.TAGS || ''
    }
};

export const config = droidConf;
