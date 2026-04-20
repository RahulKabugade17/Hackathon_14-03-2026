import reporter from "multiple-cucumber-html-reporter";
import fs from "fs-extra";
import path from "path";

const date = new Date();
const timestamp = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}`;

const REPORTS_BASE_DIR = path.resolve("./reports");
const JSON_DIR = path.resolve("./reports/json");
// The user wants a unique subfolder per report
const FINAL_REPORT_PATH = path.join(
  REPORTS_BASE_DIR,
  `cucumber-report-${timestamp}`,
);

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

const directories = [
  REPORTS_BASE_DIR,
  JSON_DIR,
  path.join(REPORTS_BASE_DIR, "screenshots"),
  path.join(REPORTS_BASE_DIR, "videos"),
  path.join(REPORTS_BASE_DIR, "videos/temp"),
];
directories.forEach(ensureDir);

// 3. Verify that at least one JSON report exists in the directory
if (!fs.existsSync(JSON_DIR)) {
  console.error(
    `\x1b[31mError: JSON directory does not exist: ${JSON_DIR}\x1b[0m`,
  );
  process.exit(1);
}

const files = fs.readdirSync(JSON_DIR).filter((file) => file.endsWith(".json"));
const hasValidJson = files.some((file) => {
  try {
    return fs.statSync(path.join(JSON_DIR, file)).size > 0;
  } catch {
    return false;
  }
});

if (!hasValidJson) {
  console.error(
    "\x1b[31mError: No valid Cucumber JSON reports found in JSON directory!\x1b[0m",
  );
  console.error(`Directory scanned: ${JSON_DIR}`);
  console.log("Ensure your tests generate JSON results in this folder.");
  process.exit(0); // Exit gracefully in automation if no tests were run
}

try {
  console.log("\x1b[36mGenerating Static HTML Report...\x1b[0m");

  reporter.generate({
    jsonDir: JSON_DIR,
    reportPath: FINAL_REPORT_PATH,
    displayDuration: true,
    openReportInBrowser: true,
    pageTitle: `Birla Opus App Automation Report - ${timestamp}`,
    reportName: `Birla Opus App Automation Report - ${timestamp}`,
    customData: {
      title: "Project Info",
      data: [
        {
          label: "Application",
          value: process.env.APP_NAME || "Birla Opus App",
        },
        { label: "Platform", value: process.env.PLATFORM_NAME || "Android" },
        { label: "Environment", value: process.env.TEST_ENV || "QA" },
        { label: "Device_Id", value: process.env.DEVICE_NAME || "N/A" },
        { label: "Device_Version", value: process.env.DEVICE_VERSION || "N/A" },
        {
          label: "Total Execution Time",
          value: process.env.TEST_DURATION || "N/A",
        },
      ],
    },
    customData: {
      title: "Project Info",
      data: [
        {
          label: "Application",
          value: process.env.APP_NAME || "Birla Opus App",
        },
        { label: "Platform", value: process.env.PLATFORM_NAME || "Mobile" },
        { label: "Environment", value: process.env.TEST_ENV || "QA" },
        { label: "Device_Id", value: process.env.DEVICE_NAME || "N/A" },
        { label: "Device_Version", value: process.env.DEVICE_VERSION || "N/A" },
        {
          label: "Total Execution Time",
          value: process.env.TEST_DURATION || "N/A",
        },
      ],
    },
    disableLog: false,
    pageFooter:
      '<div style="margin: 20px;"><p>Birla Opus App Automation Report</p></div>',
  });

  console.log(
    `\x1b[32mReport generated successfully at: ${FINAL_REPORT_PATH}\x1b[0m`,
  );
} catch (error) {
  console.error("\x1b[31mError generating HTML report:\x1b[0m");
  console.error(error.message);
  process.exit(1);
}
