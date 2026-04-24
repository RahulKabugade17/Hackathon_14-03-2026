@e2e @signup
Feature: Validate user registration

  Scenario Outline: Validate signup for <persona>
    Given the user is registered as "<persona>"
    Then the user should land on the home dashboard

    Examples:
      | persona           |
      | painter           |
      | contractor        |
      | painter-no-kyc    |
      | contractor-no-kyc |
