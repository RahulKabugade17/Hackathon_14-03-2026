@smoke @Signout
Feature: Signout works for all personas

  Scenario Outline: Signout validation - <persona>
    Given I am logged in as "<persona>"
    Then I should see the dashboard
    Then I should be able to sign out as "<persona>"

    Examples:
      | persona                  |
      | painter                  |
      | contractor               |
      | trade_contractor         |
      | institutional_contractor |