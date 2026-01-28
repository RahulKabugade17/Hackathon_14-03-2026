@scan @painter
Feature: Painter Scan functionality

  Scenario: Painter performs scan after login
    Given I am logged in as "institutional_contractor"
    When I scan a valid code
    Then I should see scan success result
