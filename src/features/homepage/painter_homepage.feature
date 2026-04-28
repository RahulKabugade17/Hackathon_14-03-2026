@e2e @homePage
Feature: Validate Painter's Business Info, KYC & Team End to End Flow

  Scenario Outline: Validate complete home page flow for <persona>

    # Login
    Given the user is registered as "<persona>"

    # Business Information
    When user click on profile completion
    And navigate to Your details
    And edit Business Information details
    Then user should be able to see updated Business Information details

    # KYC Details
    When user navigate to KYC Details page
    And complete PAN verification
    Then PAN verification status should show as "Verified"

    # Payment Method
    When user add payment method as "<payment_type>"
    Then payment method should be marked as default

    # Your Team
    When user redirect to General Details page
    And scroll to Manage Your Team section
    And tap on Manage Your Team

    # Add New Team Member
    When user tap on Add New Member
    And enter team member's First Name, Last Name, Opus ID & Phone Number
    And tap on Submit
    Then the team member request should be created successfully

    # Navigation Back
    When user navigate back to the Home page
    Then user should land on the Home page successfully

    Examples:
      | persona        | payment_type |
      | painter-no-kyc | UPI          |