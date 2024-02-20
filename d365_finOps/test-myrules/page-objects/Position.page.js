const Page = require('./page.js');

// Library import
const chai = require('chai');

//Page Objects
const pageHRHomePage = require('../page-objects/HRHomepage.page');
const pageLogin = require('../page-objects/login.page.js');

//Data Model

// Global constants
const {
  KEY_ENTER,
  KEY_ARROW_DOWN,
  KEY_ALT,
  KEY_TAB,
  POSITION_ASSIGMENTS,
  POSITION,
} = require('../constant/global.const.js');
const { browser } = require('@wdio/globals');

class Position extends Page {
  /******************* POSITION PAGE ELEMENT LOCATOR ***********************/
  //Element locator of Position Form Main
  get loc_fmMain_abtnChangesTimeLine() {
    return $(`//button[contains(@id, "_WorkerPositions")]`);
  }
  get loc_fmMain_abtnChangesTimeLine() {
    return $(
      `//button[starts-with(@id, "HcmPosition") and contains(@id, "_ChangesTimeline_button")]`
    );
  }
  get loc_fmMain_abtnChangesTimeLine_btnManageChanges() {
    return $(
      `//button[starts-with(@id, "hcmposition") and contains(@id, "_HcmPositionDateManager")]`
    );
  }
  //Element locator of Manage Changes page
  get loc_btnEdit() {
    return $(`//span[contains(@id, "_SystemDefinedViewEditButton_label")]`);
  }
  get loc_btnAdd() {
    return $(`//button[contains(@id, "NewHierarchyCommandButton")]`);
  }
  get loc_ftabPositionHierarchies() {
    return $(`//span[text()='Position hierarchies']`);
  }
  get loc_ftabPositionHierarchies_fmManageChanges_txtReportsToPosition() {
    return $(
      `//input[contains(@id, "0_HcmPositionHierarchy_ParentPosition_PositionId_input")]`
    );
  }
  get loc_ftabPositionHierarchies_fmManageChanges_() {
    return $(`//span[text()='Position hierarchies']`);
  }
  /*************************** GENERAL FUNCTIONAL FOR PAGE *************************/
}

module.exports = new Position();
