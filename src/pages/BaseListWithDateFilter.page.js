import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import { waitForElementVisible, waitAndClick } from '../utils/CustomCommands.js';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);

const PAUSE = {
    SHORT: 200,
    MEDIUM: 800
};

export default class BaseListWithDateFilter {

    DATE_PICKER = {
        PREV_YEAR: '~from-to-date-picker-previous-year',
        NEXT_YEAR: '~from-to-date-picker-next-year',
        PREV_MONTH: '~from-to-date-picker-previous-month',
        NEXT_MONTH: '~from-to-date-picker-next-month',
        OK: '~from-to-date-picker-ok-button'
    };

    constructor(selectors) {
        this.selectors = selectors;
    }

    async verifySearchVisible() {
        await waitForElementVisible(this.selectors.searchInput);
    }

    async verifyCountVisible() {
        await waitForElementVisible(this.selectors.countText);
    }

    async search(text, submit = true) {
        const selector =
            typeof this.selectors.searchInput === 'string'
                ? this.selectors.searchInput
                : this.selectors.searchInput.droid;

        const input = await $(selector);
        await input.waitForDisplayed({ timeout: 5000 });
        await input.click();
        await input.clearValue();

        if (!submit) {
            await input.setValue(text);
            return;
        }

        await input.addValue(`${text}\n`);
        await driver.pause(PAUSE.SHORT);

        if (!driver.isIOS) {
            await this.triggerAndroidSearchFallback();
        }
    }

    async triggerAndroidSearchFallback() {
        try {
            await driver.execute('mobile: performEditorAction', { action: 'search' });
        } catch {
            try {
                await driver.pressKeyCode(66); // ENTER
            } catch {
                await driver.pressKeyCode(84); // SEARCH
            }
        }
    }

    async clearSearch() {
        await this.search('', true);
        await driver.pause(PAUSE.MEDIUM);
    }

    async openFilter() {
        await waitAndClick(this.selectors.filterButton);
    }

    async selectFromDate(date) {
        await waitAndClick(this.selectors.fromDatePicker);
        await this.selectDateFromAndroidPicker(date);
    }

    async selectToDate(date) {
        await waitAndClick(this.selectors.toDatePicker);
        await this.selectDateFromAndroidPicker(date);
    }

    async applyFilter() {
        await waitAndClick(this.selectors.applyButton);
    }

    async clearAllFilters() {
        await waitAndClick(this.selectors.clearAllButton);
    }

    async selectDateFromAndroidPicker(dateValue) {
        const target = dayjs(dateValue, ['DD-MM-YYYY', 'YYYY-MM-DD'], true);
        if (!target.isValid()) {
            throw new Error(`Invalid date passed: ${dateValue}`);
        }

        const today = dayjs();

        await this.adjustYear(target.year(), today.year());
        await this.adjustMonth(target.month(), today.month());
        await this.selectDay(target.date());
        await this.confirmDateSelection();
    }

    async adjustYear(targetYear, currentYear) {
        let diff = targetYear - currentYear;

        while (diff !== 0) {
            await $(
                diff > 0
                    ? this.DATE_PICKER.NEXT_YEAR
                    : this.DATE_PICKER.PREV_YEAR
            ).click();

            diff += diff > 0 ? -1 : 1;
            await driver.pause(PAUSE.SHORT);
        }
    }

    async adjustMonth(targetMonth, currentMonth) {
        let diff = targetMonth - currentMonth;

        while (diff !== 0) {
            await $(
                diff > 0
                    ? this.DATE_PICKER.NEXT_MONTH
                    : this.DATE_PICKER.PREV_MONTH
            ).click();

            diff += diff > 0 ? -1 : 1;
            await driver.pause(PAUSE.SHORT);
        }
    }

    async selectDay(day) {
        const daySelector =
            `android=new UiSelector().text("${day}").enabled(true)`;

        const dayElement = await $(daySelector);
        await dayElement.waitForDisplayed({ timeout: 5000 });
        await dayElement.click();
    }

    async confirmDateSelection() {
        const okBtn = await $(this.DATE_PICKER.OK);
        await okBtn.waitForDisplayed({ timeout: 5000 });
        await okBtn.click();
    }

    async scrollUntilAllLoaded(itemSelector, maxScrolls = 10) {
        let previousCount = 0;
        const { width, height } = await driver.getWindowRect();

        const scrollArea = {
            left: Math.floor(width * 0.1),
            top: Math.floor(height * 0.2),
            width: Math.floor(width * 0.8),
            height: Math.floor(height * 0.6)
        };

        for (let i = 0; i < maxScrolls; i++) {
            const currentCount = (await $$(itemSelector)).length;
            if (currentCount === previousCount) break;

            previousCount = currentCount;

            await driver.execute('mobile: scrollGesture', {
                ...scrollArea,
                direction: 'down',
                percent: 0.75
            });

            await driver.pause(PAUSE.MEDIUM);
        }
    }
    async verifyDatesWithinRange(dateSelector, fromDate, toDate) {
        const start = dayjs(fromDate, ['DD-MM-YYYY', 'DD MMM, YYYY'], true);
        const end = dayjs(toDate, ['DD-MM-YYYY', 'DD MMM, YYYY'], true);

        const elements = await $$(dateSelector);
        if (!elements.length) {
            throw new Error('No records found after applying date filter');
        }

        for (const el of elements) {
            const text = (await el.getText())?.trim();
            if (!text) continue;
            const parsed = dayjs(text, ['DD MMM, YYYY', 'DD-MM-YYYY'], true);
            if (!parsed.isValid()) {
                throw new Error(`Invalid date format: ${text}`);
            }
            const isWithinRange =
                parsed.isSameOrAfter(start, 'day') &&
                parsed.isSameOrBefore(end, 'day');
            if (!isWithinRange) {
                throw new Error(
                    `❌ Date ${text} is outside range ${fromDate} - ${toDate}`
                );
            }
            expect(isWithinRange).toBe(true);
        }
    }
}
