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
