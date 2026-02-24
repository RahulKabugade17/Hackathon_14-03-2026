import { waitAndClick, waitForElementVisible, clickAndType } from '../utils/CustomCommands.js';
import Gestures from '../utils/Gestures.js';
import { execSync } from 'child_process';

class DeleteAccountPage {
    selectors = {
        deleteAccountClickHere: '~~delete-account-click-here',
        deleteAnywayButton: '~~delete-account-confirm-button',
        deleteOtpInput0: '~~delete-account-otp-input-0',
        deleteAccountSubmit: '~~delete-account-otp-submit-button'
    };

    async enterOtp(otp) {
        const digits = otp.split('');
        for (let i = 0; i < digits.length; i++) {
            const field = await $(`~~delete-account-otp-input-${i}`);
            await field.waitForDisplayed({ timeout: 300 });
            await field.setValue(digits[i]);
        }
    }

    async clearDeviceLogs() {
        try {
            await driver.execute('mobile: shell', { command: 'logcat', args: ['-c'] });
        } catch {
            console.log('⚠️ Unable to clear logcat');
        }
    }

    async extractDeleteUrl() {
        await driver.pause(2500);
        try {
            const udid = driver.capabilities.udid;
            const output = execSync(`adb -s ${udid} logcat -d`, {
                encoding: 'utf-8',
                maxBuffer: 1024 * 1024 * 10
            });
            const line = output.split('\n').find(l =>
                /Delete_account_web_url/i.test(l)
            );
            if (!line) return null;
            const match = line.match(/https?:\/\/[^\s'"]+/i);
            const url = match?.[0]?.trim();
            if (!url) return null;
            console.log(`[${udid}] Delete_account_web_url: ${url}`);
            return (global.DELETE_URL = url);
        } catch {
            console.log('❌ Delete URL extraction failed');
            return null;
        }
    }

    async switchToWebView() {
        await driver.pause(3000);
        const webview = (await driver.getContexts()).find(c => c.includes('WEBVIEW'));
        if (!webview) throw new Error('❌ WebView not found');
        await driver.switchContext(webview);
    }

    async completeDeleteInWeb(url) {
        const { chromium } = await import('playwright');
        const browser = await chromium.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(url);
        await page.getByText(/I understand/i).click();
        await page.getByRole('button', { name: /Delete Account/i }).waitFor({ state: 'visible', timeout: 15000 });
        await page.getByRole('button', { name: /Delete Account/i }).click();
        await browser.close();
    }

    async deleteAccount(otp) {
        for (let i = 0; i < 2; i++) await Gestures.swipeUp(0.6);
        await this.clearDeviceLogs();
        await waitAndClick(this.selectors.deleteAccountClickHere);
        await waitAndClick(this.selectors.deleteAnywayButton);
        await waitForElementVisible(this.selectors.deleteOtpInput0, 30000);
        await this.enterOtp(otp);
        await waitAndClick(this.selectors.deleteAccountSubmit);
        const url = await this.extractDeleteUrl();
        await this.completeDeleteInWeb(url);
    }
}

export default new DeleteAccountPage();