@project-management-ic
Feature: Project Management - IC

  Scenario Outline: Verify Project Management page for "<role>"
    Given I am logged in as "<role>"
    When I open Projects and verify searching, filtering and pagination
    And I open Billing and verify searching, filtering and pagination

    Examples:
      | role |
      | institutional_contractor |
