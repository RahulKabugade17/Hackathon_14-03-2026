import { waitAndClick, waitForVisible } from "../utils/custom-commands.js";
class HomePage {
  selectors = {
    tooltipTitle: "~topcard-opus-id-tooltip-title",
    icToggleSwitchTooltipTitle: "~ic-toggle-switch-tooltip-title",
    icOpusIdTooltipTitle: "~ic-opus-id-tooltip-title",
    onboardingSkipButtons: [
      "~topcard-opus-id-tooltip-skip-button",
      "~ic-toggle-switch-tooltip-skip-button",
      "~ic-opus-id-tooltip-skip-button",
    ],
    incompleteKycCard: "~incomplete-kyc-card",
    approvalStatusCard: "~approval-status-card",
    profileSection: { droid: "~user-type-complete-kyc" },
  };
  async skipOnboarding() {
    for (const selector of this.selectors.onboardingSkipButtons) {
      const el = await $(selector);
      if (await el.isDisplayed()) {
        await el.click();
        return;
      }
    }
  }

  async skipToolTipTitle() {
    const tooltipTitles = [await $(this.selectors.tooltipTitle)];
    for (const title of tooltipTitles) {
      if (await title.isDisplayed()) {
        await this.skipOnboarding();
        return;
      }
    }
  }

  async clickIncompleteKycCard() {
    await waitAndClick(this.selectors.incompleteKycCard);
  }

  async clickOnApprovalStatusCard() {
    await waitAndClick(this.selectors.approvalStatusCard);
  }

  async clickOnProfileSection() {
    await waitAndClick(this.selectors.profileSection);
  }
  async verifyHomePageLoaded() {
    await Promise.race([
      waitForVisible(this.selectors.tooltipTitle),
      waitForVisible(this.selectors.icToggleSwitchTooltipTitle),
      waitForVisible(this.selectors.icOpusIdTooltipTitle),
    ]);
    await this.skipOnboarding();
  }
}
export default new HomePage();
