/// <reference types="cypress" />
import { CypressResponse, CypressSingleResponse, SummaryTypes } from "./types";
import { getAdminApiUrl } from "./utils";
import { General } from "../fixtures/general";

declare global {
  namespace Cypress {
    interface Chainable {
      cleanUpSummary(type: SummaryTypes): void;
      createService(
        url: string,
        serviceName?: string,
      ): Chainable<{ id: string; name: string }>;
      toastbarMessage(message: string, isVisible: boolean): void;
    }
  }
}

/**
 * Clean-up summary data via kong admin api
 * @param type can be the single type (service, route, consumers, plugins) or all the types you want to clean up
 * @returns void
 */
Cypress.Commands.add("cleanUpSummary", (type: SummaryTypes): void => {
  // TODO: add consumers and plugins to clean up everything
  if (type === SummaryTypes.ROUTE || type === SummaryTypes.ALL) {
    cy.request<CypressResponse<{ id: string }>>(
      "GET",
      `${getAdminApiUrl()}/routes`,
    ).then((response) => {
      if (response.body?.data) {
        response.body.data.forEach(({ id }) => {
          cy.request("DELETE", `${getAdminApiUrl()}/routes/${id}`);
        });
      }
    });
  }

  if (type === SummaryTypes.SERVICE || type === SummaryTypes.ALL) {
    cy.request<CypressResponse<{ name: string }>>(
      "GET",
      `${getAdminApiUrl()}/services`,
    ).then((response) => {
      if (response.body?.data) {
        response.body.data.forEach(({ name }) => {
          cy.request("DELETE", `${getAdminApiUrl()}/services/${name}`);
        });
      }
    });
  }
});

/**
 * Create a service via kong admin api
 * @param url the url of the service to create
 * @param serviceName optional, it's the name of the service to create,
 * if not provided a random name will be generated
 * @returns a promise with the service response body
 */
Cypress.Commands.add(
  "createService",
  (
    url: string,
    serviceName?: string,
  ): Cypress.Chainable<{ id: string; name: string }> => {
    let customServiceName = !serviceName
      ? "Service" + Math.random()
      : serviceName;
    return cy
      .request<CypressSingleResponse<{ id: string; name: string }>>(
        "POST",
        `${getAdminApiUrl()}/services`,
        {
          name: customServiceName,
          url: url,
        },
      )
      .then((response) => {
        expect(response.status).to.eq(201);
        return response.body;
      });
  },
);

Cypress.Commands.add(
  "toastbarMessage",
  (message: string, isVisible: boolean): void => {
    // TODO: You can add a condition to cover all the different toastbar messages
    let isVisibleValue = isVisible ? "be.visible" : "be.not.visible";
    // Success message is visible when you delete or create a service/route
    cy.get(General.SUCCESS_TOASTBAR).contains(message).should(isVisibleValue);
  },
);

/**
 * Manage uncaught exceptions that occur during test execution
 * The handler receives the error object and returns a boolean:
 * - False - Tells Cypress to ignore the error and continue the test
 * - True - Tells Cypress to fail the test
 * @return boolean
 */
Cypress.on("uncaught:exception", (err: Error): boolean => {
  // Ignore specific known errors from Kong Manager
  if (err.message.includes("Script error")) {
    return false;
  }
  // Let other errors fail the test
  return true;
});
