const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "2chb5z",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "baseUrl": 'https://pushing-front.vercel.app/',
    watchForFileChanges: false,
  },
  env: {
    username: 'pushingit',
    password: '123456!',
  },
});
