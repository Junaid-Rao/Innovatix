Feature: SauceDemo - Checkout Process
  As a logged-in user
  I want to complete the checkout process
  So that I can purchase items from my cart

  This feature covers comprehensive checkout functionality including:
  - Checkout form validation and data entry
  - Order summary review and confirmation
  - Payment processing simulation
  - Order completion and confirmation
  - Checkout cancellation and navigation
  - Error handling for invalid checkout data

  Background:
    Given I am logged in as "standard_user"

  Scenario: Complete checkout with valid information (Positive)
    When I navigate to the inventory page
    And I add the first item to cart
    And I click the cart icon
    And I click checkout
    And I fill checkout information with:
      | firstName | lastName | zipCode |
      | Junaid    | Rao      | 7100    |
    And I click continue
    And I click finish
    Then I should see the checkout complete page
    And I should see "Thank you for your order!" message

  Scenario: Complete checkout with different user information (Positive)
    When I navigate to the inventory page
    And I add the second item to cart
    And I click the cart icon
    And I click checkout
    And I fill checkout information with:
      | firstName | lastName | zipCode |
      | Junaid    | Rao      | 7100    |
    And I click continue
    And I click finish
    Then I should see the checkout complete page
    And I should see "Thank you for your order!" message

  Scenario: Cancel checkout process (Positive)
    When I navigate to the inventory page
    And I add an item to cart
    And I click the cart icon
    And I click checkout
    And I fill checkout information with:
      | firstName | lastName | zipCode |
      | Junaid    | Rao      | 7100    |
    And I click continue
    And I click cancel
    Then I should be redirected to the inventory page

  Scenario: Back to cart from checkout step one (Positive)
    When I navigate to the inventory page
    And I add an item to cart
    And I click the cart icon
    And I click checkout
    And I click cancel
    Then I should be redirected to the cart page

  Scenario: View order summary before completion (Positive)
    When I navigate to the inventory page
    And I add the first item to cart
    And I add the second item to cart
    And I click the cart icon
    And I click checkout
    And I fill checkout information with:
      | firstName | lastName | zipCode |
      | Junaid    | Rao      | 7100    |
    And I click continue
    Then I should see the order summary
    And I should see item details
    And I should see subtotal, tax, and total
    And I should see "Finish" button

  Scenario: Try to checkout with empty required fields (Negative)
    When I navigate to the inventory page
    And I add an item to cart
    And I click the cart icon
    And I click checkout
    And I try to continue without filling required fields
    Then I should see validation error messages
    And I should remain on checkout step one

  Scenario: Try to checkout with invalid data format (Negative)
    When I navigate to the inventory page
    And I add an item to cart
    And I click the cart icon
    And I click checkout
    And I fill checkout information with:
      | firstName | lastName | zipCode |
      | 123       | @#$      | abc     |
    And I try to continue
    Then I should see validation error messages
    And I should remain on checkout step one
