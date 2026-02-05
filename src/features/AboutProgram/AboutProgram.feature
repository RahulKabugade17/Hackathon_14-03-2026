@about-program
Feature: About Program - WebView content verification

  Scenario Outline: Verify About Program page <menuItem> as <persona>
    Given I am logged in as "<persona>"
    When I open "<menuItem>" from About Program
    Then I should be able to sign out

    Examples:
      | persona                  | menuItem           |
      | painter                  | FAQs               |
      | trade_contractor         | Privacy Policy     |
      | institutional_contractor | Terms & Conditions |
      | contractor               | Opus Partner       |
      | trade_contractor         | Loyalty            |
