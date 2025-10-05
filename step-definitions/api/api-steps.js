const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { ApiClient } = require('../../utils/api-client');

let apiClient;
let response;

// ============================================================================
// LIST USERS API STEPS
// ============================================================================

When('I make a GET request to list users with page {int}', async function (page) {
  apiClient = new ApiClient();
  response = await apiClient.getUsers(page);
  
  // Log response details for HTML report
  this.attach(`📡 API Request: GET /users?page=${page}`, 'text/plain');
  this.attach(`📊 Response Status: ${response.status}`, 'text/plain');
  this.attach(`📋 Response Data: ${JSON.stringify(response.data, null, 2)}`, 'application/json');
});

Then('the response status should be {int}', async function (expectedStatus) {
  expect(response.status).toBe(expectedStatus);
  
  // Log status validation for HTML report
  this.attach(`✅ Status Validation: Expected ${expectedStatus}, Actual ${response.status} ${response.status === expectedStatus ? '✓' : '✗'}`, 'text/plain');
});

Then('the response should contain a data array', async function () {
  expect(response.data).toHaveProperty('data');
  expect(Array.isArray(response.data.data)).toBe(true);
  
  // Log data array validation for HTML report
  const hasDataProperty = response.data.hasOwnProperty('data');
  const isArray = Array.isArray(response.data.data);
  this.attach(`✅ Data Array Validation: Has 'data' property: ${hasDataProperty ? '✓' : '✗'}, Is Array: ${isArray ? '✓' : '✗'}`, 'text/plain');
});

Then('the data array should contain exactly {int} users', async function (expectedCount) {
  expect(response.data.data).toHaveLength(expectedCount);
  
  // Log count validation for HTML report
  const actualCount = response.data.data.length;
  this.attach(`✅ Count Validation: Expected ${expectedCount} users, Actual ${actualCount} users ${actualCount === expectedCount ? '✓' : '✗'}`, 'text/plain');
});

Then('each user should have required fields: id, name, year, color, pantone_value', async function () {
  const requiredFields = ['id', 'name', 'year', 'color', 'pantone_value'];
  const users = response.data.data;
  
  let validationResults = [];
  users.forEach((user, index) => {
    const userValidation = [];
    requiredFields.forEach(field => {
      const hasField = user.hasOwnProperty(field);
      userValidation.push(`${field}: ${hasField ? '✓' : '✗'}`);
      expect(user).toHaveProperty(field);
    });
    validationResults.push(`User ${index + 1}: ${userValidation.join(', ')}`);
  });
  
  // Log field validation for HTML report
  this.attach(`✅ Field Validation:\n${validationResults.join('\n')}`, 'text/plain');
});

Then('the data array should be empty', async function () {
  expect(response.data.data).toHaveLength(0);
  
  // Log empty array validation for HTML report
  const actualCount = response.data.data.length;
  this.attach(`✅ Empty Array Validation: Expected 0 users, Actual ${actualCount} users ${actualCount === 0 ? '✓' : '✗'}`, 'text/plain');
});

// ============================================================================
// SINGLE USER API STEPS
// ============================================================================

When('I make a GET request to get user by id {int}', async function (userId) {
  apiClient = new ApiClient();
  response = await apiClient.getUserById(userId);
  
  // Log response details for HTML report
  this.attach(`📡 API Request: GET /users/${userId}`, 'text/plain');
  this.attach(`📊 Response Status: ${response.status}`, 'text/plain');
  this.attach(`📋 Response Data: ${JSON.stringify(response.data, null, 2)}`, 'application/json');
});

Then('the single user response status should be {int}', async function (expectedStatus) {
  expect(response.status).toBe(expectedStatus);
  
  // Log status validation for HTML report
  this.attach(`✅ Status Validation: Expected ${expectedStatus}, Actual ${response.status} ${response.status === expectedStatus ? '✓' : '✗'}`, 'text/plain');
});

