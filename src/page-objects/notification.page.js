import { waitAndClick, waitForElementVisible, setValueFast, clickAndType, handleSystemPermissions } from '../utils/custom-commands.js';
import Gestures from '../utils/gestures.js';

class NotificationPage {

    selectors = {
        notificationButton: { 
            droid: '~notifications-button', 
            ios: '' },
        allTab:{
            droid:'~notifications-tab-0-all',
            ios:''
        },
        offersTab:{
            droid:'~notifications-tab-1-offers',
            ios:''
        },
        promotionsTab:{
            droid:'~notifications-tab-text-promotions',
            ios:''
        },
        notificationTitle: {
            droid: '//*[contains(@content-desc,"notification-title")]',
            ios: ''
        },
        noDataText: {
            droid: '//*[contains(@text,"Not Available")]',
            ios: ''
        },
        backButton:{
            droid:'~~header-back-button',
            ios:''
        },
    };

  async verifyNotificationButton() {
    await waitForElementVisible(this.selectors.notificationButton);
  }

  async openNotifications() {
    await waitAndClick(this.selectors.notificationButton);
  }

  async verifyNotificationPageLoaded() {
    const allTab = await $(this.selectors.allTab);
    await expect(allTab).toBeDisplayed();
  }

  async verifyTabs() {
    await waitForElementVisible(this.selectors.allTab);
    await waitForElementVisible(this.selectors.offersTab);
    await waitForElementVisible(this.selectors.promotionsTab);
  }

  async verifyNotificationList() {
    const notificationTitle = await $(this.selectors.notificationTitle);
    await expect(notificationTitle).toBeDisplayed();
    for (let i = 0; i < 2; i++) await Gestures.swipeUp(0.6);
    const notificationTitle1 = await $(this.selectors.notificationTitle);
    await expect(notificationTitle1).toBeDisplayed();
  }

  async clickTab(tabName) {
    const map = {
      All: this.selectors.allTab,
      Offers: this.selectors.offersTab,
      Promotions: this.selectors.promotionsTab
    };
    const selector = map[tabName];
    if (!selector) {
      throw new Error(`Invalid tab: ${tabName}`);
    }
    await waitAndClick(selector);
  }

  async verifyOfferTabData() {
    const offerData = await $(this.selectors.noDataText);
    await expect(offerData).toBeDisplayed();
  }

  async verifyPromotionsTabData() {
    const promotionData = await $(this.selectors.noDataText);
    await expect(promotionData).toBeDisplayed();
  }

  async goBack() {
    await waitAndClick(this.selectors.backButton);
  }

}
export default new NotificationPage();