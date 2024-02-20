const Page = require('../../../services/page_service.js');

// Libraries
const chai = require('chai');
const moment = require('moment');

import { KEY_ENTER } from '../../../constants/global.constant';
// Page objects

//PAGE elements locator
import * as locProHome from '../element_locator/home/HomePage.locator';

class SCCProjOpsJournal extends Page {
  async changearea() {
    var locsearch = $(`//input[@id='app-search-input']`);
    await this.WaitUntilTargetDisplayedOnView(locsearch);
    // await locsearch.click();
    // await locsearch.setValue('Project Operation');
    // await this.PressKey(KEY_ENTER);
    await this.WaitForSecond(60);
    await locProHome.ListView.loc_viewHome_btnChangeArea.click();
    await locProHome.ListView.loc_viewHome_ftabChangeArea_btnSales.click();
  }
}
module.exports = new SCCProjOpsJournal();
