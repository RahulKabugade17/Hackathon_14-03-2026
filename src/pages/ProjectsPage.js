import BaseListWithDateFilter from './BaseListWithDateFilter.page.js';
import HomePage from './HomePage.js';
import SignoutPage from './SignoutPage.js';
import { waitAndClick } from '../utils/CustomCommands.js';


const TEST_SITE_ID = 'SiteTest14';
const FROM_DATE = '01-01-2026';
const TO_DATE = '31-01-2026';

const selectors = {
    projectsTab: { droid: '~menu-item-title-my-projects' },
    searchInput: { droid: '~ic-project-search-input' },
    filterButton: { droid: '~ic-project-filter-button' },
    countText: { droid: '~ic-project-count' },
    itemCard: 'android=new UiSelector().descriptionStartsWith("lead-site-item-card-")',
    itemDate: 'android=new UiSelector().descriptionStartsWith("lead-site-item-date-")',
    fromDatePicker: { droid: '~ic-project-filter-from-date-picker' },
    fromDateInput: { droid: '~ic-project-filter-from-date-input' },
    toDatePicker: { droid: '~ic-project-filter-to-date-picker' },
    toDateInput: { droid: '~ic-project-filter-to-date-input' },
    clearAllButton: { droid: '~ic-project-filter-clear-all-button' },
    applyButton: { droid: '~ic-project-filter-apply-button' }
};

class ICProjectManagementPage extends BaseListWithDateFilter {

    constructor() {
        super(selectors);
    }

    async openProjects() {
        await waitAndClick(this.selectors.projectsTab);
    }

    async verifySearchingFilteringAndPagination() {
        await HomePage.verifyHomePageLoaded();
        await SignoutPage.openDrawerMenu();
        await SignoutPage.icMyProjectsTooltipSubmitButton();
        await this.openProjects();
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

export default new ICProjectManagementPage();