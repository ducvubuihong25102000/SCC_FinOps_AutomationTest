const { browser, driver, $ } = require('@wdio/globals');

//Import Library
const Page = require('./page.js');
const moment = require('moment');

//Page Objects
const { openLink } = require('../page-objects/login.page.js');
const {
  PressKey,
  WaitForSecond,
  WaitForComplete,
} = require('../page-objects/login.page.js');

//Global constansts
const {
  KEY_ENTER,
  KEY_TAB,
  KEY_DELETE,
  KEY_ALT,
  KEY_CTRL,
  KEY_SHIFT,
  KEY_HOME,
  WORKERS,
} = require('../constant/global.const.js');
const FinopsHomepagePage = require('./FinopsHomepage.page.js');

//Date time format
const currentDate = new Date();
const myDate = moment(currentDate).format('YYYYMMDD');

class Workers extends Page {
  get nav_SearchBox() {
    return $(`//input[@id="NavigationSearchBox_searchBoxInput_input"]`);
  }

  /**********************************FUNTIONAL FOR INVOICE JOURNAL CREATED*****************************/
}
module.exports = new Workers();
