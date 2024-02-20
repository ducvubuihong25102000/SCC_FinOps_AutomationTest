const defaultTimeoutInterval = process.env.DEBUG ? (60 * 60 * 500) : 90000;
var fs = require("fs");
var utl = require('../../utilities/common-utilities');

exports.config = {
  specs: [
    /*
    * Functional features (UI validation)
    */
    './test/features/loginUser.feature',
    //'./test/features/home.feature',

  ],
  // npx wdio run ./test/config/suite.cucumber.saucelabs.conf.js ./test/config/suite.cucumber.saucelabs.conf.js "test"
  // "test-sauce": "node_modules/.bin/wdio ./test/config/suite.cucumber.saucelabs.conf.js",
  // "test-sauce": "C:/Program%20Files/nodejs/node_modules/npm/node_modules/.bin/wdio ./test/config/suite.cucumber.saucelabs.conf.js",
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],
  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // By default WebdriverIO commands are executed in a synchronous way using
  // the wdio-sync package. If you still want to run your tests in an async way
  // e.g. using promises you can set the sync option to false.
  sync: true,
  logLevel: 'trace',     // Level of logging verbosity: silent | trace | command | data | result | error
  coloredLogs: true,      // Enables colors for log output.
  screenshotPath: './test-report/errorShots/',   // Saves a screenshot to a given path if a command fails.
  //
  // Set a base URL in order to shorten url command calls. If your url parameter starts
  // with "/", then the base url gets prepended.
  // baseUrl: 'https://p1.test..net',
  // baseUrl: 'https://test.net',
  waitforTimeout: 30000,            // Default timeout for all waitFor* commands.
  connectionRetryTimeout: 30000,    // Default timeout in milliseconds for request  if Selenium Grid doesn't send response
  connectionRetryCount: 3,          // Default request retries count

  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  //
  reporters: [
    'spec',
    ['junit', {
      outputDir: './test-report/junit-results/',
      outputFileFormat: function (opts) { // optional
        return `results-${opts.cid}.${opts.capabilities}.xml`
      }
    }
    ],

    ['allure', {
      outputDir: './test-report/allure-results/',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false,
      useCucumberStepReporter: true,
    }
    ],
  ],

  framework: 'cucumber',

  // If you are using Cucumber you need to specify the location of your step definitions.
  cucumberOpts: {
    requireModule: ['@babel/register'],
    require: ['./test/step_definitions/*.js'],
    backtrace: true,    // <boolean> show full backtrace for errors
    //compiler: ['js:babel-core/register'], // <string[]> filetype:compiler used for processing required features
    compiler: [], // <string[]> filetype:compiler used for processing required features
    failAmbiguousDefinitions: true,       // <boolean< Treat ambiguous definitions as errors
    dryRun: false,      // <boolean> invoke formatters without executing steps
    failFast: false,    // <boolean> abort the run on first failure
    ignoreUndefinedDefinitions: false,    // <boolean> Enable this config to treat undefined definitions as warnings
    name: [],           // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    snippets: true,     // <boolean> hide step definition snippets for pending steps
    format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
    colors: true,       // <boolean> disable colors in formatter output
    snippets: false,    // <boolean> hide step definition snippets for pending steps
    source: false,      // <boolean> hide source uris
    profile: [],        // <string[]> (name) specify the profile to use
    strict: true,       // <boolean> fail if there are any undefined or pending steps
    tagExpression: 'not @Pending',      // <string> (expression) only execute the features or scenarios with tags matching the expression, see https://docs.cucumber.io/tag-expressions/
    timeout: defaultTimeoutInterval,    // <number> timeout for step definitions
    tagsInTitle: false,                 // <boolean> add cucumber tags to feature or scenario name
    snippetSyntax: undefined,           // <string> specify a custom snippet syntax
  },

  //
  // =====
  // Hooks
  // =====
  // WedriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  //
  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  beforeSession: function (config, capabilities, specs) {
    // console.log(process.env.HTTP_PROXY);

    // Get parameter from command line
    console.log(process.argv[1]);
    console.log(process.argv[2]);
    console.log(process.argv[3]);
    console.log(process.argv[4]);
    var env = process.argv[3];production

    // Get content from file
    var contents = fs.readFileSync("test/config/config.json");
    // Define to JSON type
    var jsonContent = JSON.parse(contents);
    // Get Value from JSON
    if (env == "staging") {
      global.baseUrl = jsonContent.staging.baseUrl;
    } else if (env == "production") {
      global.baseUrl = jsonContent.production.baseUrl;
    } else {
      // Default env is test
      global.baseUrl = jsonContent.test.baseUrl;
    }

    console.log("Base URL: " + global.baseUrl);
    // const fs = require("fs");

    //   if (!fs.existsSync(dirErrorShots)) {
    //     fs.mkdirSync(dirErrorShots);
    //   }
  },

  // Gets executed before test execution begins. At this point you can access all global
  // variables, such as `browser`. It is the perfect place to define custom commands.
  before: function () {
    /**
     * Setup the Chai assertion framework
     */
    const chai = require('chai');
    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should();
    browser.maximizeWindow();

    // clicks on element using JavaScript
    browser.addCommand("jsClick", function () {
      browser.execute(function (element) {
        element.click();
      }, this);
    },
      true,
    );
  },
  //
  // after: function (capabilities, specs) {
  //   //do your stuff
  // },
  //
  // beforeStep: function (stepResult) {
  //     //do your stuff
  // },
  //

  /**
   * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
   * @param {Object} test test details
   */
  afterStep: function (uri, feature, { error }) {
    if (error !== undefined) {
      browser.takeScreenshot();
    }
  },
  //
  //
  // beforeFeature: function (feature) {
  //     //do your stuff
  // },
  //
  // afterFeature: function (feature) {
  //     //do your stuff
  // },
  //
  // beforeScenario: function (scenario) {
  //     //do your stuff
  // },
  // afterScenario: function (scenarioResult) {
  //     //do your stuff
  // },

  // afterScenario: function(scenario, result) {
  //   console.log("AFTER scenario: " + scenario.name);
  //   if (result.status != "passing") { 
  //     browser.takeScreenshot();
  //   }

  // },
};