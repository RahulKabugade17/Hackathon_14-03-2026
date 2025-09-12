@smoke
Feature: Login

Scenario: Login with mobile and OTP
  Given user is on the mobile login screen
  When user logs in with mobile number and OTP 
  Then user should be logged in successfully
