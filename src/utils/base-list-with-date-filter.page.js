import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import { waitForElementVisible, waitAndClick } from './custom-commands.js';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);

export default class BaseListWithDateFilter {

    DATE_PICKER = {
        PREV_YEAR: '~from-to-date-picker-previous-year',
        NEXT_YEAR: '~from-to-date-picker-next-year',
        PREV_MONTH: '~from-to-date-picker-previous-month',
        NEXT_MONTH: '~from-to-date-picker-next-month',
        OK: '~from-to-date-picker-ok-button'
    };

    headerBackButton = '~~header-back-button';

    constructor(selectors) {
        this.selectors = selectors;
    }

    getSelector(selector) {
        return selector?.droid || selector;
    }

    async clickPickerButton(selector) {
        const el = await $(selector);
        await browser.waitUntil(async () => el.isDisplayed().catch(() => false), { timeout: 8000 });
        await el.click();
    }

    async search(text, submit = true) {
        const input = await $(this.getSelector(this.selectors.searchInput));
        await input.waitForDisplayed();
        await input.click();
        await input.clearValue();

        if (!submit) {
            await input.setValue(text);
            return;
        }

        await input.addValue(`${text}\n`);
        await this.triggerAndroidSearchFallback();
    }

    async triggerAndroidSearchFallback() {
        try {
            await driver.execute('mobile: performEditorAction', { action: 'search' });
        } catch {
            await driver.execute('mobile: pressKey', { keycode: 66 });
        }
    }

    async openFilter() {
        await waitAndClick(this.getSelector(this.selectors.filterButton));
    }

    async selectFromDate(date) {
        await waitAndClick(this.getSelector(this.selectors.fromDatePicker));
        await this.selectDateFromAndroidPicker(date);
    }

    async selectToDate(date) {
        await waitAndClick(this.getSelector(this.selectors.toDatePicker));
        await this.selectDateFromAndroidPicker(date);
    }

    async applyFilter() {
        const applyBtn = await $(this.getSelector(this.selectors.applyButton));
        await applyBtn.waitForDisplayed({ timeout: 10000 });
        await applyBtn.waitForEnabled({ timeout: 10000 });

        let clicked = false;
        for (let i = 0; i < 3; i++) {
            try {
                await applyBtn.click();
                clicked = true;
                break;
            } catch {
                await browser.pause(500);
            }
        }

        if (!clicked) throw new Error('Failed to click Apply button');
    }

    async selectDateFromAndroidPicker(dateValue) {
        const target = dayjs(dateValue, ['DD-MM-YYYY', 'YYYY-MM-DD'], true);
        if (!target.isValid()) throw new Error(`Invalid date: ${dateValue}`);

        const today = dayjs();
        await this.adjustYear(target.year(), today.year());
        await this.adjustMonth(target.month(), today.month());
        await this.selectDay(target.date());
        await this.confirmDateSelection();
    }

    async adjustYear(targetYear, currentYear) {
        let diff = targetYear - currentYear;
        while (diff !== 0) {
            const selector = diff > 0 ? this.DATE_PICKER.NEXT_YEAR : this.DATE_PICKER.PREV_YEAR;
            await this.clickPickerButton(selector);
            diff += diff > 0 ? -1 : 1;
        }
    }

    async adjustMonth(targetMonth, currentMonth) {
        let diff = targetMonth - currentMonth;
        while (diff !== 0) {
            const selector = diff > 0 ? this.DATE_PICKER.NEXT_MONTH : this.DATE_PICKER.PREV_MONTH;
            await this.clickPickerButton(selector);
            diff += diff > 0 ? -1 : 1;
        }
    }

    async selectDay(day) {
        const el = await $(`android=new UiSelector().text("${day}").enabled(true)`);
        await el.waitForDisplayed({ timeout: 8000 });
        await el.click();
    }
    async confirmDateSelection() {
        const okBtn = await $(this.DATE_PICKER.OK);
        await okBtn.waitForDisplayed({ timeout: 15000 });
        await okBtn.waitForEnabled({ timeout: 15000 });
        let clicked = false;
        for (let i = 0; i < 3; i++) {
            try {
                await okBtn.click();
                clicked = true;
                break;
            } catch (e) {
                await driver.pause(500);
            }
        }
        if (!clicked) {
            throw new Error('Failed to click OK button');
        }
        await browser.waitUntil(async () => {
            const okGone = !(await okBtn.isDisplayed().catch(() => false));
            const pickerStillExists = await $(this.DATE_PICKER.OK)
                .isExisting()
                .catch(() => false);

            return okGone || !pickerStillExists;

        }, {
            timeout: 20000,
            timeoutMsg: 'Date picker did not close after clicking OK'
        });
        await driver.pause(500);
    }

    async verifyBillingDetails(siteId) {
        await waitAndClick(`~my-billing-view-details-${siteId.toLowerCase()}`);

        const name = (await $(`android=new UiSelector().descriptionContains("product-billing-item-name")`).getText()).trim();
        const code = (await $(`android=new UiSelector().descriptionContains("product-billing-item-code")`).getText()).trim();
        const qty = await $(`android=new UiSelector().textContains("Ltr")`).getText();
        const date = await $(`android=new UiSelector().textMatches("\\d{4}-\\d{2}-\\d{2}")`);

        expect(name).not.toBe('');
        expect(code).toMatch(/^\d+$/);
        expect(qty).toContain('Ltr');
        expect(await date.isDisplayed()).toBe(true);

        await waitAndClick(this.headerBackButton);
    }

    async verifyDatesWithinRange(dateSelector, fromDate, toDate) {
        const start = dayjs(fromDate, ['DD-MM-YYYY', 'DD MMM, YYYY'], true);
        const end = dayjs(toDate, ['DD-MM-YYYY', 'DD MMM, YYYY'], true);

        await browser.waitUntil(async () => {
            const items = await $$(dateSelector);
            const noData = await $('android=new UiSelector().textContains("No")').isDisplayed().catch(() => false);
            return items.length > 0 || noData;
        }, { timeout: 10000 });

        const elements = await $$(dateSelector);

        if (!elements.length) return;

        for (const el of elements) {
            const text = (await el.getText()).trim();
            const parsed = dayjs(text, ['DD MMM, YYYY', 'DD-MM-YYYY'], true);

            expect(parsed.isValid()).toBe(true);

            const isWithinRange =
                parsed.isSameOrAfter(start, 'day') &&
                parsed.isSameOrBefore(end, 'day');

            expect(isWithinRange).toBe(true);
        }
    }

    async verifySearchVisible() {
        await waitForElementVisible(this.getSelector(this.selectors.searchInput));
    }

    async verifyCountVisible() {
        await waitForElementVisible(this.getSelector(this.selectors.countText));
    }

    async clearSearch() {
        const input = await $(this.getSelector(this.selectors.searchInput));
        await input.waitForDisplayed();
        await input.click();
        await input.setValue('');
        await driver.execute('mobile: pressKey', { keycode: 66 });
    }

    async clearAllFilters() {
        await waitAndClick(this.getSelector(this.selectors.clearAllButton));
    }

    async scrollUntilAllLoaded(selector, max = 10) {
        let prev = -1;

        for (let i = 0; i < max; i++) {
            const count = (await $$(selector)).length;
            if (count === prev) break;
            prev = count;

            await driver.execute('mobile: scrollGesture', {
                left: 100,
                top: 300,
                width: 800,
                height: 1000,
                direction: 'down',
                percent: 0.7
            });

            await browser.waitUntil(async () =>
                (await $$(selector)).length !== count,
                { timeout: 3000 }
            ).catch(() => { });
        }
    }
}