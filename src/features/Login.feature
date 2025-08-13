@smoke
Feature: Login Functionality

  Scenario Outline: Validate login
    Given The user navigates to Login Screen
    When the user enters "<email>" and "<password>"
    And clicks on the login button
    Then user should be successfully logged in

    Examples:
      | email                    | password      |
      | testing.login@gmail.com1 | testingmobile |