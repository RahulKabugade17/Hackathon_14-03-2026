Feature: Contractor notification

  Scenario: Complete Contractor Notification Flow

    Given I am logged in as "contractor"

    When User navigate to dashboard
    Then User see notification button

    When User click on notification icon
    Then User should be redirected to notification page
    And User should see notification tabs

    When User click on "All" tab
    Then User should see list of notifications

    When User click on "Offers" tab
    Then User should see Not Available

    When User click on "Promotions" tab
    Then User should see Not Available

    When User click on back button
    Then User should be navigated to home screen
   
    
  