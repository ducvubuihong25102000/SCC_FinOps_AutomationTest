const defaultTimeoutInterval = process.env.DEBUG ? (60 * 60 * 500) : 90000;
const merge = require('deepmerge')
const wdioConf = require('./suite.cucumber.conf')

exports.config = merge(wdioConf.config, {

    // ======================
    // Services Configuration
    // ======================
    // Use service selenium-standalone if running scripts locally
    services: ['browserstack'],
    user: 'thuannguyen19',
    key: 'LdPjXiqCC9HkrJDUWQpa',
    browserstackLocal: true,
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

    capabilities: [
      /** 
       * Window 10
       **/
      {
          os: 'Windows',
          os_version: '10',
          browserName: 'Chrome',
          browser_version: '77.0',
          resolution: '1024x768',
          name: 'Windows - Chrome 77.0'
      },

      {
        os: 'Windows',
        os_version: '10',
        browserName: 'Firefox',
        browser_version: '71.0',
        resolution: '1024x768',
        name: 'Windows - FF 71.0'
    },

    /** 
     * macOS 10.14
     **/

    //   {
    //       os: 'OS X',
    //       os_version: 'Mojave',
    //       browserName: 'Safari',
    //       browser_version: '12.0',
    //       resolution: '1024x768',
    //       name: 'Mac OSX - Safari 12'
    //   },

      // {
      //     device: 'iPhone X',
      //     os_version: '11',
      //     browserName: 'iPhone X',
      //     real_mobile: 'true',
      //     name: 'iPhone X'
      // },

      // {
      //     device: 'Samsung Galaxy S10',
      //     os_version: '9.0',
      //     browserName: 'Samsung Galaxy S10',
      //     real_mobile: 'true',
      //     name: 'Samsung Galaxy S10'
      // },
    ],
});