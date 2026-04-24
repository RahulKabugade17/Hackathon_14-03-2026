@about-program
Feature: About Program - WebView content verification

    Scenario Outline: Verify About Program pages for <persona>
        Given the user is logged in as "<persona>"
        When the user verifies all About Program menu items

        Examples:
            | persona                  |
            | painter                  |
            | contractor               |
            | trade_contractor         |
            | institutional_contractor |
