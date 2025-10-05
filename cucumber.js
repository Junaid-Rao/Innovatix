module.exports = {
  default: {
    require: ['step-definitions/**/*.js'],
    format: [
      'json:reports/cucumber_report.json',
      'html:reports/cucumber-report.html'
    ],
    formatOptions: {
      snippetInterface: 'async-await',
      theme: 'bootstrap',
      metadata: {
        'App Name': 'Innovatix Assignment',
        'Test Environment': 'SauceDemo & Reqres API',
        'Platform': 'Windows 10',
        'Executed': new Date().toLocaleString()
      }
    },
    timeout: 120000,
    publishQuiet: true,
    forceExit: true
  }
};
