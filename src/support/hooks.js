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
    if (scenario.result?.status === 'FAILED') {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

        if (!fs.existsSync('./logs')) {
            fs.mkdirSync('./logs');
        }

        try {
            const logs = await driver.getLogs('logcat');
            fs.writeFileSync(`./logs/logcat-${timestamp}.txt`, JSON.stringify(logs, null, 2));
            console.log('[ARTIFACT] Logcat saved');
        } catch {
            console.warn('[ARTIFACT] Logcat capture failed');
        }
    }

    try {
        await driver.terminateApp(APP_ID);
        console.log('[CLEANUP] App terminated');
    } catch {
        console.log('[CLEANUP] App already closed');
    }
});
