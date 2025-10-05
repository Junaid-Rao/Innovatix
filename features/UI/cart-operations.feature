Feature: SauceDemo - Shopping Cart Operations
  As a logged-in user
  I want to manage items in my shopping cart
  So that I can review and modify my purchases

  This feature covers comprehensive shopping cart functionality including:
  - Cart viewing and navigation
  - Item management (add/remove items)
  - Cart state validation (empty/filled)
  - Navigation between cart and inventory
  - Checkout initiation
  - Error handling for invalid cart operations

  Background:
    Given I am logged in as "standard_user"

  Scenario: View empty cart (Positive)
    When I navigate to the cart page
    Then I should see the cart page
    And the cart should be empty
    And I should see "Continue Shopping" button

  Scenario: Add items and view cart (Positive)
    When I navigate to the inventory page
    And I add the first item to cart
    And I add the second item to cart
    And I click the cart icon
    Then I should see the cart page
    And I should see 2 items in the cart
    And I should see item names and prices
    And I should see "Checkout" button

  Scenario: Remove item from cart page (Positive)
    When I navigate to the inventory page
    And I add the first item to cart
    And I add the second item to cart
    And I click the cart icon
    And I remove the first item from cart
    Then I should see 1 item remaining in the cart
    And the cart badge should show "1"

  Scenario: Continue shopping from cart (Positive)
    When I navigate to the inventory page
    And I add an item to cart
    And I click the cart icon
    And I click continue shopping
    Then I should be redirected to the inventory page
    And I should see the inventory container

  Scenario: Proceed to checkout from cart (Positive)
    When I navigate to the inventory page
    And I add an item to cart
    And I click the cart icon
    And I click checkout
    Then I should be redirected to the checkout page

  Scenario: View cart with multiple different items (Positive)
    When I navigate to the inventory page
    And I add the first item to cart
    And I add the third item to cart
    And I add the fifth item to cart
    And I click the cart icon
    Then I should see 3 items in the cart
    And each item should have a quantity of 1
    And I should see different item names

  Scenario: Try to checkout with empty cart (Negative)
    When I navigate to the cart page
    And I try to click checkout button
    Then I should remain on the cart page
    And I should see "Continue Shopping" button
    And checkout should not be available

  Scenario: Try to remove non-existent item from cart (Negative)
    When I navigate to the inventory page
    And I click the cart icon
    And I try to remove an item that doesn't exist
    Then I should see an error or no action should occur
    And the cart should remain unchanged
