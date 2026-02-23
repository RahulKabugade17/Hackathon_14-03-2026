@E2E @Signup
Feature: User registration

  Scenario Outline: New user registration - <persona>
    Given I am registered as "<persona>"
    Then I should land on the home dashboard
    Then I should be able to sign out as <persona>

    Examples:
      | persona     |
      | painter     |
      | contractor  |