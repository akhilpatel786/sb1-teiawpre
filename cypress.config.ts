import { defineConfig } from "cypress";
import allureWriter from '@shelex/cypress-allure-plugin/writer';

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: false,
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    video: true,
    screenshotOnRunFailure: true,
    reporter: "junit",
    reporterOptions: {
      mochaFile: "cypress/results/results-[hash].xml",
      toConsole: true,
    },
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    }
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
