@E2E @Signup
Feature: User Registration for multiple personas

  Scenario Outline: Register new user as <persona>
    Given I launch the Birla Opus app
    When I sign up as a "<persona>"
    Then I verify my profile on the dashboard

    Examples:
      | persona        |
      | signup_contractor |
      | signup_painter    |
