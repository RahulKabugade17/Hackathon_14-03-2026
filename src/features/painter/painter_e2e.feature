@e2e @painter
Feature: Validate Painter End to End Flow  

  Scenario Outline: Validate complete flow for <persona>
    Given I am registered as "<persona>"
    When I click on Profile Completion
    And I navigate to General Details section
    And I scroll down to Business Information section
    And I add GST No, Company Name, and Firm Address
    And I navigate to KYC Details section
    And I add PAN and UPI details and verify them
    And I navigate to Manage Your Team section
    And I add new team members with their details
    Then I should see team member request is created successfully

    Examples:
      | persona           |
      | painter-no-kyc 	  |