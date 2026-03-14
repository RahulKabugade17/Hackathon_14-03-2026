@about-program
Feature: About Program - WebView content verification

  Scenario Outline: Verify About Program pages for <persona>
    Given I am logged in as "<persona>"
    When I verify all About Program menu items

    Examples:
      | persona                  |
      | painter                  |
      | contractor               |
      | trade_contractor         |
      | institutional_contractor |
      