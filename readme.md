
# Cypress Automation Practices Showcase

## Project Overview

This repository is a demonstration of best practices and basic automation techniques using Cypress for API testing. The project includes examples of testing a sample Booking API and authenticating users with a dedicated Auth API. Additionally, it showcases how to use fixtures to handle data and basic Cypress commands to streamline test development.

## Test Suites Overview

### 1. **Booking API Testing**
This suite covers different types of API interactions:
- **GET all bookings**: Retrieves and validates booking IDs.
- **GET bookings by firstname**: Filters and validates bookings based on a provided name.
- **POST create booking**: Demonstrates how to create a new booking and validate its response.
- **PUT update booking**: Shows how to update a booking using an authentication token and checks that the response matches expectations.

**Key Features**:
- **Authentication**: A `beforeEach` hook is used to request an authentication token, making subsequent tests more secure.
- **Reusable Data**: Using `cy.wrap()` to pass values between test steps.
- **Assertions**: Detailed checks on response status, headers, and body properties.

### 2. **Auth API Testing**
This suite demonstrates user authentication by sending POST requests to an authentication endpoint with credentials. It tests different scenarios:
- **POST valid credentials**: Ensures that valid login details return a 200 status and a non-empty token.

**Key Features**:
- **Environment Variables**: Using `Cypress.env()` for dynamic data handling.
- **Custom Command**: An example of a reusable command for sending HTTP POST requests.

### 3. **Learning Cypress Concepts**
This suite highlights essential Cypress techniques for front-end testing:
- **User Interaction**: Simulates user login and verifies form behaviors.
- **Navigation**: Tests navigation to different pages and verifies the content.
- **Intercepting Requests**: Demonstrates how to mock network responses using `cy.intercept()` for a more controlled test environment.
- **Fixtures**: Illustrates the use of static data files for testing purposes.


