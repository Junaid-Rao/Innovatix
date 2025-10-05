# Innovatix Assignment - Test Automation Framework
**By Junaid Rao**

A comprehensive test automation framework built with Playwright, Cucumber.js, and JavaScript for testing both UI (SauceDemo) and API (Reqres) applications. This framework demonstrates professional test automation practices and is ready for client evaluation.

## 🚀 Setup/Installation Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Junaid-Rao/Innovatix
cd innovatix
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Install Playwright Browsers
```bash
npx playwright install
```

### 4. Verify Installation
```bash
npm run install:all
```

## 🎮 How to Execute Tests

The framework provides multiple execution options for different test scenarios:

### 🎯 Individual Test Suites

| Test Suite | Command | Scenarios | Description |
|------------|---------|-----------|-------------|
| **🌐 API Tests** | `npm run api:test` | 11 scenarios | List users, single user, create user with negative cases |
| **🔐 Login Tests** | `npm run login:test` | 3 scenarios | 1 positive, 2 negative login scenarios |
| **📦 Inventory Tests** | `npm run inventory:test` | 11 scenarios | 9 positive, 2 negative inventory management |
| **🛒 Cart Tests** | `npm run cart:test` | 8 scenarios | 6 positive, 2 negative cart operations |
| **💳 Checkout Tests** | `npm run checkout:test` | 7 scenarios | 5 positive, 2 negative checkout process |

### 🎯 Complete Test Execution

#### All API Tests
```bash
npm run api:test
```

#### All UI Tests
```bash
npm run ui:test
```

**Executes**: All 29 UI scenarios across login, inventory, cart, and checkout

#### All Tests (UI + API)
#### Complete Test Suite
```bash
npm run test
```
**Executes**: Complete test suite with 40 scenarios (29 UI + 11 API)


### 🔄 E2E Test Sequence (Recommended)

For comprehensive end-to-end testing that simulates real user workflows, run the tests in sequence:

```bash
# Run tests in E2E order
npm run api:test
npm run login:test
npm run inventory:test
npm run cart:test
npm run checkout:test
```

**Execution Order**:
1. **🌐 API Tests** - Backend validation first
2. **🔐 Login Tests** - User authentication
3. **📦 Inventory Tests** - Product browsing
4. **🛒 Cart Tests** - Shopping cart operations  
5. **💳 Checkout Tests** - Complete purchase flow

This sequence ensures proper test dependencies and provides a realistic user journey simulation.

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

The framework includes a comprehensive GitHub Actions workflow (`.github/workflows/test-automation.yml`) that:

#### Triggers
- **Push to master/main branch** - Runs on every code push
- **Pull Request creation** - Validates changes before merge
- **Scheduled runs** - Executes daily at 00:00, 08:00, and 16:00 UTC (every 8 hours)

#### Features
- **E2E Test Sequence** - Executes tests in logical order
- **Artifact Storage** - Saves test reports and Cucumber publish links
- **PR Comments** - Automatically comments on pull requests with test results

#### Accessing Reports
1. Go to the **Actions** tab in your GitHub repository
2. Click on the specific workflow run
3. Scroll down to **Artifacts** section
4. Download `test-reports-{run_number}` for local HTML reports
5. **For Cucumber Cloud reports**: Check the **console output** in the workflow logs for dynamic publish links

## 📊 Test Case Documentation

### 🌐 API Test Scenarios (Reqres) - 11 Total

#### List Users API (3 scenarios)
| Test Case | Type | Description | Acceptance Criteria |
|-----------|------|-------------|-------------------|
| **Get List of Users** | Positive | Retrieve paginated list of users | Status 200, data array with 6 users, each user has required fields (id, name, year, color, pantone_value) |
| **Get List with Invalid Page** | Negative | Request page 999 | Status 200, empty data array |
| **Get List with Negative Page** | Negative | Request page -1 | Status 200, data array with 6 users (defaults to page 1) |

#### Single User API (4 scenarios)
| Test Case | Type | Description | Acceptance Criteria |
|-----------|------|-------------|-------------------|
| **Get Single User** | Positive | Retrieve user by ID 2 | Status 200, data object with id=2, name="fuchsia rose", year=2001 |
| **Get User with Invalid ID** | Negative | Request user ID 999 | Status 404, no data object |
| **Get User with Zero ID** | Negative | Request user ID 0 | Status 404, no data object |
| **Get User with Negative ID** | Negative | Request user ID -1 | Status 404, no data object |

