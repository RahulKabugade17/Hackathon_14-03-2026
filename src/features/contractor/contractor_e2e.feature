@e2e @contractor
Feature: Validate Contractor End to End Flow  

  Scenario Outline: Validate complete flow for <persona>
    Given I am registered as "<persona>"
    When I click on Loyalty Tier Card
    And I update my profile image
    And I share my Opus ID as Image
    And I download my Opus ID as Image
    And I update my general details
    And I verify my work location
    And I update my kyc details
    Then I should see all updates saved successfully, KYC status as verified, and payment method set as default

    Examples:
      | persona           |
      | contractor-no-kyc |