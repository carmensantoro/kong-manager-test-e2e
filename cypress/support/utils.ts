export const getAdminApiUrl = (): string =>
  Cypress.env("ADMIN_API_URL") || "http://localhost:8001";
