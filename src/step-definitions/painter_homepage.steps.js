import { Then, When } from "@wdio/cucumber-framework";

import DeleteAccountPage from "../page-objects/delete-account.page.js";
import GeneralDetailsPage from "../page-objects/general-details.page.js";
import HomePage from "../page-objects/home.page.js";
import kycDetailsPage from "../page-objects/kyc-details.page.js";
import ProfileDetailsPage from "../page-objects/profile.page.js";
import painterData from "../test-data/signup.data.json" with { type: "json" };

When("user click on profile completion", async function () {
  await HomePage.handleOnboardingAndPopups(this.persona);
  await HomePage.clickApprovalStatusCard();
});

When("navigate to Your details", async function () {
  await GeneralDetailsPage.navigateToYourDetails();
});

When("edit Business Information details", async function () {
  await GeneralDetailsPage.editBusinessInformation();
  await driver.pause(3000);
});

Then(
  "user should be able to see updated Business Information details",
  async function () {
    //await GeneralDetailsPage.verifyBusinessInformationStatusUpdated();
  },
);

When("user navigate to KYC Details page", async function () {
  await ProfileDetailsPage.openKycDetails();
  await driver.pause(5000);
});

Then("payment method should be marked as default", async function () {
  await kycDetailsPage.isPaymentMethodDefault();
});

When("user redirect to General Details page", async function () {
  await GeneralDetailsPage.navigateToYourDetails();
});

When("scroll to Manage Your Team section", async function () {
  await GeneralDetailsPage.scrollToManageYourTeamSection();
});

When("tap on Manage Your Team", async function () {
  await GeneralDetailsPage.openManageYourTeam();
});

When("user tap on Add New Member", async function () {
  await GeneralDetailsPage.addNewTeamMember();
});

When(
  "enter team member's First Name, Last Name, Opus ID & Phone Number",
  async function () {
    await GeneralDetailsPage.addTeamMember();
  },
);

When("tap on Submit", async function () {
  await GeneralDetailsPage.sendTeamMemberRequest();
});

Then(
  "the team member request should be created successfully",
  async function () {
    await GeneralDetailsPage.verifyTeamMemberRequestSuccess();
  },
);

When("user navigate back to the Home page", async function () {
  await ProfileDetailsPage.goBack();
});

Then("user should land on the Home page successfully", async function () {
  await HomePage.verifyUserOnHomePage();
  await HomePage.clickProfileBasedOnPersona();
  const data = painterData[this.persona];
  await DeleteAccountPage.deleteAccount(data.otp);
});
