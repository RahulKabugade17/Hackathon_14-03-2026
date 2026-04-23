import { Given,When,Then } from '@wdio/cucumber-framework';
import  NotificationPage  from '../page-objects/notification.page.js';
import HomePage from '../page-objects/home.page.js'

When('User navigate to dashboard', async function () {
  await HomePage.verifyHomePageLoaded();
});

Then('User see notification button', async function () {
  await NotificationPage.verifyNotificationButton();
});

When('User click on notification icon', async function () {
  await NotificationPage.openNotifications();
});

Then('User should be redirected to notification page', async function () {
  await NotificationPage.verifyNotificationPageLoaded();
});

Then('User should see notification tabs', async function () {
  await NotificationPage.verifyTabs();
});

When('User click on {string} tab', async function (tab) {
  await NotificationPage.clickTab(tab);
});

Then('User should see list of notifications', async function () {
  await NotificationPage.verifyNotificationList();
});

Then('User should see Not Available', async function () {
  await NotificationPage.verifyOfferTabData();
});

Then('User should see Not Available}', async function () {
  await NotificationPage.verifyPromotionsTabData();
});

When('User click on back button', async function () {
  await NotificationPage.goBack();
});

Then('User should be navigated to home screen', async function () {
  await HomePage.verifyHomePageLoaded();
});