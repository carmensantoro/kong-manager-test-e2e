# Kong Manager E2E Tests

End-to-end test suite for Kong Manager using Cypress.

## Description

This project contains automated E2E tests to verify the main functionalities of Kong Manager, including Gateway Services, Routes management, and the Overview page.

## Prerequisites

- Node.js (recommended version: 16+)
- npm
- Docker and Docker Compose (for test environment)

## Installation

```bash
npm install
```

## Environment Setup

The project includes a `docker-compose.yml` file that configures:
- **PostgreSQL**: Kong database (port 5432)
- **Kong Gateway**: Control Plane with Admin API (port 8001) and Kong Manager UI (port 8002)

### Starting the environment

```bash
docker-compose up -d
```

Kong Manager will be available at: `http://localhost:8002`

Admin API will be available at: `http://localhost:8001`

## Running Tests

### Full execution with reports

```bash
npm test
```

This command:
1. Cleans previous reports
2. Runs all Cypress tests in headless mode
3. Merges results into a single JSON file
4. Generates an HTML report

### Interactive mode

```bash
npx cypress open
```

### Headless mode

```bash
npm run cy:run
```

## Reports

Tests generate two types of reports:

### Mochawesome (HTML)
Detailed HTML report available at: `cypress/reports/html/index.html`

### JUnit XML
XML report for CI/CD integration available at: `cypress/reports/junit/`

## Project Structure

```
.
├── cypress/
│   ├── e2e/                    # E2E tests
│   │   ├── gateway-services.cy.ts
│   │   ├── overview.cy.ts
│   │   └── routes.cy.ts
│   ├── fixtures/               # Test data and selectors
│   │   ├── gateway-services.ts
│   │   ├── general.ts
│   │   ├── overview.ts
│   │   └── routes.ts
│   └── support/                # Custom commands and configurations
│       ├── commands.ts
│       ├── e2e.ts
│       └── types.ts
├── cypress.config.ts           # Cypress configuration
├── cypress_report_config.json  # Reporter configuration
├── docker-compose.yml          # Kong environment
└── package.json
```

## Custom Commands

The project includes custom Cypress commands defined in `cypress/support/commands.ts`:

- **`cy.cleanUpSummary(type)`**: Cleans up data via Admin API (services, routes)
- **`cy.createService(serviceName, url)`**: Creates a new service via Admin API

## Configuration

### Cypress Configuration (`cypress.config.ts`)

- **Base URL**: `http://localhost:8002`
- **Admin API URL**: `http://localhost:8001`
- **Viewport**: 1280x720

### Docker Configuration

Kong credentials:
- **Database**: `kong` / `kong` / `kong` (user/password/database)
- **Kong Password**: `handyshake`

## Test Suites

### Gateway Services (`gateway-services.cy.ts`)
- Creating new services
- Navigation and cancellation
- Form validation

### Routes (`routes.cy.ts`)
- Managing routes associated with services
- Creating and configuring routes

### Overview (`overview.cy.ts`)
- Verifying the main dashboard
- Navigation between sections

## Available Scripts

- `npm run build`: Compiles TypeScript
- `npm run cy:run`: Runs Cypress tests in headless mode
- `npm test`: Runs complete tests with report generation
- `npm run report:clean`: Cleans previous reports
- `npm run report:merge`: Merges Mochawesome reports
- `npm run report:generate`: Generates HTML report

## Tech Stack

- **Cypress** (v15.7.1) - E2E testing framework
- **TypeScript** (v5.5.3) - Programming language
- **Mochawesome** - HTML report generator
- **Mocha JUnit Reporter** - XML report generator for CI/CD
- **Docker Compose** - Local environment setup

## Design Considerations, Assumptions, and Trade-offs

### Design Considerations

**1. Test Architecture**
- **Page Object Pattern Alternative**: Used fixture files to centralize selectors and test data instead of traditional Page Object Model. This approach provides a simpler structure suitable for the project's scope while maintaining maintainability.
- **Custom Commands**: Implemented reusable Cypress commands (`cleanUpSummary`, `createService`) to handle repetitive operations like API-based data setup and cleanup, reducing code duplication across test specs.
- **API-First Approach**: Leveraged Kong's Admin API for test data preparation and cleanup rather than performing all operations through the UI, significantly improving test execution speed and reliability.

