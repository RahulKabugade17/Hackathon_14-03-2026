import { baseConfig, logPath } from './wdio.base.config.js';
import path from "path";
import allure from '@wdio/allure-reporter';
import os from "os";

// Updated APK and device details
const relativePath = 'apps/app-uat-debug.apk';
const appPath = path.resolve(relativePath);
const host = '0.0.0.0';
const port = 4723;
const deviceName = 'Pixel 7';
const deviceVersion = '16.0';
const launchTimeout = 120000;
const readyTimeout = 120000;
const isHeadless = false;

const droidConf = {
    ...baseConfig,
    // Remove Appium service to avoid Bidi issues
    services: [],
    hostname: host,
    path: '/wd/hub',
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
