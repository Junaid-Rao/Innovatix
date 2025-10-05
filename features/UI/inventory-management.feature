Feature: SauceDemo - Product Management
  As a logged-in user
  I want to manage products in the inventory
  So that I can view, sort, and interact with available items

  This feature covers comprehensive inventory management functionality including:
  - Product viewing and display validation
  - Multiple sorting options (name A-Z, Z-A, price low-high, high-low)
  - Cart operations (add/remove items)
  - User session management (logout)
  - Error handling for invalid operations

  Background:
    Given I am logged in as "standard_user"

  Scenario: View inventory page after login (Positive)
    When I navigate to the inventory page
    Then I should see the inventory container
    And I should see multiple products displayed
    And I should see a shopping cart icon

  Scenario: Sort products by name A to Z (Positive)
    When I navigate to the inventory page
    And I select sort option "az"
    Then products should be sorted alphabetically A to Z
    And the first product should be "Sauce Labs Backpack"

  Scenario: Sort products by name Z to A (Positive)
    When I navigate to the inventory page
    And I select sort option "za"
    Then products should be sorted alphabetically Z to A
    And the first product should be "Test.allTheThings() T-Shirt (Red)"

  Scenario: Sort products by price low to high (Positive)
    When I navigate to the inventory page
    And I select sort option "lohi"
    Then products should be sorted by price low to high
    And the cheapest product should be displayed first

  Scenario: Sort products by price high to low (Positive)
    When I navigate to the inventory page
    And I select sort option "hilo"
    Then products should be sorted by price high to low
    And the most expensive product should be displayed first

  Scenario: Add single item to cart (Positive)
    When I navigate to the inventory page
    And I add the first item to cart
    Then the cart badge should show "1"
    And the item button should change to "Remove"

  Scenario: Add multiple items to cart (Positive)
    When I navigate to the inventory page
    And I add the first item to cart
    And I add the second item to cart
    Then the cart badge should show "2"
    And both items should show "Remove" button

  Scenario: Remove item from cart (Positive)
    When I navigate to the inventory page
    And I add the first item to cart
    And I remove the first item from cart
    Then the cart badge should not be visible
    And the item button should change back to "Add to cart"

  Scenario: Logout from inventory page (Positive)
    When I navigate to the inventory page
    And I click the menu button
    And I click logout
    Then I should be redirected to the login page

  Scenario: Try to remove item from empty cart (Negative)
    When I navigate to the inventory page
    And I try to remove the first item from cart
    Then the cart badge should not be visible
    And the item button should remain "Add to cart"

  Scenario: Try to access inventory without login (Negative)
    When I try to navigate to inventory page without login
    Then I should be redirected to the login page
    And I should see the login form