**2. Test Data Management**
- **Isolation Strategy**: Each test suite cleans up its own data before execution using `beforeEach` hooks, ensuring test independence and preventing cascading failures.
- **Predictable Data**: Used deterministic service/route names (e.g., "service-test-01") to make tests reproducible and easier to debug.

**3. Reporting Strategy**
- **Dual Reporting**: Implemented both Mochawesome (HTML) and JUnit (XML) reporters to serve different needs:
  - Mochawesome for detailed, human-readable test reports with screenshots
  - JUnit for CI/CD integration and trend analysis
- **Consolidated Reports**: Merge multiple JSON reports into a single HTML output for easier review.

**4. Error Handling**
- **Graceful Failure Handling**: Configured Cypress to handle known Kong Manager uncaught exceptions to prevent false negatives while still catching legitimate test failures.

### Assumptions

**1. Environment**
- Kong Gateway and Kong Manager are available and properly configured via Docker Compose
- Services run on standard ports (8001 for Admin API, 8002 for Kong Manager)
- PostgreSQL database is used as Kong's data store
- Tests run on a local development environment with Docker installed

**2. Application Behavior**
- Kong Manager UI follows consistent selector patterns across versions
- The Admin API endpoints remain stable and backward-compatible
- Authentication is pre-configured with known credentials (`handyshake`)
- Network latency is minimal (localhost execution)

**3. Test Scope**
- Tests focus on core user workflows (services, routes, overview) rather than exhaustive feature coverage
- Assumes basic Kong Gateway functionality is tested elsewhere (unit/integration tests)
- UI validation is prioritized over performance testing

**4. Data State**
- Database starts in a clean state or can be cleaned via Admin API
- No external dependencies on other services or microservices
- Test data created during tests doesn't conflict with production data

### Trade-offs

**1. Fixture Files vs. Page Object Model**
- **Chosen**: Fixture files for selectors
- **Trade-off**: Less abstraction but simpler maintenance for a small test suite. As the project grows, this may need refactoring to full POM for better scalability.

**2. API Setup vs. UI Setup**
- **Chosen**: Admin API for test data creation/cleanup
- **Trade-off**: Faster test execution and better reliability, but doesn't test the UI creation flows as thoroughly. Critical user paths still validate UI-based creation.

**3. TypeScript vs. JavaScript**
- **Chosen**: TypeScript
- **Trade-off**: Additional compilation step and type definition overhead, but provides better IDE support, compile-time error detection, and self-documenting code.

**4. Headless vs. Interactive by Default**
- **Chosen**: Headless execution in CI via `npm test`
- **Trade-off**: Faster execution and suitable for CI/CD, but requires developers to explicitly use `cypress open` for debugging.

**5. Docker Compose for Environment**
- **Chosen**: Local Docker setup instead of connecting to remote environments
- **Trade-off**: Requires Docker installation and local resources, but provides consistent, reproducible test environments and eliminates external dependencies.

**6. Single Viewport Size**
- **Chosen**: Fixed 1280x720 viewport
- **Trade-off**: Doesn't test responsive behavior, but ensures consistent test execution and reduces flakiness from variable screen sizes, like mobile or tablet.

**7. Multiple Reporters**
- **Chosen**: Both Mochawesome and JUnit reporters enabled simultaneously
- **Trade-off**: Slightly increased test execution time and disk space usage, but provides flexibility for different reporting needs (local development vs. CI/CD).

**8. Test Granularity**
- **Chosen**: Focused E2E tests covering critical paths rather than exhaustive scenarios
- **Trade-off**: Faster test suite execution but potentially missing edge cases. This is balanced by assuming unit/integration tests cover detailed scenarios.

## Technical Notes

- Tests are written in TypeScript
- Uses Prettier for code formatting
- Handles uncaught exceptions for known Kong Manager errors
- Multiple reporters: Mochawesome (HTML) and JUnit (XML) for CI/CD

## Troubleshooting

### Kong won't start
Verify that ports 5432, 8000, 8001, 8002, 8443, 8444 are available.

### Tests fail with timeout
Make sure Kong Gateway is fully started before running tests:
```bash
docker-compose logs kong-cp
```

### Database connection fails
Check PostgreSQL container status:
```bash
docker-compose ps
docker-compose logs kong-ee-database
```

## Contributing

1. Create a branch for your changes
2. Write tests for new features
3. Run `npm test` to verify all tests pass
4. Format code with Prettier
5. Create a pull request

## License

Private
