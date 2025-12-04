import { GetawayServices } from "../fixtures/2-getaway-services";

describe("Creation of a new Service", (): void => {
  it("Create a new Service", (): void => {
    // You can create a new Service
    cy.get(GetawayServices.ADD_GETAWAY_SERVICE_BTN)
      .contains("Add a Gateway Service")
      .click();

    // It checks the input has the attribute checked
    cy.get(GetawayServices.BASIC_ROUTE_CONFIGURATION_RADIO_BTN).should(
      "have.attr",
      "checked",
    );

    // It fills the form with the url e and the name
    cy.get(GetawayServices.SERVICE_URL).type("http://httpbin.konghq.com");
    cy.get(GetawayServices.SERVICE_NAME).clear().type("New-Service");

    // It submits the form and the success message is visible
    cy.get(GetawayServices.SUBMIT_BUTTON).click();
    cy.get(GetawayServices.SUCCESS_TOASTBAR)
      .contains('Gateway Service "New-Service" successfully created!')
      .should("be.visible");
    cy.on("windows:alert", (message) => {
      expect(message).to.equal(
        `Service successfully created with ID ${GetawayServices.SERVICE_ID}`,
      );
    });
  });
});
