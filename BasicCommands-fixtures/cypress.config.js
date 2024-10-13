const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://restful-booker.herokuapp.com/",
    requestTimeout: 6000,
    responseTimeout: 6000,
    video: true, // Enable video recording for the entire test suite

    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'Conduit-automation-tests',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },

    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },

    env: {
      requestMode: true,
      hideCredentials: true,
      auth_url: '/auth',
      bookings_url: '/booking',
      username: 'admin',
      password: 'password123',
      Authorization: 'Basic YWRtaW46cGFzc3dvcmQxMjM=',
    },
  },
});
