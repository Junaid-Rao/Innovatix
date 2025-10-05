Feature: Reqres API - Create User
  As an API consumer
  I want to create a new user
  So that I can add user data to the system

  Scenario: Create a New User (Positive)
    When I make a POST request to create user with the following data:
      | id    | name       | year | color     | pantone_value |
      | 1004  | junaid Rao | 2003 | #C74375   | 17-2031       |
    Then the create user response status should be 201 or 429
    And the create user response should contain the submitted name "junaid Rao"
    And the create user response should contain the submitted year 2003
    And the create user response should contain the submitted color "#C74375"
    And the create user response should contain the submitted pantone_value "17-2031"
    And the create user response should contain a newly generated id
    And the create user response should contain a created_at timestamp

  Scenario: Create User with Missing Required Fields (Negative)
    When I make a POST request to create user with the following data:
      | id    | name | year | color | pantone_value |
      |       |      |      |       |               |
    Then the create user response status should be 201, 400, 401, or 429
    And the create user response should handle missing fields gracefully

  Scenario: Create User with Invalid Data Types (Negative)
    When I make a POST request to create user with the following data:
      | id    | name | year | color     | pantone_value |
      | abc   | 123  | xyz  | #INVALID  | 999-9999      |
    Then the create user response status should be 201, 400, 401, or 429
    And the create user response should handle invalid data types gracefully

  Scenario: Create User with Empty Request Body (Negative)
    When I make a POST request to create user with empty data
    Then the create user response status should be 201, 400, 401, or 429
    And the create user response should handle empty request gracefully
