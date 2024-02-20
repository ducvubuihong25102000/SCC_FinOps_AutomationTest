const Page = require('../../../../services/page_service.js');

// Libraries
const chai = require('chai');
const moment = require('moment');
const { browser, driver } = require('@wdio/globals');

// Page objects
const pageFOHomePage = require('../home/FinopsHomepage.page.js');
const pageLogin = require('../home/D365Login.page.js');
const pageGL = require('../general_journal/GeneralLedger.page.js');
const pagePSI = require('../pending_supplier_invoice/PendingSupplierInvoice.page.js');
const pageSO = require('../sale_order/SaleOrder.page.js');
const pageBank = require('../cash_and_bank/CashAndBank.page.js');

// Data Models

// Global variables
const {
  KEY_F2,
  KEY_F5,
  KEY_ENTER,
  KEY_TAB,
  KEY_DELETE,
  KEY_ALT,
  FIXED_ASSETS,
  PURCHASE_ORDER,
  KEY_ARROW_DOWN,
  KEY_CTRL,
  KEY_SHIFT,
  KEY_ESC,
} = require('../../../../constants/global.constant.js');

/* ----------------------- Libraries import ---------------------------- */
// Date time library
const currentDate = new Date();
const toDay = moment(currentDate).format('YYYYMMDD');
const PostedDate = moment(currentDate).format('DD/MM/YYYY');

class newSupp extends Page {
  /*************************************TRIAL BALANCE ELEMENT LOCATOR*********************************************/
  /**********************************************************************************************************/

  get TB_Calculate_Balances_BTN() {
    return $(
      `//span[contains(@id,"_Update_label") and starts-with (@id,"ledgertrialbalancelistpage_")]`
    );
  }

  /*************************************TRIAL BALANCE TEST FUNCTION**********************************************/
  /*********************************************************************************************************/

  /*************************************TRIAL BALANCE GENERAL FUNCTION*******************************************/
  /*********************************************************************************************************/

  //USING IN: 92889
  async Calculate_Trial_Balance() {
    (await this.TB_Calculate_Balances_BTN).click();
    await this.messagePopUp.waitUntil(async function () {
      return (await this.getText()) === 'Operation completed';
    });
  }
}
module.exports = new newSupp();
