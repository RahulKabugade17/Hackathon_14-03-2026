import { Given, When, Then } from '@wdio/cucumber-framework';
import ProjectsPage from '../page-objects/project.page.js';
import BillingPage from '../page-objects/billing.page.js';
import HomePage from '../page-objects/home.page.js';

// =========================
// 📁 PROJECTS
// =========================

// OPEN PROJECTS
When('user opens Projects screen', async function () {
    await ProjectsPage.openProjects(this.userType);
});

Then('Projects screen should be displayed', async function () {
    await ProjectsPage.verifySearchVisible();
});

// 🔍 SEARCH FLOW (USING EXISTING METHODS ONLY)
When('user searches project for {string}', async function (siteId) {
    this.siteId = siteId; // store for later validation
    await ProjectsPage.search(siteId);
});

Then('project search results should be correct', async function () {
    await ProjectsPage.scrollUntilAllLoaded(ProjectsPage.selectors.itemCard);
    await ProjectsPage.verifyCountVisible(); // using existing method only
    await ProjectsPage.clearSearch();
    await ProjectsPage.verifyCountVisible();
});

// 📅 FILTER FLOW (USING EXISTING METHODS ONLY)
When('user applies project date filter from {string} to {string}', async function (from, to) {
    this.fromDate = from;
    this.toDate = to;

    await ProjectsPage.openFilter();
    await ProjectsPage.selectFromDate(from);
    await ProjectsPage.selectToDate(to);
    await ProjectsPage.applyFilter();
});

Then('project results should match selected date range', async function () {
    await ProjectsPage.scrollUntilAllLoaded(ProjectsPage.selectors.itemCard);

    // using your existing method (with params)
    await ProjectsPage.verifyDatesWithinRange(
        ProjectsPage.selectors.itemDate,
        this.fromDate,
        this.toDate
    );
});

Then('user clears project filters', async function () {
    await ProjectsPage.openFilter();
    await ProjectsPage.clearAllFilters();
    await ProjectsPage.verifyCountVisible();
    await ProjectsPage.clickHeaderBack();
});

// =========================
// 🧾 BILLING
// =========================

// OPEN BILLING
When('user opens Billing screen', async function () {
    await BillingPage.openBilling();
});

Then('Billing screen should be displayed', async function () {
    await BillingPage.verifySearchVisible();
});

// 🔍 SEARCH FLOW
When('user searches billing for {string}', async function (siteId) {
    this.siteId = siteId;
    await BillingPage.search(siteId);
});

Then('billing details should display valid product information for {string}', async function (siteId) {
    await BillingPage.scrollUntilAllLoaded(BillingPage.selectors.itemCard);
    await BillingPage.verifyBillingDetails(siteId); // already exists
    await BillingPage.clearSearch();
    await BillingPage.verifyCountVisible();
});

// 📅 FILTER FLOW
When('user applies billing date filter from {string} to {string}', async function (from, to) {
    this.fromDate = from;
    this.toDate = to;

    await BillingPage.openFilter();
    await BillingPage.selectFromDate(from);
    await BillingPage.selectToDate(to);
    await BillingPage.applyFilter();
});

Then('billing results should match selected date range', async function () {
    await BillingPage.scrollUntilAllLoaded(BillingPage.selectors.itemCard);

    await BillingPage.verifyDatesWithinRange(
        BillingPage.selectors.itemDate,
        this.fromDate,
        this.toDate
    );
});

Then('user clears billing filters', async function () {
    await BillingPage.openFilter();
    await BillingPage.clearAllFilters();
    await BillingPage.verifyCountVisible();
});