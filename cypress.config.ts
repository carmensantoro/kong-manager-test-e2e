import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8002",
    env: {
      ADMIN_API_URL: "http://localhost:8001",
    },
    // TODO: "Organize desktop, tablet and mobile tests. I set the viewport to 1280x720 for now."
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    reporter: "cypress-multi-reporters",
    reporterOptions: {
      configFile: "cypress_report_config.json",
    },
  },
});
