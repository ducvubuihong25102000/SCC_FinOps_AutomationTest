const Page = require('./page.js');

// Library import
const chai = require('chai');

//Page Objects
const pageHRHomePage = require('../page-objects/HRHomepage.page.js');
const pageLogin = require('../page-objects/login.page.js');

//Data Model

// Global constants
const {
  KEY_ENTER,
  KEY_ARROW_DOWN,
  KEY_ALT,
  KEY_TAB,
  POSITION_ASSIGMENTS,
  WORKERS,
} = require('../constant/global.const.js');
const { browser } = require('@wdio/globals');

class PositionAssignment extends Page {
  /******************* POSITION ASSIGNMENTS PAGE ELEMENT LOCATOR ***********************/
  /*************************** GENERAL FUNCTIONAL FOR PAGE *************************/
}

module.exports = new PositionAssignment();
