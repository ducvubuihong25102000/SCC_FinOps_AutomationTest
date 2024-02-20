const defaultTimeoutInterval = process.env.DEBUG ? (60 * 60 * 500) : 900000;
var fs = require("fs");
var utl = require('../../utilities/common-utilities');
const merge = require('deepmerge')
const wdioConf = require('./suite.cucumber.conf')

const execFile = require('child_process').execFile;
//exports.config = merge(wdioConf.config, {


exports.config = {
  specs: [

    // 1.Manager Requests Creation of New Job – Supplied Details – job spec and Title 
    // 1.Test scenario for Job
    './test/features/Job.feature',
    
    // 2.Test Scenario for Positions  
    './test/features/Position_LMSSubmitANewPosition.feature',
    './test/features/Position_ULMSApprovesARequestPosition.feature',
    './test/features/Position_HRCreateANewPosition.feature',
    './test/features/Position_LMSCreateAndEditAPosiition.feature',

    // 3.Test scenario For Recruitment
    // 3.1 Recruitment Scenario 1-normal WF
    './test/features/recruitment.feature',
    './test/features/recruitment_MssApproved.feature',
       // hr change salary 
    './test/features/recruitment_HrChangeJobOffer.feature',
       // m1 approve delegate 
    './test/features/recruitment_M1ApprovedDelegate.feature',
    './test/features/recruitment_MssApprovedChange.feature',
    './test/features/recruitment_LineMssApproved.feature',
    './test/features/recruitment_HrApproved.feature',
    // 3.2 Recruitment Scenario 2 -Apply a position from ESS
    './test/features/recruitment_EssApplyJob.feature',
    './test/features/recruitment_HrApproveApplyJob.feature',

    // //   //4.Test sceanrio for New Starter
    './test/features/NewStarter.feature',
    './test/features/NewStarter_UpdatePendingWorkers.feature',

    //   //5. ESS
    // 5.1 ESS request new leave, mss approve, reject and reverse for annual leave and  non- annual leave
    './test/features/ESS_RequestLeave.feature',
    './test/features/MSS_ApproveLeave.feature',
    './test/features/ESS_ViewStatusAndReverse.feature',
    './test/features/MSS_ApproveReverseLeave.feature',
    // 5.2 Leave Different Legal Entity for both annual and non-annual leave
    './test/features/ESS_LeaveDifferentLegalEntity.feature',
    './test/features/MSS_ApproveDifferentLegalEntity.feature',
    // 5.4  ESS add,edit,delete PersonalDetails
    './test/features/ess_PersonalDetails.feature',

    //6.MSS
        //6.1 Configure deleligation -LM-> LM1
    './test/features/MSS_DelegationAndSubmitForEmployee.feature',
    './test/features/MSS_MSSApproveRequestCount.feature',
    './test/features/MSS_checkTotalSkill.feature',

    //11.Time & Attendance
    './test/features/t&a_HrRequestLeave.feature',
    './test/features/t&a_MssApproveRequestLeave.feature',

    // //   //7. variation
    // //     //7.1 VAR for MSS
    // './test/features/Variation_MSSRequestaVariation.feature',
    // './test/features/Variation_ULMApproveVariation.feature',
    // './test/features/Variation_hrmApproveVariation.feature',

    // './test/features/HRAsistant_mssRequest.feature',
    // './test/features/HRAssitant_EditEmployee.feature',
    // './test/features/HRAsistant_HrCloseRequestWasAssigned.feature',
    // './test/features/hrAssistant_TerminationNonWF.feature',

    // //9. Termination
    //9.1 MSS request termination with workflow
    // './test/features/termination_MssRequest.feature',
    // './test/features/termination_HrApprove.feature',
    // './test/features/termination_MssEditRequest.feature',
    // './test/features/termination_HrAproveEdit.feature',
    // //10. Probation
    // 'test/features/Probation_mssRequestProbation.feature',
    // './test/features/Probation_EnterProbationResultandUpdateProOutcome.feature',
    // './test/features/Probation_EnsureESSdisplayedInPrWeeksandMSSCanViewedRecordFromMyTeam.feature',

  // './test/features/Course_Scenario1_WithCMRole.feature',
  // './test/features/Course_Scenario1_WithESSRole.feature',
  // './test/features/Course_Scenario2_TMSRole.feature'
  // './test/features/MSS_essRequestLeaveForCheckWFDelegation.feature',


  ],

  featureFlags: {
    specFiltering: true
  },
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
  // baseUrl: 'https://abc.net',
  // baseUrl: 'https://abc.net',
  waitforTimeout: 30000,            // Default timeout for all waitFor* commands.
  connectionRetryTimeout: 30000,    // Default timeout in milliseconds for request  if Selenium Grid doesn't send response
  connectionRetryCount: 3,          // Default request retries count

  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  //
  reporters: [
    'spec', 'dot',
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
    console.log("Param for environment:" + process.argv[1]);
    console.log("Param for environment:" + process.argv[2]);
    console.log("Param for environment:" + process.argv[3]);
    console.log("Param for environment:" + process.argv[4]);
    // check environment and set correct one in  var env = process.argv[?????];
    var env = process.argv[3];

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
    // browser.ignoreZoomSetting
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

  // ==================================
  // Where should your test be launched
  // ==================================
  //
  // runner: 'local',
  // hostname: 'localhost',
  // port: 4444,
  // path: '/wd/hub',

  // ======================
  // Services Configuration
  // ======================
  // Use service selenium-standalone if running scripts locally
  services: ['selenium-standalone'],
  seleniumInstallArgs: {
    // proxy: "http://proxy.cmltd.net.com:8080"
  },

  //
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude options in
  // order to group specific specs to a specific capability.
  //
  // First, you can define how many instances should be started at the same time. Let's
  // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
  // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
  // files and you set maxInstances to 10, all spec files will get tested at the same time
  // and 30 processes will get spawned. The property handles how many capabilities
  // from the same test should run tests.
  //
  maxInstances: 2,
  //
  // If you have trouble getting all important capabilities together, check out the
  // Sauce Labs platform configurator - a great tool to configure your capabilities:
  // https://docs.saucelabs.com/reference/platforms-configurator
  //
  capabilities: [
    {
      maxInstances: 1,
      browserName: 'chrome',
      'goog:chromeOptions': {
        // WebUI.executeJavaScript("document.body.style.zoom='60%'", null),
        // extensions: [Buffer(extensionChrome, 'binary').toString('base64')],
        args: [
          'incognito',
          // 'Zoom 50%',
          '--force-device-scale-factor=0.8',
          '--disable-infobars',
          '--start-maximized',
          // '--load-extension=E:/ThanhND/d365_auto_test-master/test/extension', 
          "--disable-gpu",
          // "document.body.style.transform='scale(0.5)'"
        ],
      }
    },
  ],
};