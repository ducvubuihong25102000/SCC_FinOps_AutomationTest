const { browser, driver, $ } = require('@wdio/globals');
const chai = require('chai');

const {
  KEY_F2,
  KEY_ENTER,
  KEY_TAB,
  KEY_DELETE,
  KEY_ALT,
  FIXED_ASSETS,
  KEY_ARROW_DOWN,
  KEY_CTRL,
  KEY_F5,
  KEY_SHIFT,
  KEY_ESC,
  ENQUIRIES_AND_REPORT,
} = require('../constants/global.constant.js');

const execFile = require('child_process').execFile;

const DATA_FD = require('../data/FinancialDimensions/master_fds.json');
const DATA_MA = require('../data/MainAccount/master_ma.json');

const MOMENT = require('moment');
const CUREENTDATE = new Date();
const TODAY = MOMENT(CUREENTDATE).format('YYYYMMDD');

class Page {
  //#region <Elements of general ↓↓↓>
  get loc_msgOperationCompleted() {
    return $(`//span[text()="Operation completed"]`);
  }
  get loc_notiMsgOperationCompleted() {
    return $(`//div[@class="notificationPopup-message"]`);
  }
  get loc_notiMsgProcessing() {
    return $(`//span[@id="titleField"]`);
  }
  get loc_notiBell() {
    return $(`//button[@id='dynNavigationBarMessages_buttonNotifications']`);
  }
  get elemNoti() {
    return $(`//span[text()="Operation completed"]`);
  }
  get elemBellNoti() {
    return $(`//div[text()="Operation completed"]`);
  }
  get notiBell() {
    return $(`//button[@id='dynNavigationBarMessages_buttonNotifications']`);
  }
  get loc_btnDelete() {
    return $(`//*[contains(@id,'SystemDefinedDeleteButton_label')]`);
  }
  get loc_promtDeleteConfirm_btnYes() {
    return $(`//*[contains(@id,'SysBoxForm') and contains(@id,'Yes_label')]`);
  }
  //#endregion

  async open(path) {
    browser.url(path);
  }

  async getCurrentURL() {
    return browser.getUrl();
  }

  async clickOnLinkText(linkText) {
    $('//a[contains(text(), "' + linkText + '")]').click();
  }

  async waitForPageTitleLoad(title) {
    browser.waitUntil(
      () => {
        return browser.getTitle() === title;
      },
      10000,
      'expected that page load with the right title: ' + title
    );
  }

  //Make target into screen view
  async ScrollToTarget(target) {
    await (await target).scrollIntoView({ behavior: 'smooth' });
  }

  async WaitUntilTargetDisplayedOnView(target) {
    await target.isDisplayedInViewport();
  }

  async WaitUntilTargetIsClickable(target) {
    await target.isClickable();
  }

  async WaitUntilTargetIsFocus(target) {
    await target.isFocused();
  }

  //How to send key or combine keyboard
  //Call press browser keys e.g. PressKey(KEY_ENTER) => press enter( key parameters is calling from global constants )
  async PressKey(key) {
    await browser.keys(key);
  }

  async PressMultipleKey(key1, key2) {
    await browser.keys([key1, key2]);
  }

  //Wait for how many seconds e.g. WaitForSecond(1) => 1 * 1000 milliseconds = 1 second to wait
  async WaitForSecond(seconds) {
    await browser.pause(seconds * 1000);
  }

  //Wait until page fully loaded
  async WaitForComplete() {
    await browser.waitUntil(
      () => browser.execute(() => document.readyState === 'complete'),
      {
        timeout: 60 * 1000, // 60 seconds
        timeoutMsg: 'Message on failure',
      }
    );
  }

