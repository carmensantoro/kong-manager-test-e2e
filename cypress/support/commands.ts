/// <reference types="cypress" />
import { SummaryTypes } from "./types";

declare global {
  namespace Cypress {
    interface Chainable {
      cleanUpSummary(type: SummaryTypes): void;
    }
  }
}

const ADMIN_API = () => Cypress.env("ADMIN_API_URL") || "http://localhost:8001";

/**
 * Clean-up summary data via kong admin api
 * @param type can be the single type (service, route, consumers, plugins) or all the types you want to clean up
 * @returns void
 */
Cypress.Commands.add("cleanUpSummary", (type: SummaryTypes): void => {
  // TODO: add consumers and plugins to clean up everything
  if (type === SummaryTypes.SERVICE || type === SummaryTypes.ALL) {
    cy.request("GET", `${ADMIN_API()}/services`).then((response) => {
      if (response.body?.data && Array.isArray(response.body.data)) {
        response.body.data.forEach((service: { name: any }) => {
          cy.request("DELETE", `${ADMIN_API()}/services/${service.name}`);
        });
      }
    });
  }

  if (type === SummaryTypes.ROUTE || type === SummaryTypes.ALL) {
    cy.request("GET", `${ADMIN_API()}/routes`).then((response) => {
      if (response.body?.data && Array.isArray(response.body.data)) {
        response.body.data.forEach((route: { id: any }) => {
          cy.request("DELETE", `${ADMIN_API()}/routes/${route.id}`);
        });
      }
    });
  }
});
