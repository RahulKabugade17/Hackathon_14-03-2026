@E2E @Signup
Feature: User registration

  Scenario Outline: New user registration - <persona>
    Given I am registered as "<persona>"
    Then I should land on the home dashboard and delete my account as "<persona>"

    Examples:
      | persona     |
      | contractor  |

