Feature: SauceDemo Login Functionality
  As a user of SauceDemo
  I want to be able to login with different credentials
  So that I can access the application based on my user type

  This feature covers comprehensive login functionality including:
  - Successful authentication with valid credentials
  - Error handling for locked user accounts
  - Validation of invalid credentials
  - User session management
  - Security validation and access control

  Background:
    Given I am on the SauceDemo login page

  Scenario: Successful Login with Standard User (Positive)
    When I login with username "standard_user" and password "secret_sauce"
    Then I should be redirected to the inventory page
    And I should see the inventory container

  Scenario: Locked Out User Login Attempt (Negative)
    When I login with username "locked_out_user" and password "secret_sauce"
    Then I should see an error message
    And the error message should contain "Epic sadface: Sorry, this user has been locked out"

  Scenario: Invalid Credentials Login Attempt (Negative)
    When I login with username "invalid_user" and password "invalid_password"
    Then I should see an error message
    And the error message should contain "Epic sadface: Username and password do not match any user in this service"