import BaseListWithDateFilter from '../utils/BaseListWithDateFilter.page.js';
import { waitAndClick } from '../utils/custom-commands.js';

const selectors = {
    billingTab: { droid: '~tab-mybillingscreen' },
    searchInput: { droid: '~my-billing-site-id-search-input' },
    filterButton: { droid: '~my-billing-filter-button' },
    countText: { droid: '~my-billing-entries-count' },
    itemCard: 'android=new UiSelector().descriptionStartsWith("my-billing-site-id-value-")',
    itemDate: 'android=new UiSelector().descriptionStartsWith("my-billing-invoice-date-")',
    fromDatePicker: { droid: '~billing-filter-from-date-picker' },
    toDatePicker: { droid: '~billing-filter-to-date-picker' },
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
}

export default new ICBillingManagementPage();