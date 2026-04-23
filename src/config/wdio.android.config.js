import { baseConfig } from './wdio.base.config.js';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appPath = path.resolve('apps/app-uat.apk');

const deviceName = 'RZCWA000BGL';
const deviceVersion = '15';

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
        'appium:appWaitActivity': '*',
        'cjson:metadata': {
            app: {
                name: 'Birla Opus App (MainActivity)',
                version: '1.0.0'
            },
            device: deviceName,
            platform: {
                name: 'Android',
                version: deviceVersion
            }
        }
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
        }],
        ['cucumberjs-json', {
            jsonFolder: './reports/json/',
            language: 'en',
            useCucumberStepReporter: true,
            displayDuration: true,
            metadata: {
                browser: {
                    name: 'Android App',
                    version: 'N/A'
                },
                device: deviceName,
                platform: {
                    name: 'Android',
                    version: deviceVersion
                },
                app: {
                    name: 'Birla Opus App',
                    version: '1.0.0'
                }
            }
        }]
    ],

    cucumberOpts: {
        require: [
            path.resolve(__dirname, '../step-definitions/**/*.js')
        ],
        timeout: 200000,
        tagExpression: process.env.TAGS || '',
    },

    onComplete: async function (exitCode, config, capabilities, results) {
        try {
            console.log('\x1b[36mGenerating Cucumber HTML Report...\x1b[0m');
            // Calculate duration
            const durationMs = Date.now() - global.testStartTime;
            const seconds = Math.floor((durationMs / 1000) % 60);
            const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
            process.env.TEST_DURATION = `${minutes}m ${seconds}s`;

            // Pass environment data to the report generator script
            process.env.APP_NAME = 'Birla Opus App';
            process.env.PLATFORM_NAME = 'Android';
            process.env.TEST_ENV = 'QA';
            process.env.DEVICE_NAME = deviceName;
            process.env.DEVICE_VERSION = deviceVersion;

            // Execute the generation script independently after tests
            execSync('node ./src/utils/generate-report.js', { stdio: 'inherit' });
            console.log('✅ HTML Report generated successfully');
        } catch (error) {
            console.error('❌ Failed to generate HTML Report:', error);
        }
    }
};