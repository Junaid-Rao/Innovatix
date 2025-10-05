Feature: Reqres API - List Users
  As an API consumer
  I want to retrieve a list of users
  So that I can get user information

  Scenario: Get List of Users with Pagination (Positive)
    When I make a GET request to list users with page 2
    Then the response status should be 200
    And the response should contain a data array
    And the data array should contain exactly 6 users
    And each user should have required fields: id, name, year, color, pantone_value

  Scenario: Get List of Users with Invalid Page Number (Negative)
    When I make a GET request to list users with page 999
    Then the response status should be 200
    And the response should contain a data array
    And the data array should be empty

  Scenario: Get List of Users with Negative Page Number (Negative)
    When I make a GET request to list users with page -1
    Then the response status should be 200
    And the response should contain a data array
    And the data array should contain exactly 6 users
