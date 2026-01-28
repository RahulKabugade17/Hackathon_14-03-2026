@smoke @login
Feature: Login works for all personas

  Scenario Outline: Login validation - <persona>
    Given I am logged in as "<persona>"
    Then I should see the dashboard

    Examples:
      | persona                  |
      | login_contractor               |
      | login_institutional_contractor |
      | login_painter                  |
      | login_trade_contractor         |
