import { GatewayServices } from "../fixtures/gateway-services";
import { General } from "../fixtures/general";

describe("Create a new Service", (): void => {
  it("Navigate back to Overview page when you click the Cancel button", (): void => {
    cy.visit(`/default/overview`);
    cy.get(GatewayServices.ADD_GATEWAY_SERVICE_BTN)
      .contains("Add a Gateway Service")
      .click();
    cy.get(GatewayServices.CANCEL_BTN).click();
    cy.url().should("include", "/overview");
    cy.get(GatewayServices.GATEWAY_SERVICES_PAGE_TITLE).contains("Overview");
  });

  it("Navigate back to Gateway Services page when you click the Cancel button", (): void => {
    cy.visit(`default/services`);
    cy.get(GatewayServices.NEW_GATEWAY_SERVICE_BTN1)
      .contains("New gateway service")
      .click();
    cy.get(GatewayServices.CANCEL_BTN).click();
    cy.url().should("include", "/services");
    cy.get(GatewayServices.GATEWAY_SERVICES_PAGE_TITLE).contains(
      "Gateway Services",
    );
  });

  it("Create a new Service in the Overview page", (): void => {
    cy.visit(`/default/overview`);
    // Checks the loading screen isn't visible
    cy.get(General.LOADING_PAGE).should("not.exist");

    cy.get(GatewayServices.ADD_GATEWAY_SERVICE_BTN)
      .contains("Add a Gateway Service")
      .click();

    // Create the service with the basic configuration
    cy.get(GatewayServices.SUBMIT_BTN).should("be.disabled");
    cy.get(GatewayServices.BASIC_ROUTE_CONFIGURATION_RADIO_BTN).should(
      "have.checked",
    );

    // Fill the form with the url e and the name
    cy.get(GatewayServices.SERVICE_URL).should("have.attr", "required");
    cy.get(GatewayServices.SERVICE_URL)
      .type("http://httpbin.konghq.com")
      .should("have.attr", "value", "http://httpbin.konghq.com");

    // "View advanced fields" section
    cy.get(GatewayServices.VIEW_ADVANCED_FIELDS_BTN).should(
      "have.attr",
      "aria-expanded",
      "false",
    );
    cy.get(GatewayServices.VIEW_ADVANCED_FIELDS_BTN).click();
    cy.get(GatewayServices.VIEW_ADVANCED_FIELDS_BTN).should(
      "have.attr",
      "aria-expanded",
      "true",
    );
    cy.get(GatewayServices.RETRIES_INPUT).should("have.value", "5");
    cy.get(GatewayServices.CONNECTION_TIMEOUT_INPUT).should(
      "have.value",
      "60000",
    );
    cy.get(GatewayServices.WRITE_TIMEOUT_INPUT).should("have.value", "60000");
    cy.get(GatewayServices.READ_TIMEOUT_INPUT).should("have.value", "60000");
    cy.get(GatewayServices.CLIENT_CERTIFICATE_INPUT).should("have.value", "");
    cy.get(GatewayServices.CA_CERTIFICATE_INPUT).should("have.value", "");
    cy.get(GatewayServices.TLS_VERIFY_CHECKBOX)
      .should("not.be.checked")
      .click()
      .should("be.checked");
    cy.get(GatewayServices.TLS_VERIFY_RADIO_FALSE).should("be.checked");

    // "Add tags" section
    cy.get(GatewayServices.ADD_TAGS_BTN).should(
      "have.attr",
      "aria-expanded",
      "false",
    );
    cy.get(GatewayServices.ADD_TAGS_BTN).click();
    cy.get(GatewayServices.ADD_TAGS_BTN).should(
      "have.attr",
      "aria-expanded",
      "true",
    );
    cy.get(GatewayServices.TAGS_INPUT)
      .type("tag1,tag2")
      .should("have.value", "tag1,tag2");

    cy.get(GatewayServices.SERVICE_FORM_NAME)
      .should("have.attr", "value")
      .should("not.be.empty");
    cy.get(GatewayServices.SERVICE_FORM_NAME)
      .clear()
      .type("New-Service")
      .should("have.value", "New-Service");

    // Submit the form and the success message is visible
    cy.get(GatewayServices.SUBMIT_BTN).click();
    cy.get(General.SUCCESS_TOASTBAR)
      .contains('Gateway Service "New-Service" successfully created!')
      .should("be.visible");
  });

  it("Create a new Service with an invalid full url", (): void => {
    cy.visit(`default/services`);
    cy.get(GatewayServices.NEW_GATEWAY_SERVICE_BTN2)
      .contains("New gateway service")
      .click();
    // Fill the form with the url e and the name
    cy.get(GatewayServices.SERVICE_URL).type("TEST");
    cy.get(GatewayServices.SERVICE_URL)
      .parent(".input-element-wrapper")
      .siblings("p")
      .contains(
        "The URL must follow a valid format. Example: https://api.kong-air.com/flights",
      );
    cy.get(GatewayServices.SUBMIT_BTN).should("be.disabled");
  });
});

describe("View of the Gateway Services Page", (): void => {
  // TODO: Delete a service in the Gateway Services page
  it("Delete a Service", (): void => {
    cy.visit(`default/services`);

    // Delete the service
  });
});

describe("View of the Service Details Page", (): void => {
  it("Delete a Service", (): void => {
    const serviceName: string = "Service" + Math.random();
    cy.createService(serviceName, "http://httpbin.konghq.com").then(
      (service) => {
        cy.visit(`default/services/${service.id}`);
      },
    );

    // Delete the service
    cy.get(GatewayServices.GATEWAY_SERVICE_ACTIONS_BTN).click();
    cy.get(GatewayServices.DELETE_BTN).find("span").contains("Delete").click();
    cy.get(GatewayServices.DELETE_MODAL_INPUT).type(serviceName);
    cy.get(GatewayServices.DELETE_MODAL_BTN).contains("Yes, delete").click();

    // Success message is visible
    cy.get(General.SUCCESS_TOASTBAR)
      .contains(`Gateway Service "${serviceName}" successfully deleted!`)
      .should("be.visible");

    // TODO: check that the service is not in the Gateway Services page
  });
});
