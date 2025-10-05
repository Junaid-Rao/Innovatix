Feature: Reqres API - Single User
  As an API consumer
  I want to retrieve a specific user by ID
  So that I can get detailed information about that user

  Scenario: Get Single User by ID (Positive)
    When I make a GET request to get user by id 2
    Then the single user response status should be 200
    And the single user response should contain a data object
    And the single user data object should have id equal to 2
    And the single user data object should have name equal to "fuchsia rose"
    And the single user data object should have year equal to 2001

  Scenario: Get Single User with Invalid ID (Negative)
    When I make a GET request to get user by id 999
    Then the single user response status should be 404
    And the single user response should not contain a data object

  Scenario: Get Single User with Zero ID (Negative)
    When I make a GET request to get user by id 0
    Then the single user response status should be 404
    And the single user response should not contain a data object

  Scenario: Get Single User with Negative ID (Negative)
    When I make a GET request to get user by id -1
    Then the single user response status should be 404
    And the single user response should not contain a data object