  //Generate random numbers
  async generateNumber() {
    let guid = 'xx4xxxyxxx'.replace(/[xy]/g, function (c) {
      let r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    return guid;
  }

  //Generate ledger account
  async generateLedgerAccount() {
    /*TODO: 
     PRE-CONDITIONS: 
     - None
     FUNCTION: Generate random Ledger Account Dimension base on master_fds.js and master_ma.js
     NOTE: Data need to cross check before test on new environment
     AUTHOR:	Quoc Tran */
    /********************************************************************************************/
    var arrMA = [];
    var arrBA = [];
    var arrBC = [];
    var arrBG = [];
    var arrBU = [];
    var arrCC = [];
    var arrCU = [];
    var arrMF = [];

    for (var i in DATA_MA.MainAccount) arrMA.push(DATA_MA.MainAccount[i]);
    for (var i in DATA_FD.Branch) arrBA.push(DATA_FD.Branch[i]);
    for (var i in DATA_FD.BusinessComponent)
      arrBC.push(DATA_FD.BusinessComponent[i]);
    for (var i in DATA_FD.BusinessGroup) arrBG.push(DATA_FD.BusinessGroup[i]);
    for (var i in DATA_FD.BusinessUnit) arrBU.push(DATA_FD.BusinessUnit[i]);
    for (var i in DATA_FD.CostCentre) arrCC.push(DATA_FD.CostCentre[i]);
    for (var i in DATA_FD.Customer) arrCU.push(DATA_FD.Customer[i]);
    for (var i in DATA_FD.Manufacturer) arrMF.push(DATA_FD.Manufacturer[i]);

    //Ledger Account dimension format
    let fmLADIM = 'ma-ba-bc-bg-bu-cc-cu-mf';

    //Return a random number base on length of the array
    let resMA = Math.floor(Math.random() * arrMA.length);
    let resBA = Math.floor(Math.random() * arrBA.length);
    let resBC = Math.floor(Math.random() * arrBC.length);
    let resBG = Math.floor(Math.random() * arrBG.length);
    let resBU = Math.floor(Math.random() * arrBU.length);
    let resCC = Math.floor(Math.random() * arrCC.length);
    let resCU = Math.floor(Math.random() * arrCU.length);
    let resMF = Math.floor(Math.random() * arrMF.length);

    let matchLADIM = fmLADIM
      .replace(/ma/g, arrMA[resMA])
      .replace(/ba/g, arrBA[resBA])
      .replace(/bc/g, arrBC[resBC])
      .replace(/bg/g, arrBG[resBG])
      .replace(/bu/g, arrBU[resBU])
      .replace(/cc/g, arrCC[resCC])
      .replace(/cu/g, arrCU[resCU])
      .replace(/mf/g, arrMF[resMF]);

    return matchLADIM;
  }

  //Clear existing values by sending Crtl + A then Delete key
  async DataClearance() {
    await this.PressMultipleKey(KEY_CTRL, 'a');
    await this.PressKey(KEY_DELETE);
  }

  //Take screenshot and save it into desire path
  async SaveScreenShot(folderToSaveScreenShot, TCID, suffixOfScreenShot) {
    await browser.saveScreenshot(
      `./test-report/${folderToSaveScreenShot}/${TODAY}_${TCID}_${suffixOfScreenShot}.png`
    );
  }

  //Run AutoIt script with desire path
  async runAutoItScript(pathToScript, scriptName) {
    console.info(`\n> Started execution of ${scriptName} ...`);
    execFile(`${pathToScript}/${scriptName}`, (error, stdout, stderr) => {
      if (error) {
        throw error;
      } else {
        console.info(
          `\n> Finished execution of ${scriptName}! | Output: ${stdout}`
        );
      }
    });
    await this.WaitForSecond(30);
  }

  //If tab selected then not open that tab and vice versa
  async ifTabSelected(elem, target) {
    /*TODO:
     FUNCTION: If tab is not selected then reselect it
      @elem: provide aria-selected attribute to validate desire element is selected or not
      @target: provide clickable element without click interception
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    await this.WaitUntilTargetDisplayedOnView(elem);
    while ((await elem.getAttribute('aria-selected')) === 'false') {
      await target.click();
      await this.WaitUntilTargetIsFocus(target);
      if ((await elem.getAttribute('aria-selected')) === 'true') {
        break;
      }
    }
  }

  //If tab expanded then not open that tab and vice versa
  async ifTabExpanded(elembtn, elem) {
    await this.WaitUntilTargetDisplayedOnView(elembtn);
    if ((await elembtn.getAttribute('aria-expanded')) === 'false') {
      await (await elem).click();
      await this.WaitForComplete();
    }
  }

  async ifTargetChecked(elembtn, elem) {
    await this.WaitUntilTargetDisplayedOnView(elembtn);
    if ((await elembtn.getAttribute('aria-checked')) === 'false') {
      await (await elem).click();
      await this.WaitForComplete();
    }
  }

  async ifTargetIsUndefinedThenScrollToTarget(elem) {
    /*TODO: 
     PRE-CONDITIONS: 
     - None
     FUNCTION: If given target is not displayed on view port equal to undefined then scroll to given target
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    if ((await this.WaitUntilTargetDisplayedOnView(elem)) === undefined) {
      await this.ScrollToTarget(elem);
    }
  }

  //Wait until operation complete message or notification is displayed
  async waitUntilOperationComplete() {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     FUNCTION: 
     1. 
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    await this.loc_notiMsgProcessing.waitForExist({ reverse: true });
    if ((await this.elemNoti).isDisplayedInViewport() === 'true') {
      chai
        .expect(await this.elemNoti.getText())
        .to.be.equal('Operation completed');
    } else if ((await this.elemBellNoti).isDisplayedInViewport() === 'true') {
      chai
        .expect(await this.elemBellNoti.getText())
        .to.be.equal('Operation completed');
    }
  }

  async RefreshUntilTargetIsDisplayed(btnElem, clickableElem) {
    while ((await btnElem.isDisplayedInViewport()) === false) {
      await this.PressMultipleKey(KEY_SHIFT, KEY_F5);
      await this.WaitForSecond(3);
      await clickableElem.click();
      await this.WaitForSecond(3);
      if ((await btnElem.isDisplayedInViewport()) === true) {
        break;
      }
    }
  }

  async waitUntilMeetText(elem, expectText) {
    await browser.waitUntil(async function () {
      return (await elem.getText()) === expectText;
    });
  }

  //Wait until the page tile is meet
  async waitUntilMeetPageTitle(pageHeaderName) {
    await this.WaitForComplete();
    try {
      let loc_pageTitle = $(`//h1//span[text()="${pageHeaderName}"]`);
      let loc_fastTabTitle = $(`//div[text()="${pageHeaderName}"]`);
      if ((await loc_pageTitle).isDisplayedInViewport() === 'true') {
        await loc_pageTitle.waitUntil(
          async function () {
            let strPageTitle = await this.getText();
            return (
              (await strPageTitle.toLowerCase()) ===
              `${pageHeaderName.toLowerCase()}`
            );
          },
          { timeout: 50000, timeoutMsg: `${pageHeaderName} page is not loaded` }
        );
      } else if ((await loc_fastTabTitle).isDisplayedInViewport() === 'true') {
        await loc_fastTabTitle.waitUntil(
          async function () {
            let strfastTabTitle = await this.getText();
            return (
              (await strfastTabTitle.toLowerCase()) ===
              `${pageHeaderName.toLowerCase()}`
            );
          },
          { timeout: 50000, timeoutMsg: `${pageHeaderName} page is not loaded` }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async waitUntilMeetPageTitle_ForBankStatement(pageHeaderName) {
    await this.WaitForComplete();
    try {
      let loc_pageTitle = $(`//h1//span[text()="${pageHeaderName}"]`);
      let loc_fastTabTitle = $(`//div[text()="${pageHeaderName}"]`);
      if ((await loc_pageTitle).isDisplayedInViewport() === 'true') {
        await loc_pageTitle.waitUntil(
          async function () {
            let strPageTitle = await this.getText();
            return (
              (await strPageTitle.toLowerCase()) ===
              `${pageHeaderName.toLowerCase()}`
            );
          },
          { timeout: 50000, timeoutMsg: `${pageHeaderName} page is not loaded` }
        );
      } else if ((await loc_fastTabTitle).isDisplayedInViewport() === 'true') {
        await loc_fastTabTitle.waitUntil(
          async function () {
            let strfastTabTitle = await this.getText();
            return (
              (await strfastTabTitle.toLowerCase()) ===
              `${pageHeaderName.toLowerCase()}`
            );
          },
          { timeout: 50000, timeoutMsg: `${pageHeaderName} page is not loaded` }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async waitUntilATargetValueIsNotEmpty(elem) {
    /*TODO: 
     PRE-CONDITIONS: 
     - None
     FUNCTION: If given target is not has value then keep hit refresh until value return not empty
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    while ((await elem).getValue() === '') {
      await this.PressMultipleKey(KEY_SHIFT, KEY_F5);
      await this.WaitForSecond(1);
      if ((await elem).getValue() !== '') {
        break;
      }
    }
  }

  async waitUntilTargetMeetPageTitle(target, pageHeaderName) {
    /*TODO: 
     PRE-CONDITIONS: 
     - Target, desire page header title
     FUNCTION: Wait until given target is meet desire title
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    await (
      await target
    ).waitUntil(
      async function () {
        return (await this.getText()) === pageHeaderName;
      },
      { timeout: 50000, timeoutMsg: `${pageHeaderName} is not displayed` }
    );
  }
  //
  async waitUntilTargetMeetExpectedValue(target, val) {
    await target.waitUntil(async function () {
      return (await this.getValue()) === val;
    });
  }
  //
  async inputTargetNewValue(target, value) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	*/
    /********************************************************************************************/
    await target.waitForClickable();
    await target.click();
    await this.DataClearance();
    await target.setValue(value);
  }
  //
  async clickVisibleTarget(target) {
    await target.waitForClickable();
    await target.click();
  }
  //
  async IfExpanded(elembtn) {
    await elembtn.waitForClickable();
    if ((await elembtn.getAttribute('aria-expanded')) === 'false') {
      await elembtn.click();
      await this.WaitForComplete();
    }
  }
  async selectAnOptionFromDropDown(ddList, opt) {
    /*TODO: 
    FUNCTION: Select a value from drop down list if value is not selected then reselect it from list 
     @ddList: element contain list of value
     @opt: provide aria-selected attribute which is option on the list
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    await this.WaitUntilTargetDisplayedOnView(ddList);
    while ((await opt.getAttribute('aria-selected')) === 'false') {
      await this.clickVisibleTarget(ddList);
      await this.PressMultipleKey(KEY_ALT, KEY_ARROW_DOWN);
      await this.clickVisibleTarget(opt);
      if ((await opt.getAttribute('aria-selected')) === 'true') {
        break;
      }
    }
  }
  //
  async checkToggleUntilItChecked(target) {
    while ((await target.getAttribute('aria-checked')) === 'false') {
      await this.clickVisibleTarget(target);
      if ((await target.getAttribute('aria-checked')) === 'true') {
        break;
      }
    }
  }
  //
  async checkToggleUntilItNotCheck(target) {
    while ((await target.getAttribute('aria-checked')) === 'true') {
      await this.clickVisibleTarget(target);
      if ((await target.getAttribute('aria-checked')) === 'false') {
        break;
      }
    }
  }
  //
  async closeDialog() {
    /*METHOD: Close all finops dialog
     -> Hit alt + enter to close current dialog
     -> Make sure current dialog is focused
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/

    await this.PressMultipleKey(KEY_ALT, KEY_ENTER);
  }
  //
  async enableEditMode(target) {
    /*METHOD: Enable edit mode 
     -> Hit F2 to open Edit mode if given @target is readonly else do nothing
     -> Make sure variable casting is not readonly after edit mode is openned else return false
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    while ((await target.getAttribute('readonly')) === 'true') {
      await this.PressKey(KEY_F2);
      await this.WaitForSecond(1);
      if ((await target.getAttribute('readonly')) !== 'true') {
        break;
      }
    }
  }
  //
  async waitForValue(selector) {
    await browser.waitUntil(
      async function () {
        return (await selector.getValue()) !== null;
      },
      { timeout: 50000, timeoutMsg: `${selector} value is not found` }
    );
  }
  //
  async waitForAttribute(selector, attribute) {
    await browser.waitUntil(
      async function () {
        (await selector.getAttribute(`title`)) !== 'null';
      },
      { timeout: 50000, timeoutMsg: `${attribute} of ${selector} is not found` }
    );
  }
  //
  async deteleTargetFromTable(target) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	*/
    /********************************************************************************************/
    await target.click();
    await this.loc_btnDelete.click();
    await this.loc_promtDeleteConfirm_btnYes.waitForDisplayed();
    await this.loc_promtDeleteConfirm_btnYes.click();
    await this.PressMultipleKey(KEY_SHIFT, KEY_F5);
    await target.waitForExist({ reverse: true });
  }
}
module.exports = Page;
