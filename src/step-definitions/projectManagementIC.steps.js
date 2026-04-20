import { When } from '@wdio/cucumber-framework';
import ProjectsPage from '../pages/ProjectsPage.js';
import BillingPage from '../pages/BillingPage.js';

When('I open Projects and verify searching, filtering and pagination', async function () {
    await ProjectsPage.verifySearchingFilteringAndPagination();
});

When('I open Billing and verify searching, filtering and pagination', async function () {
    await BillingPage.verifySearchingFilteringAndPagination();
});
