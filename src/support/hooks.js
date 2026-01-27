import { Before, After } from '@wdio/cucumber-framework';
import fs from 'fs';

const APP_ID = 'com.birlaopusid.contractorportal.uat';

Before(async () => {
    console.log('[BEFORE] Resetting app state');

    try {
        await driver.terminateApp(APP_ID);
    } catch {
        console.log('[BEFORE] App not running');
    }

    await driver.activateApp(APP_ID);
    await driver.pause(3000);
});

After(async function (scenario) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const scenarioName = scenario.pickle?.name
        ?.replace(/[^a-zA-Z0-9]/g, '_')
        ?.toLowerCase();

    if (scenario.result?.status === 'FAILED') {
        try {
            if (!fs.existsSync('./screenshots')) {
                fs.mkdirSync('./screenshots');
            }

            const screenshot = await driver.takeScreenshot();
            const screenshotPath = `./screenshots/${scenarioName}-${timestamp}.png`;

            fs.writeFileSync(
                screenshotPath,
                screenshot,
                'base64'
            );

            await this.attach(screenshot, 'image/png');

        } catch (err) {
        }
        try {
            if (!fs.existsSync('./logs')) {
                fs.mkdirSync('./logs');
            }

            const logs = await driver.getLogs('logcat');
            fs.writeFileSync(
                `./logs/logcat-${scenarioName}-${timestamp}.txt`,
                JSON.stringify(logs, null, 2)
            );
        } catch {
        }
    }
    try {
        await driver.terminateApp(APP_ID);
        console.log('[CLEANUP] App terminated');
    } catch {
        console.log('[CLEANUP] App already closed');
    }
});
