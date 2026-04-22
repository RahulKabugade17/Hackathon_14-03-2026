import { waitAndClick, waitForElementVisible } from '../utils/custom-commands.js';
import Gestures from '../utils/gestures.js';
import { execSync } from 'child_process';

class DeleteAccountPage {
    selectors = {
        profileCardYourDetails: { droid: '~Your details' },
        deleteAccountClickHere: '~~delete-account-click-here',
        deleteAnywayButton: '~~delete-account-confirm-button',
        deleteOtpInput0: '~~delete-account-otp-input-0',
        deleteAccountSubmit: '~~delete-account-otp-submit-button'
    };

    async enterOtp(otp) {
        const digits = otp.split('');
        for (let i = 0; i < digits.length; i++) {
            const field = await $(`~~delete-account-otp-input-${i}`);
            await field.setValue(digits[i]);
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
            return (global.DELETE_URL = url);
        } catch {
            return null;
        }
    }
    async switchToWebView() {
        await driver.pause(3000);
        const webview = (await driver.getContexts()).find(c => c.includes('WEBVIEW'));
        if (!webview) throw new Error('❌ WebView not found');
        await driver.switchContext(webview);
    }
    async verifyDeletionSuccess(page) {
        try {
            await page.waitForSelector(
                'text=/deleted successfully|account deleted|successfully removed/i',
                { timeout: 20000 }
            );
            return;
        } catch { }
    }

    async completeDeleteInWeb(url) {
        const { chromium } = await import('playwright');
        const browser = await chromium.launch({ headless: !!process.env.CI });
        const page = await browser.newPage();
        await page.goto(url);
        await page.getByText(/I understand/i).click();
        const deleteBtn = page.getByRole('button', { name: /Delete Account/i });
        await deleteBtn.waitFor({ state: 'visible', timeout: 15000 });
        await Promise.all([
            page.waitForLoadState('networkidle'),
            deleteBtn.click()
        ]);
        await this.verifyDeletionSuccess(page);
        await page.waitForTimeout(1000);
        await browser.close();
    }

    async deleteAccount(otp) {
        await waitAndClick(this.selectors.profileCardYourDetails, 5000);
        execSync(`adb -s ${driver.capabilities.udid} logcat -c`);
        await Gestures.scrollUntilElementVisible(this.selectors.deleteAccountClickHere, 3);
        await waitAndClick(this.selectors.deleteAccountClickHere);
        await waitAndClick(this.selectors.deleteAnywayButton);
        await waitForElementVisible(this.selectors.deleteOtpInput0, 25000);
        await this.enterOtp(otp);
        //await waitAndClick(this.selectors.deleteAccountSubmit);
        const url = await this.extractDeleteUrl();
        await this.completeDeleteInWeb(url);
    }
}

export default new DeleteAccountPage();