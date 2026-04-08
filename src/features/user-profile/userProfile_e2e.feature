@user-profile @e2e
Feature: User Profile End to End

  Scenario Outline: Validate complete user profile flow for <persona>

    # Login
    Given I am registered as "<persona>"

    # Update Profile Picture
    When user click on Loyalty Tier Card
    And user update his profile image
    Then user should able to see updated profile picture

    # Share OPUS ID
    When user share his Opus ID as Image

    # Download OPUS ID
    When user download his Opus ID as Image

    # Personal Details
    When user open general details
    And edit personal details
    Then user should be able to see updated personal details

    # Work Location
    When user scroll to work information section
    Then work location should be displayed

    # PAN kyc
    When user open kyc details
    And complete PAN verification
    Then PAN verification status should show as "Verified"

    # Payment Method
    When user add payment method as "<payment_type>"
    Then added payment method should be marked as default

    Examples:
      | persona           | payment_type |
      | contractor-no-kyc | UPI          |