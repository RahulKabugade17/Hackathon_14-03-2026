@E2E @Signup
Feature: User signup onboarding

  Scenario Outline: New user onboarding completes successfully
    Given I am onboarded as "<persona>"
    Then I should land on the home dashboard

    Examples:
      | persona |
      | contractor |
      | painter |
