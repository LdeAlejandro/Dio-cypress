const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://restful-booker.herokuapp.com/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env:{
      requestMode: true,
      auth_url: '/auth',
      bookings_url: '/booking',
      username: 'admin',
      password: 'password123'
    }
  },
});
