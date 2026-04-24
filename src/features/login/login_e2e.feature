@login
Feature: Login functionality for all personas

  Scenario Outline: Login validation - <persona>
    Given the user is logged in as "<persona>"
    Then the user should see the dashboard

    Examples:
      | persona                  |
      | painter                  |
      | contractor               |
      | trade_contractor         |
      | institutional_contractor |
