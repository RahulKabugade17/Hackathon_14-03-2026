@E2E @ContractorRegistration @AccountDeletion
Feature: Contractor Sign-Up and Account Deletion Lifecycle
  As a new Contractor, I want to register and then delete my account to ensure data cleanup.

  Scenario: Complete Contractor Registration and Irreversible Account Deletion
    Given I launch the Birla Opus app
    When I sign up as a "contractor" with data
    Then I verify my profile on the dashboard
    When I perform irreversible account deletion with OTP
    Then I verify the account is successfully deleted and released for reuse
