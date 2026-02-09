import BaseListWithDateFilter from './BaseListWithDateFilter.page.js';
import { waitAndClick } from '../utils/CustomCommands.js';

const TEST_SITE_ID = 'SiteTest14';
const FROM_DATE = '01-01-2026';
const TO_DATE = '31-01-2026';

const selectors = {
    billingTab: { droid: '~tab-mybillingscreen' },
    searchInput: { droid: '~my-billing-site-id-search-input' },
    filterButton: { droid: '~my-billing-filter-button' },
    countText: { droid: '~my-billing-entries-count' },
    itemCard: 'android=new UiSelector().descriptionStartsWith("my-billing-site-id-value-")',
    itemDate: 'android=new UiSelector().descriptionStartsWith("my-billing-invoice-date-")',
    fromDatePicker: { droid: '~billing-filter-from-date-picker' },
    fromDateInput: { droid: '~billing-filter-from-date-input' },
    toDatePicker: { droid: '~billing-filter-to-date-picker' },
    toDateInput: { droid: '~billing-filter-to-date-input' },
    clearAllButton: { droid: '~billing-filter-clear-all-button' },
    applyButton: { droid: '~billing-filter-apply-button' }
};

class ICBillingManagementPage extends BaseListWithDateFilter {
    constructor() {
        super(selectors);
    }

    async openBilling() {
        await waitAndClick(this.selectors.billingTab);
    }

    async verifySearchingFilteringAndPagination() {
        await this.openBilling();
        await this.verifySearchVisible();
        await this.search(TEST_SITE_ID);
        await this.scrollUntilAllLoaded(this.selectors.itemCard);
        await this.verifyCountVisible();
        await this.clearSearch();
        await this.verifyCountVisible();
        await this.openFilter();
        await this.selectFromDate(FROM_DATE);
        await this.selectToDate(TO_DATE);
        await this.applyFilter();
        await this.scrollUntilAllLoaded(this.selectors.itemCard);
        await this.verifyDatesWithinRange(this.selectors.itemDate, FROM_DATE, TO_DATE);
        await this.openFilter();
        await this.clearAllFilters();
        await this.verifyCountVisible();
        await driver.back();
    }
}

export default new ICBillingManagementPage();