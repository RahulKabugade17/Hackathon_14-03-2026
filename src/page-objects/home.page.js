import { waitAndClick, waitForVisible } from "../utils/custom-commands.js";
import DeleteAccountPage from "./delete-account.page.js";
import signupData from "../test-data/signup.data.json";

class HomePage {
  selectors = {
    tooltipTitle: { droid: "~topcard-opus-id-tooltip-title" },
    icToggleSwitchTooltipTitle: { droid: "~ic-toggle-switch-tooltip-title" },
    icOpusIdTooltipTitle: { droid: "~ic-opus-id-tooltip-title" },
    onboardingSkipButtons: {
      droid: [
        "~topcard-opus-id-tooltip-skip-button",
        "~ic-toggle-switch-tooltip-skip-button",
        "~ic-opus-id-tooltip-skip-button",
      ],
    },
    profileCardnew: {
      droid: [
        "~incomplete-kyc-card",
        "~complete-kyc-top-card",
        "~institutional-top-card-main",
      ],
    },
    knowMoreButton: { droid: "~Know more" },
    approvalStatusCard: "~approval-status-card",
    profileSection: { droid: "~user-type-complete-kyc" },
  };

  async skipOnboarding() {
    await driver.pause(1000);
    const el = await waitForVisible(this.selectors.onboardingSkipButtons);
    await el.click();
  }
  async clickProfileBasedOnPersona() {
    await driver.pause(2000);
    const profileCard = await waitForVisible(this.selectors.profileCardnew);
    await profileCard.click();
  }
  async handleOnboardingAndPopups(persona) {
    if (
      persona === "painter" ||
      persona === "institutional_contractor" ||
      persona === "trade_contractor" ||
      persona === "painter-no-kyc"
    ) {
      await this.skipOnboarding();
      return;
    }
    if (persona === "contractor" || persona === "contractor-no-kyc") {
      return;
    }
  }
  async verifyHomePageLoaded(persona) {
    await driver.pause(10000);
    await this.handleOnboardingAndPopups(persona);
  }

  async clickOnApprovalStatusCard() {
    await waitAndClick(this.selectors.approvalStatusCard);
  }

  async verifyHomePageLoaded() {
    await Promise.race([
      waitForVisible(this.selectors.tooltipTitle),
      waitForVisible(this.selectors.icToggleSwitchTooltipTitle),
      waitForVisible(this.selectors.icOpusIdTooltipTitle),
    ]);
    await this.skipOnboarding();
  }

  async verifyDashboardAndDeleteUser(persona) {
    await this.handleOnboardingAndPopups(persona);
    await driver.pause(70000);
    await this.clickProfileBasedOnPersona();
    const otp = signupData[persona].otp;
    await DeleteAccountPage.deleteAccount(otp);
  }
}
export default new HomePage();
