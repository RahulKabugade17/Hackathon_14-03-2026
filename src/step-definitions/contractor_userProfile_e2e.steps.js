import { Then, When } from "@wdio/cucumber-framework";
import assert from "assert";

import GeneralDetailsPage from "../page-objects/general-details.page.js";
import HomePage from "../page-objects/home.page.js";
import EditKycPage from "../page-objects/kyc-details.page.js";
import ProfileDetailsPage from "../page-objects/profile.page.js";
import DeleteAccountPage from "../page-objects/delete-account.page.js";
import userProfileData from "../test-data/contractor_userProfile.data.json" with { type: "json" };
import homePage from "../page-objects/home.page.js";

When("user click on Loyalty Tier Card", async function () {
  await HomePage.skipToolTipTitle();
  await HomePage.clickOnApprovalStatusCard();
  await ProfileDetailsPage.verifyOpusIdCardDetails();
});

When("user update his profile image", async function () {
  await ProfileDetailsPage.uploadProfileImage();
});

Then("user should able to see updated profile picture", async function () {
  // const isUpdated = await ProfileDetailsPage.isProfileImageUpdated();
  // assert.strictEqual(isUpdated, true, "Profile picture updated");
});

When("user share his Opus ID as Image", async function () {
  await ProfileDetailsPage.shareOpusId("Image");
});

Then("user should be able to see share options", async function () {
  await ProfileDetailsPage.verifyShareOptionsVisible();
});

When("user download his Opus ID as Image", async function () {
  await ProfileDetailsPage.downloadOpusId("Image");
});

Then(
  "user should be able to see Opus ID downloaded successfully alert",
  async function () {
    await ProfileDetailsPage.verifyOpusIdDownloadSuccessfully();
  },
);

When("user open general details", async function () {
  await GeneralDetailsPage.clickGeneralDetails();
});

When("edit personal details", async function () {
  const data = userProfileData.generalInformation;
  await GeneralDetailsPage.editGeneralInformation(data);
});

Then("user should be able to see updated personal details", async function () {
  const isUpdated = await GeneralDetailsPage.arePersonalDetailsUpdated();

  assert.strictEqual(
    isUpdated,
    true,
    "Personal details were updated correctly",
  );
});

When("user scroll to work information section", async function () {
  await GeneralDetailsPage.scrollToWorkInformationSection();
});

Then("work location should be displayed", async function () {
  const isVisible = await GeneralDetailsPage.isWorkLocationDisplayed();

  assert.strictEqual(isVisible, true, "Expected work location is displayed");
});

When("user open kyc details", async function () {
  await ProfileDetailsPage.openKycDetails();
});

When("complete PAN verification", async function () {
  await EditKycPage.updatePanDetails();
});

Then(
  "PAN verification status should show as {string}",
  async function (expectedStatus) {
    const actualStatus = await EditKycPage.getPanVerificationStatus();
    assert.strictEqual(
      actualStatus.trim(),
      expectedStatus,
      `Expected PAN status to be "${expectedStatus}" but got "${actualStatus}"`,
    );
  },
);

When("user add payment method as {string}", async function (paymentType) {
  await EditKycPage.addPaymentMethod(paymentType);
});

Then("added payment method should be marked as default", async function () {
  const isDefault = await EditKycPage.isPaymentMethodDefault();

  assert.strictEqual(
    isDefault,
    true,
    "Added payment method is marked as default",
  );

  await ProfileDetailsPage.goBack();
  await homePage.clickIncompleteKycCard();
  const data = userProfileData;
  await DeleteAccountPage.deleteAccount(data.otp);
});
