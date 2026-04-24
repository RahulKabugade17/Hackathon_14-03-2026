import BaseListWithDateFilter from '../utils/base-list-with-date-filter.page.js';
import HomePage from './home.page.js';
import { waitAndClick } from '../utils/custom-commands.js';

const selectors = {
    openDrawerMenu: { droid: '~open-drawer-menu' },
    projectsTab: { droid: '~menu-item-title-my-projects' },
    icMyProjectsTooltipSubmitButton: { droid: '~ic-my-projects-tooltip-submit-button' },
    searchInput: { droid: '~ic-project-search-input' },
    filterButton: { droid: '~ic-project-filter-button' },
    countText: { droid: '~ic-project-count' },
    itemCard: 'android=new UiSelector().descriptionStartsWith("lead-site-item-card-")',
    itemDate: 'android=new UiSelector().descriptionStartsWith("lead-site-item-date-")',
    fromDatePicker: { droid: '~ic-project-filter-from-date-picker' },
    toDatePicker: { droid: '~ic-project-filter-to-date-picker' },
    clearAllButton: { droid: '~ic-project-filter-clear-all-button' },
    applyButton: { droid: '~ic-project-filter-apply-button' },
    headerBackButton: { droid: '~~header-back-button' }
};

class ICProjectManagementPage extends BaseListWithDateFilter {
    constructor() {
        super(selectors);
    }

    async openProjects(persona) {
        await HomePage.verifyHomePageLoaded(persona);
        await waitAndClick(this.selectors.openDrawerMenu);
        await waitAndClick(this.selectors.icMyProjectsTooltipSubmitButton);
        await waitAndClick(this.selectors.projectsTab);
    }

    async clickHeaderBack() {
        await waitAndClick(this.selectors.headerBackButton);
    }
}

export default new ICProjectManagementPage();