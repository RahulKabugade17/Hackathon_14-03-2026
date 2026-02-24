@login
Feature: Login works for all personas

  Scenario Outline: Login validation - <persona>
    Given I am logged in as "<persona>"
    Then I should see the dashboard

    Examples:
      | persona                  | 
      | painter                  |
      | contractor               |
      | trade_contractor         |
      | institutional_contractor |
