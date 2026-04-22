@project-billing-ic @e2e
Feature: Project & Billing Management - IC

  Scenario Outline: Validate Project and Billing flows for "<persona>"

    Given I am logged in as "<persona>"

    When user opens Projects screen
    Then Projects screen should be displayed

    When user searches project for "<site_id>"
    Then project search results should be correct

    When user applies project date filter from "<from_date>" to "<to_date>"
    Then project results should match selected date range
    And user clears project filters

    When user opens Billing screen
    Then Billing screen should be displayed

    When user searches billing for "<site_id>"
    Then billing details should display valid product information for "<site_id>"

    When user applies billing date filter from "<from_date>" to "<to_date>"
    Then billing results should match selected date range
    And user clears billing filters

  Examples:
    | persona                  | site_id    | from_date  | to_date    |
    | institutional_contractor | SiteTest14 | 01-01-2026 | 31-01-2026 |