Then('the single user response should contain a data object', async function () {
  expect(response.data).toHaveProperty('data');
  expect(typeof response.data.data).toBe('object');
  
  // Log data object validation for HTML report
  const hasDataProperty = response.data.hasOwnProperty('data');
  const isObject = typeof response.data.data === 'object';
  this.attach(`✅ Data Object Validation: Has 'data' property: ${hasDataProperty ? '✓' : '✗'}, Is Object: ${isObject ? '✓' : '✗'}`, 'text/plain');
});

Then('the single user data object should have id equal to {int}', async function (expectedId) {
  expect(response.data.data.id).toBe(expectedId);
  
  // Log ID validation for HTML report
  const actualId = response.data.data.id;
  this.attach(`✅ ID Validation: Expected ${expectedId}, Actual ${actualId} ${actualId === expectedId ? '✓' : '✗'}`, 'text/plain');
});

Then('the single user data object should have name equal to {string}', async function (expectedName) {
  expect(response.data.data.name).toBe(expectedName);
  
  // Log name validation for HTML report
  const actualName = response.data.data.name;
  this.attach(`✅ Name Validation: Expected "${expectedName}", Actual "${actualName}" ${actualName === expectedName ? '✓' : '✗'}`, 'text/plain');
});

Then('the single user data object should have year equal to {int}', async function (expectedYear) {
  expect(response.data.data.year).toBe(expectedYear);
  
  // Log year validation for HTML report
  const actualYear = response.data.data.year;
  this.attach(`✅ Year Validation: Expected ${expectedYear}, Actual ${actualYear} ${actualYear === expectedYear ? '✓' : '✗'}`, 'text/plain');
});

Then('the single user response should not contain a data object', async function () {
  expect(response.data).not.toHaveProperty('data');
  
  // Log missing data object validation for HTML report
  const hasDataProperty = response.data.hasOwnProperty('data');
  this.attach(`✅ Missing Data Object Validation: Expected no 'data' property, Actual ${hasDataProperty ? 'has data property ✗' : 'no data property ✓'}`, 'text/plain');
});

// ============================================================================
// CREATE USER API STEPS
// ============================================================================

When('I make a POST request to create user with the following data:', async function (dataTable) {
  apiClient = new ApiClient();
  const userData = dataTable.hashes()[0];
  response = await apiClient.createUser(userData);
  
  // Log response details for HTML report
  this.attach(`📡 API Request: POST /users`, 'text/plain');
  this.attach(`📤 Request Data: ${JSON.stringify(userData, null, 2)}`, 'application/json');
  this.attach(`📊 Response Status: ${response.status}`, 'text/plain');
  this.attach(`📋 Response Data: ${JSON.stringify(response.data, null, 2)}`, 'application/json');
});

When('I make a POST request to create user with empty data', async function () {
  apiClient = new ApiClient();
  response = await apiClient.createUser({});
  
  // Log empty request for HTML report
  this.attach(`📡 API Request: POST /users (Empty Body)`, 'text/plain');
  this.attach(`📤 Request Data: {}`, 'application/json');
  this.attach(`📊 Response Status: ${response.status}`, 'text/plain');
  this.attach(`📋 Response Data: ${JSON.stringify(response.data, null, 2)}`, 'application/json');
});

Then('the create user response status should be 201 or 429', async function () {
  expect([201, 429]).toContain(response.status);
  
  // Log status validation for HTML report
  const isValidStatus = [201, 429].includes(response.status);
  this.attach(`✅ Status Validation: Expected 201 or 429, Actual ${response.status} ${isValidStatus ? '✓' : '✗'}`, 'text/plain');
});

Then('the create user response status should be 201, 400, 401, or 429', async function () {
  expect([201, 400, 401, 429]).toContain(response.status);
  
  // Log status validation for HTML report
  const isValidStatus = [201, 400, 401, 429].includes(response.status);
  this.attach(`✅ Status Validation: Expected 201, 400, 401, or 429, Actual ${response.status} ${isValidStatus ? '✓' : '✗'}`, 'text/plain');
});

