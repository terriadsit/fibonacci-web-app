const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'jdy4pu',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
    baseUrl: 'http://localhost:8000',
    env: {
      
      
    }
  },
});
