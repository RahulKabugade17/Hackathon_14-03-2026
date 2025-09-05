@smoke
Feature: Login

  Scenario Outline: Login with mobile and OTP
    When user enters "<mobile>" and requests OTP
    And submits "<otp>"
    Then user is logged in

    Examples:
      | mobile   | otp    |
      | <mobile> | <otp>  |