#### Create User API (4 scenarios)
| Test Case | Type | Description | Acceptance Criteria |
|-----------|------|-------------|-------------------|
| **Create New User** | Positive | Create user with valid data | Status 201 or 429, response contains submitted data and generated ID |
| **Create User Missing Fields** | Negative | Create user with empty data | Status 201, 400, 401, or 429, handles missing fields gracefully |
| **Create User Invalid Data** | Negative | Create user with invalid data types | Status 201, 400, 401, or 429, handles invalid data gracefully |
| **Create User Empty Request** | Negative | Send empty POST request | Status 201, 400, 401, or 429, handles empty request gracefully |

### 🖥️ UI Test Scenarios (SauceDemo) - 29 Total

#### Login Module (3 scenarios)
| Test Case | Type | Description | Acceptance Criteria |
|-----------|------|-------------|-------------------|
| **Successful Login** | Positive | Login with standard_user credentials | User redirected to inventory page, inventory container visible |
| **Locked-Out User** | Negative | Attempt login with locked_out_user | Error message "Epic sadface: Sorry, this user has been locked out" displayed |
| **Invalid Credentials** | Negative | Login with invalid credentials | Error message "Epic sadface: Username and password do not match any user in this service" displayed |

#### Inventory Management (11 scenarios)
| Test Case | Type | Description | Acceptance Criteria |
|-----------|------|-------------|-------------------|
| **View Inventory Page** | Positive | Navigate to inventory after login | Inventory container visible, multiple products displayed, shopping cart icon present |
| **Sort Products by Name** | Positive | Sort products alphabetically | Products sorted A-Z, first product name starts with 'A' |
| **Sort Products by Price** | Positive | Sort products by price (low to high) | Products sorted by price, lowest price first |
| **Add Item to Cart** | Positive | Add first product to cart | Cart badge shows "1", item added successfully |
| **Remove Item from Cart** | Positive | Remove item from inventory page | Cart badge shows "0", item removed successfully |
| **Add Multiple Items** | Positive | Add 3 different items to cart | Cart badge shows "3", all items added |
| **Remove Multiple Items** | Positive | Remove 2 items from inventory | Cart badge shows "1", correct items removed |
| **Logout Functionality** | Positive | Logout from inventory page | Redirected to login page, logout successful |
| **Continue Shopping** | Positive | Navigate from cart to inventory | Redirected to inventory page, can continue shopping |
| **Try to Remove Item from Empty Cart** | Negative | Attempt to remove item when cart is empty | Cart badge not visible, button remains "Add to cart" |
| **Try to Access Inventory Without Login** | Negative | Navigate to inventory URL without authentication | Redirected to login page, login form visible |

#### Shopping Cart Operations (8 scenarios)
| Test Case | Type | Description | Acceptance Criteria |
|-----------|------|-------------|-------------------|
| **View Cart** | Positive | Navigate to shopping cart | Cart page loaded, items displayed correctly |
| **Add Item from Cart** | Positive | Add item while viewing cart | Item added to cart, cart count updated |
| **Remove Item from Cart** | Positive | Remove item from cart page | Item removed, cart count updated |
| **View Cart with Items** | Positive | View cart with multiple items | All items displayed, quantities correct |
| **Continue Shopping** | Positive | Return to inventory from cart | Redirected to inventory page |
| **Proceed to Checkout** | Positive | Initiate checkout process | Redirected to checkout step one |
| **Try to Checkout with Empty Cart** | Negative | Attempt checkout when cart is empty | Remain on cart page, checkout not available |
| **Try to Remove Non-existent Item** | Negative | Attempt to remove item that doesn't exist | Error handling or no action occurs, cart unchanged |

#### Checkout Process (7 scenarios)
| Test Case | Type | Description | Acceptance Criteria |
|-----------|------|-------------|-------------------|
| **Complete Checkout** | Positive | Fill checkout info and complete order | Order completed successfully, "Thank you for your order!" message displayed |
| **Checkout Information** | Positive | Fill required checkout fields | First name, last name, postal code filled correctly |
| **Order Summary** | Positive | Review order before completion | Order summary displayed with item details, subtotal, tax, and total |
| **Cancel Checkout** | Positive | Cancel checkout process | Redirected back to cart page |
| **Checkout Validation** | Positive | Validate checkout form | All required fields validated |
| **Try to Checkout with Empty Fields** | Negative | Attempt checkout without filling required fields | Validation error messages displayed, remain on step one |
| **Try to Checkout with Invalid Data** | Negative | Attempt checkout with invalid data format | Validation error messages displayed, remain on step one |

### 🌐 API Test Scenarios (Reqres) - 11 Total

