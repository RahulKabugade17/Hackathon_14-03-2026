@e2e @homepage
Feature: Validate complete Home Page flow for persona

  Scenario Outline: Verify end-to-end Home Page functionality for "<persona>"

    # Login Flow
    Given I am logged in as "<persona>"

    # CleverTap Banner
    Then CleverTap banner should be visible
    When user closes the CleverTap banner
    Then Home screen should load successfully

    # Tooltips Validation (First Visit)
    Then all first-visit tooltips should be displayed
    When user taps on Got it or Skip
    Then tooltips should disappear
    And Home screen should remain fully usable

    # Loyalty Tier Section
    When user opens Loyalty Tier section
    And user navigates through tier details
    Then tier details should be validated successfully
    When user clicks on each navigation option on tier card
    Then user should be navigated correctly
    When user navigates back to Home screen
    Then Home screen should be displayed

    # Banner Navigation
    When user clicks on each Home banner
    Then user should be navigated to respective destination
    When user navigates back to Home after each banner
    Then Home screen should be displayed

    # Explore Products Section
    When user scrolls to Explore Products section
    And user clicks on View All Category
    Then following categories should be visible:
      | Exterior Paints |
      | Interior Paints |
      | Enamels         |
      | Waterproofing   |
      | Wood Finishes   |

    When user opens each product category
    Then correct product listing should be displayed
    When user navigates back to Home after each category
    Then Home screen should be displayed

    # Notifications
    When user taps on Notification icon
    Then notification listing should be displayed
    When user navigates back to Home screen
    Then Home screen should be displayed

    # Contact Us
    When user taps on Contact Us icon
    Then Help Center screen should be displayed
    When user navigates back to Home screen
    Then Home screen should be displayed

    # Bottom Navigation
    When user taps on Home tab
    Then user should remain on Home screen

    # Scan
    When user taps on Scan tab
    Then user should be navigated to Scan module
    When user navigates back to Home screen
    Then Home screen should be displayed

    # Rewards
    When user taps on Rewards tab
    Then user should be navigated to Rewards module
    When user navigates back to Home screen
    Then Home screen should be displayed

    Examples:
      | persona |
      | painter |