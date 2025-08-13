import { baseConfig, logPath } from './wdio.base.config.js';
import path from "path";
import allure from '@wdio/allure-reporter';
import os from "os";

const relativePath = 'apps/androidApp.apk';
const absolutePath = path.resolve(relativePath);
const host = '0.0.0.0';
const port = 4723;
const deviceName = 'emulator-5554';
const deviceVersion = '12.0';
const launchTimeout = 120000;
const readyTimeout = 120000;
const isHeadless = false;
const appPath = absolutePath;

const droidConf = {
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
    port: port,
    specs: ['../features/*.feature'],
    capabilities: [
        {
            browserName: 'Android',
            platformName: 'Android',
            'appium:platformVersion': deviceVersion,
            'appium:deviceName': deviceName,
            'appium:app': appPath,
            'appium:automationName': 'UiAutomator2',
            'appium:avdLaunchTimeout': launchTimeout,
            'appium:avdReadyTimeout': readyTimeout,
            'appium:autoGrantPermissions': true,
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
                Platform: 'Android',
                Environment: 'QA',
                App_Version: '1.0.0',
                Device_Id: deviceName,
                Device_Version: deviceVersion,
                node_version: process.version,
            },
        }]
    ],
};

export const config = droidConf;
