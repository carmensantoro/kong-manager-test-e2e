import { SummaryTypes } from "../support/types";
import { Overview } from "../fixtures/overview";
import { General } from "../fixtures/general";

describe(`Kong Manager UI Test on desktop`, (): void => {
  beforeEach(() => {
    cy.cleanUpSummary(SummaryTypes.ALL);
    cy.visit(`/default/overview`);
  });

  it("Check service and route count are 0 by default in Overview page", () => {
    // It checks the loading screen is visible at first
    cy.get(General.LOADING_PAGE).should("be.visible");
    cy.get(General.LOADING_PAGE).should("not.exist");

    cy.get(Overview.OVERVIEW_PAGE_TITLE).should("have.text", "Overview");
    cy.get(Overview.OVERVIEW_SERVICES_COUNT).should("have.text", "0");
    cy.get(Overview.OVERVIEW_ROUTES_COUNT).should("have.text", "0");
    cy.get(Overview.OVERVIEW_CONSUMERS_COUNT).should("have.text", "0");
    cy.get(Overview.OVERVIEW_PLUGINS_COUNT).should("have.text", "0");
  });
});