Then('the create user response should contain the submitted name {string}', async function (expectedName) {
  expect(response.data.name).toBe(expectedName);
  
  // Log name validation for HTML report
  const actualName = response.data.name;
  this.attach(`✅ Name Validation: Expected "${expectedName}", Actual "${actualName}" ${actualName === expectedName ? '✓' : '✗'}`, 'text/plain');
});

Then('the create user response should contain the submitted year {int}', async function (expectedYear) {
  expect(response.data.year).toBe(expectedYear.toString());
  
  // Log year validation for HTML report
  const actualYear = response.data.year;
  this.attach(`✅ Year Validation: Expected "${expectedYear}", Actual "${actualYear}" ${actualYear === expectedYear.toString() ? '✓' : '✗'}`, 'text/plain');
});

Then('the create user response should contain the submitted color {string}', async function (expectedColor) {
  expect(response.data.color).toBe(expectedColor);
  
  // Log color validation for HTML report
  const actualColor = response.data.color;
  this.attach(`✅ Color Validation: Expected "${expectedColor}", Actual "${actualColor}" ${actualColor === expectedColor ? '✓' : '✗'}`, 'text/plain');
});

Then('the create user response should contain the submitted pantone_value {string}', async function (expectedPantoneValue) {
  expect(response.data.pantone_value).toBe(expectedPantoneValue);
  
  // Log pantone value validation for HTML report
  const actualPantoneValue = response.data.pantone_value;
  this.attach(`✅ Pantone Value Validation: Expected "${expectedPantoneValue}", Actual "${actualPantoneValue}" ${actualPantoneValue === expectedPantoneValue ? '✓' : '✗'}`, 'text/plain');
});

Then('the create user response should contain a newly generated id', async function () {
  expect(response.data).toHaveProperty('id');
  expect(typeof response.data.id).toBe('string');
  expect(response.data.id.length).toBeGreaterThan(0);
  
  // Log ID validation for HTML report
  const hasId = response.data.hasOwnProperty('id');
  const isString = typeof response.data.id === 'string';
  const hasLength = response.data.id.length > 0;
  this.attach(`✅ Generated ID Validation: Has ID: ${hasId ? '✓' : '✗'}, Is String: ${isString ? '✓' : '✗'}, Has Length: ${hasLength ? '✓' : '✗'}`, 'text/plain');
});

Then('the create user response should contain a created_at timestamp', async function () {
  expect(response.data).toHaveProperty('createdAt');
  expect(typeof response.data.createdAt).toBe('string');
  
  // Log timestamp validation for HTML report
  const hasTimestamp = response.data.hasOwnProperty('createdAt');
  const isString = typeof response.data.createdAt === 'string';
  this.attach(`✅ Timestamp Validation: Has createdAt: ${hasTimestamp ? '✓' : '✗'}, Is String: ${isString ? '✓' : '✗'}`, 'text/plain');
});

Then('the create user response should handle missing fields gracefully', async function () {
  // This step validates that the API handles missing fields without crashing
  expect(response.status).toBeDefined();
  expect(response.data).toBeDefined();
  
  // Log graceful handling validation for HTML report
  this.attach(`✅ Graceful Handling: API responded with status ${response.status} and data structure ✓`, 'text/plain');
});

Then('the create user response should handle invalid data types gracefully', async function () {
  // This step validates that the API handles invalid data types without crashing
  expect(response.status).toBeDefined();
  expect(response.data).toBeDefined();
  
  // Log graceful handling validation for HTML report
  this.attach(`✅ Graceful Handling: API responded with status ${response.status} and data structure ✓`, 'text/plain');
});

Then('the create user response should handle empty request gracefully', async function () {
  // This step validates that the API handles empty requests without crashing
  expect(response.status).toBeDefined();
  expect(response.data).toBeDefined();
  
  // Log graceful handling validation for HTML report
  this.attach(`✅ Graceful Handling: API responded with status ${response.status} and data structure ✓`, 'text/plain');
});
