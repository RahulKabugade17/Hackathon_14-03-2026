@smoke @Signout
Feature: Signout works for all personas

  Scenario Outline: Signout validation - <persona>
    Given I am logged in as "<persona>"
    Then I should see the dashboard
    Then I should be able to sign out as "<persona>"

    Examples:
      | persona                  |
      | login_painter                  |
      | login_contractor               |
      | login_trade_contractor         |
      | login_institutional_contractor |