#### List Users API (3 scenarios)
| Test Case | Type | Description | Acceptance Criteria |
|-----------|------|-------------|-------------------|
| **Get List of Users** | Positive | Retrieve paginated list of users | Status 200, data array with 6 users, each user has required fields (id, name, year, color, pantone_value) |
| **Get List with Invalid Page** | Negative | Request page 999 | Status 200, empty data array |
| **Get List with Negative Page** | Negative | Request page -1 | Status 200, data array with 6 users (defaults to page 1) |

#### Single User API (4 scenarios)
| Test Case | Type | Description | Acceptance Criteria |
|-----------|------|-------------|-------------------|
| **Get Single User** | Positive | Retrieve user by ID 2 | Status 200, data object with id=2, name="fuchsia rose", year=2001 |
| **Get User with Invalid ID** | Negative | Request user ID 999 | Status 404, no data object |
| **Get User with Zero ID** | Negative | Request user ID 0 | Status 404, no data object |
| **Get User with Negative ID** | Negative | Request user ID -1 | Status 404, no data object |

#### Create User API (4 scenarios)
| Test Case | Type | Description | Acceptance Criteria |
|-----------|------|-------------|-------------------|
| **Create New User** | Positive | Create user with valid data | Status 201 or 429, response contains submitted data and generated ID |
| **Create User Missing Fields** | Negative | Create user with empty data | Status 201, 400, 401, or 429, handles missing fields gracefully |
| **Create User Invalid Data** | Negative | Create user with invalid data types | Status 201, 400, 401, or 429, handles invalid data gracefully |
| **Create User Empty Request** | Negative | Send empty POST request | Status 201, 400, 401, or 429, handles empty request gracefully |

## 🏗️ Framework Architecture

### 📁 Directory Structure
```
innovatix/
├── features/
│   ├── ui/                          # SauceDemo UI feature files
│   │   ├── login.feature            # Login scenarios (3 tests)
│   │   ├── inventory-management.feature  # Inventory scenarios (9 tests)
│   │   ├── cart-operations.feature # Cart scenarios (6 tests)
│   │   └── checkout-process.feature # Checkout scenarios (5 tests)
│   └── api/                         # Reqres API feature files
│       ├── list-users.feature       # List users scenarios (3 tests)
│       ├── single-user.feature      # Single user scenarios (4 tests)
│       └── create-user.feature      # Create user scenarios (4 tests)
├── step-definitions/
│   ├── ui/
│   │   └── ui-steps.js             # Consolidated UI step definitions
│   └── api/
│       └── api-steps.js            # Consolidated API step definitions
├── page-objects/                   # Page Object Model files
│   └── page-objects.js             # Merged page objects (LoginPage, InventoryPage, CartPage)
├── utils/
│   └── api-client.js               # API client with retry logic
├── reports/                        # Test execution reports
│   ├── cucumber_report.json
│   └── cucumber-report.html
├── package.json                    # Project configuration
├── cucumber.js                     # Cucumber configuration
└── README.md                       # This documentation
```

## 🌐 API Testing Details

### 🔑 Required Headers
All API requests include mandatory headers:
```javascript
{
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'User-Agent': 'Innovatix-Automation-Framework',
  'x-api-key': 'reqres-free-v1'
}
```

### 🎯 Endpoints Tested
- `GET /users?page=2` - List users with pagination
- `GET /users/2` - Retrieve specific user by ID
- `POST /users` - Create new user with validation

## 🎯 Test Data

### 📊 API Test Data
```javascript
// Create User Request Body
{
  "id": 1004,
  "name": "junaid Rao",
  "year": 2003,
  "color": "#C74375",
  "pantone_value": "17-2031"
}
```

## 📊 Performance Metrics

### ⏱️ Expected Execution Times
- **Login Tests**: ~30 seconds (3 scenarios)
- **Inventory Tests**: ~2.5 minutes (11 scenarios)
- **Cart Tests**: ~1.5 minutes (8 scenarios)
- **Checkout Tests**: ~1.5 minutes (7 scenarios)
- **API Tests**: ~30 seconds (11 scenarios)
- **Complete Suite**: ~6 minutes (40 scenarios)

### 🎯 Test Coverage
- **UI Coverage**: Complete SauceDemo application workflow with positive and negative scenarios
- **API Coverage**: All major Reqres API endpoints with comprehensive error handling
- **Error Scenarios**: 8 negative UI test cases + 5 negative API test cases
- **Edge Cases**: Boundary value testing and comprehensive error handling

## 📞 Contact Information

**Developer**: Junaid Rao  
**Project**: Innovatix Assignment  
**Framework**: Playwright + Cucumber.js + JavaScript  
**Date**: 10/05/2025

---
