@e2e @signup
Feature: Validate user registration

  Scenario Outline: Validate signup for <persona>
    Given I am registered as "<persona>"
    Then I should land on the home dashboard

    Examples:
      | persona     |
      | painter     |
      | contractor  |
      | painter-no-kyc     |
      | contractor-no-kyc  |