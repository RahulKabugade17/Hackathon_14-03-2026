import { baseConfig, logPath } from './wdio.base.config.js';
import path from 'path';

const relativePath = '../../apps/DevServiceFoods.app';
const absolutePath = path.resolve(__dirname, relativePath);
const host = 'localhost';
const port = 4723;
const deviceName = 'iPhone 16';
const deviceVersion = '18.3';
const isHeadless = false;
const appPath = absolutePath;

const iosConf = {
    ...baseConfig,
    services: [
        [
            'appium',
            {
                command: 'appium',
                logPath: logPath,
                args: {
                    address: host,
                    port: port,
                    sessionOverride: true,
                    debugLogSpacing: true,
                    logLevel: 'debug',
                },
            },
        ],
    ],
    hostname: host,
    path: 'wd/hub',
    port: port,
    specs: ['../features/*.feature'],
    capabilities: [
        {
            platformName: 'iOS',
            browserName: 'iOS',
            'appium:platformVersion': deviceVersion,
            'appium:deviceName': deviceName,
            'appium:app': appPath,
            'appium:automationName': 'XCUITest',
            'appium:isHeadless': isHeadless,
        },
    ],

    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
            disableMochaHooks: true,
            useCucumberStepReporter: true,
            reportedEnvironmentVars: {
                Application: 'Testing Webdriver io App',
                Platform: 'IOS',
                Environment: 'QA',
                App_Version: '1.0.0',
                Device_Id: deviceName,
                Device_Version: deviceVersion,
                node_version: process.version,
            },
        }]
    ],
};

export const config = iosConf;

export default config;
