import { baseConfig, logPath } from "./wdio.base.config.js";
import path from "path";
import { execSync } from "child_process";

const relativePath = "apps/DevServiceFoods.app";
const absolutePath = path.resolve(relativePath);
const host = "localhost";
const port = 4723;
const deviceName = "iPhone 16";
const deviceVersion = "18.3";
const isHeadless = false;
const appPath = absolutePath;

const iosConf = {
  ...baseConfig,
  services: [
    [
      "appium",
      {
        command: "appium",
        logPath: logPath,
        args: {
          address: host,
          port: port,
          sessionOverride: true,
          debugLogSpacing: true,
          logLevel: "debug",
        },
      },
    ],
  ],
  hostname: host,
  path: "wd/hub",
  port: port,
  specs: ["../features/*.feature"],
  capabilities: [
    {
      platformName: "iOS",
      browserName: "iOS",
      "appium:platformVersion": deviceVersion,
      "appium:deviceName": deviceName,
      "appium:app": appPath,
      "appium:automationName": "XCUITest",
      "appium:isHeadless": isHeadless,
      "cjson:metadata": {
        app: {
          name: "Birla Opus App",
          version: "1.0.0",
        },
        device: deviceName,
        platform: {
          name: "iOS",
          version: deviceVersion,
        },
      },
    },
  ],

  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        disableMochaHooks: true,
        useCucumberStepReporter: true,
        reportedEnvironmentVars: {
          Application: "Birla Opus App",
          Platform: "IOS",
          Environment: "QA",
          Device_Id: deviceName,
          Device_Version: deviceVersion,
          node_version: process.version,
        },
      },
    ],
    [
      "cucumberjs-json",
      {
        jsonFolder: "./reports/json/",
        language: "en",
        useCucumberStepReporter: true,
        displayDuration: true,
        metadata: {
          browser: {
            name: "iOS App",
            version: "N/A",
          },
          device: deviceName,
          platform: {
            name: "iOS",
            version: deviceVersion,
          },
          app: {
            name: "Birla Opus App",
            version: "1.0.0",
          },
        },
      },
    ],
  ],

  onComplete: async function (exitCode, config, capabilities, results) {
    try {
      console.log("\x1b[36mGenerating Cucumber HTML Report...\x1b[0m");
      // Calculate duration
      const durationMs = Date.now() - global.testStartTime;
      const seconds = Math.floor((durationMs / 1000) % 60);
      const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
      process.env.TEST_DURATION = `${minutes}m ${seconds}s`;

      // Pass environment data to the report generator script
      process.env.APP_NAME = "Birla Opus App";
      process.env.PLATFORM_NAME = "iOS";
      process.env.TEST_ENV = "QA";
      process.env.DEVICE_NAME = deviceName;
      process.env.DEVICE_VERSION = deviceVersion;

      // Execute the generation script independently after tests
      execSync("node ./src/utils/generate-report.js", { stdio: "inherit" });
      console.log("✅ HTML Report generated successfully");
    } catch (error) {
      console.error("❌ Failed to generate HTML Report:", error);
    }
  },
};

export const config = iosConf;
