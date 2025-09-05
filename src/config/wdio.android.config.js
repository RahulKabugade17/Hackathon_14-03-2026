import { baseConfig, logPath } from './wdio.base.config.js';
import path from "path";
import allure from '@wdio/allure-reporter';
import os from "os";

const relativePath = 'apps/app-uat-debug.apk';
const appPath = path.resolve(relativePath);
const deviceName = 'RZCWA000BGL';
const deviceVersion = '15.0';
const launchTimeout = 120000;
const readyTimeout = 120000;
const isHeadless = false;

const droidConf = {
    ...baseConfig,
    hostname: '0.0.0.0',
    port: 4723,
    path: '/',
    specs: ['../features/*.feature'],
    services: [
        ['appium', {
            args: {
                port: 4723,
                address: '0.0.0.0',
                relaxedSecurity: true
            },
            command: 'appium'
        }]
    ],

    capabilities: [
        {
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
                Application: 'Birla Opus App',
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
