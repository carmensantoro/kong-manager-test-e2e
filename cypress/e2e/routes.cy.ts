import { General } from "../fixtures/general";
import { Routes } from "../fixtures/routes";

describe("Creation of a new Route", (): void => {
  it("Create a new Route", (): void => {
    cy.visit(`/default/routes`);
    // It checks the loading screen isn't visible
    cy.get(General.LOADING_PAGE).should("not.exist");

    // Create a new Route by clicking on the New route button
    cy.get(Routes.NEW_ROUTE_BTN).contains("New route").click();
    // Check the save button is disabled
    cy.get(Routes.SUBMIT_BTN).should("be.disabled");

    // Start to fill the form
    cy.get(Routes.ROUTE_NAME)
      .type("New-Route")
      .should("have.value", "New-Route");
    cy.get(Routes.SERVICE_LIST).click();
    cy.get(Routes.SERVICE_LIST_ITEM).click();
    cy.get(Routes.TAGS_INPUT)
      .type("tag1,tag2")
      .should("have.value", "tag1,tag2");
    cy.get(Routes.BASIC_ROUTE_CONFIGURATION_RADIO_BTN).should(
      "have.attr",
      "checked",
    );
    cy.get(Routes.PATHS_INPUT).should("have.value", "");
    cy.get(Routes.STRIP_PATH_CHECKBOX).should("attr", "disabled");
    cy.get(Routes.METHODS_INPUT).contains("Select methods").click();
    cy.get(Routes.METHODS_INPUT_GET).click();
    // Click outside the input to close the dropdown
    cy.get(Routes.METHODS_INPUT).click("topLeft");
    cy.get(Routes.HOST_INPUT).should("have.value", "");

    // Submit the form and the success message is visible
    cy.get(Routes.SUBMIT_BTN).click();
    cy.get(General.SUCCESS_TOASTBAR)
      .contains('Route "New-Route" successfully created!')
      .should("be.visible");
  });
});
