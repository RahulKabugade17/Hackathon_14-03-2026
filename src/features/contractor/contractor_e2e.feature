@e2e @contractor
Feature: Validate Contractor End to End Flow

  Scenario Outline: Validate complete flow for <persona>
    Given I am logged in as "<persona>"
    When I edit my profile details and KYC details with valid information
    Then I should see all updates saved successfully, KYC status as verified, and payment method set as default

    Examples:
      | persona     |
      | contractor  |