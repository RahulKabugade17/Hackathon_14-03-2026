@smoke @login
Feature: Login works for all personas

  Scenario Outline: Login validation
    Given I am logged in as "<persona>"
    Then I should see the dashboard

    Examples:
      | persona                  |
      | contractor               |
      | institutional_contractor |
      | painter                  |
      | trade_contractor         |