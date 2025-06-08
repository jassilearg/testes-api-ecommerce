const { defineConfig } = require("cypress")

module.exports = defineConfig({
  env: {
    API_URL: "http://localhost:3000"
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/jsons",
    overwrite: false,
    json: true,
    html: false
  },
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}"
  }
})
