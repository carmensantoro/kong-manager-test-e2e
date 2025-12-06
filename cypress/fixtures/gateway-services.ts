export const GatewayServices = {
  // Gateway Services Page
  GATEWAY_SERVICES_PAGE_TITLE: "h3 span[class='title']",
  ADD_GATEWAY_SERVICE_BTN: "[data-testid='action-button']",
  // Button visible only when there are NO Gateway Services
  NEW_GATEWAY_SERVICE_BTN1: "[data-testid='empty-state-action']",
  // Button visible only when there are Gateway Services
  NEW_GATEWAY_SERVICE_BTN2: "[data-testid='toolbar-add-gateway-service']",

  // New Gateway Service Form
  BASIC_ROUTE_CONFIGURATION_RADIO_BTN:
    "[data-testid='gateway-service-url-radio']",
  SERVICE_URL: "[data-testid='gateway-service-url-input']",
  SERVICE_FORM_NAME: "[data-testid='gateway-service-name-input']",
  // "View advanced fields" section
  VIEW_ADVANCED_FIELDS_BTN: "[data-testid='advanced-fields-collapse'] button",
  RETRIES_INPUT: "[data-testid='gateway-service-retries-input']",
  CONNECTION_TIMEOUT_INPUT: "[data-testid='gateway-service-connTimeout-input']",
  WRITE_TIMEOUT_INPUT: "[data-testid='gateway-service-writeTimeout-input']",
  READ_TIMEOUT_INPUT: "[data-testid='gateway-service-readTimeout-input']",
  CLIENT_CERTIFICATE_INPUT: "[data-testid='gateway-service-clientCert-input']",
  CA_CERTIFICATE_INPUT: "[data-testid='gateway-service-ca-certs-input']",
  TLS_VERIFY_CHECKBOX: "[data-testid='gateway-service-tls-verify-checkbox']",
  TLS_VERIFY_RADIO_FALSE:
    "[data-testid='gateway-service-tls-verify-false-option']",
  // "Add tags" section
  ADD_TAGS_BTN: "[data-testid='tags-collapse'] button",
  TAGS_INPUT: "[data-testid='gateway-service-tags-input']",
  // Buttons
  SUBMIT_BTN: "[data-testid='service-create-form-submit']",
  CANCEL_BTN: "[data-testid='service-create-form-cancel']",

  // Service Details Page
  SERVICE_DETAILS_ID: "[data-testid='id-property-value']",
  SERVICE_DETAILS_NAME: "[data-testid='name-plain-text']",
  GATEWAY_SERVICE_ACTIONS_BTN: "[data-testid='header-actions']",
  DELETE_BTN: "[data-testid='entity-button']",

  // Delete a Gateway Service Modal
  CONFIRMATION_TEXT: "span[class='confirmation-text']",
  DELETE_MODAL_INPUT: "[data-testid='confirmation-input']",
  DELETE_MODAL_BTN: "[data-testid='modal-action-button']",
};
