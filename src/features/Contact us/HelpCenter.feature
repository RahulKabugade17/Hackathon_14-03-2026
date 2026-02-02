@help-center
Feature: Help Center Support

  Scenario: Verify Help Center, Call Support, and FAQs for IC User
    Given I am logged in as "institutional_contractor"
    Then I execute the Help Center and Support verification flow
    Then I should be able to sign out as "institutional_contractor"