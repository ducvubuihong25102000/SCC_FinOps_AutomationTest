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
  get Suppliers_Main_Header_Title() {
    return $(`//h1//child::span[text()="All suppliers"]`);
  }

  get Suppliers_Grid_Filter_Input() {
    return $(
      `//input[contains(@id, "vendtablelistpage") and contains(@id, "Input")]`
    );
  }

  get Suppliers_Grid_Account_Filter() {
    return $(
      `//div[contains(@id, "VendTable_AccountNum") and contains(@id, "header")]`
    );
  }

  get Suppliers_Grid_Account_Filter_Input() {
    return $(
      `//input[contains(@id, "FilterField_VendTable_AccountNum") and contains(@id, "input")]`
    );
  }
  get Suppliers_Grid_Account_Filter_Apply_BTN() {
    return $(`//span[contains(@id, "AccountNum_ApplyFilters_label")]`);
  }

  get Suppliers_Account_Transactions_BTN() {
    return $(`//span[contains(@id, "Transactions_label")]`);
  }

  // Suppliers transactions page
  get Suppliers_Transactions_Header_Title() {
    return $(`//h1//child::span[text()="Supplier transactions"]`);
  }

  get Suppliers_Transactions_Voucher_BTN() {
    return $(
      `//span[contains(@id, "vendtrans_") and contains(@id, "_LedgerTransact_label")]//parent::div`
    );
  }

  get Suppliers_Transactions_Select_BTN() {
    return $(`//div[contains(@class, "dyn-hoverMarkingColumn")]`);
  }

  get Suppliers_Transactions_Show_Filter_Input() {
    return $(`//input[contains(@id, "ShowOpenOptions_input")]`);
  }

  get Suppliers_Transactions_Grid_Voucher_Filter() {
    return $(
      `//div[contains(@id, "VendTrans_Voucher") and contains(@id, "header")]`
    );
  }

  get Suppliers_Transactions_Grid_Voucher_Filter_Input() {
    return $(
      `//input[contains(@id, "FilterField_VendTrans_Voucher") and contains(@id, "input")]`
    );
  }

  get Suppliers_Transactions_Grid_Voucher_Filter_Apply_BTN() {
    return $(`//span[contains(@id, "Voucher_ApplyFilters_label")]`);
  }

  get Suppliers_Transactions_Grid_Invoice_Filter() {
    return $(
      `//div[contains(@id, "VendTrans_Invoice_") and contains(@id, "header")]`
    );
  }

  get Suppliers_Transactions_Grid_Invoice_Filter_Input() {
    return $(
      `//input[contains(@id, "FilterField_VendTrans_Invoice") and contains(@id, "input")]`
    );
  }

  get Suppliers_Transactions_Grid_Invoice_Filter_Apply_BTN() {
    return $(
      `//span[contains(@id, "Invoice_ApplyFilters_label")]//parent::div`
    );
  }

  get Suppliers_Transactions_Grid_No_Result_Message() {
    return $(`//div[contains(@id, "_noResultsMessage")]`);
  }

  get Suppliers_Transactions_Grid_FirstIndex() {
    return $(
      `//input[starts-with(@id, "VendTrans_Invoice_") and contains(@id, "0_input")]`
    );
  }

  get Suppliers_Transactions_Refresh_BTN() {
    return $(
      `//span[contains(@id, "VendTrans_") and contains(@id, "_SystemDefinedRefreshButton")]//parent::div`
    );
  }
  // Voucher transactions page

  get Suppliers_Voucher_Transactions_Header_Title() {
    return $(`//h1//child::span[text()="Voucher transactions"]`);
  }

  get Suppliers_Voucher_Transactions_PostedVAT_BTN() {
    return $(
      `//span[contains(@id, "LedgerTransVoucher") and contains(@id, "TaxTransactions_label")]//parent::div`
    );
  }

  get Suppliers_Voucher_Transactions_Transaction_Origin_BTN() {
    return $(
      `//span[starts-with(@id, 'LedgerTransVoucher_') and contains(@id, '_Base_label')]//parent::div`
    );
  }

  // Transaction Origin of the transaction page
  get Suppliers_Voucher_Transactions_Transaction_Origin_Title() {
    return $(`//h1//span[text()="Transaction origin"]`);
  }

  get Suppliers_Voucher_Transactions_Transaction_Origin_AccountType_Header() {
    return $(
      `//div[starts-with(@id, 'TmpLedgerBase_Module_') and contains(@id, '_header')]`
    );
  }

  get Suppliers_Voucher_Transactions_Transaction_Origin_AccountType_Input_Filter() {
    return $(
      `//input[starts-with(@id, '__FilterField_TmpLedgerBase_Module_Module_Input_') and contains(@id, '_input')]`
    );
  }

  get Suppliers_Voucher_Transactions_Transaction_Origin_AccountType_Apply_BTN() {
    return $(
      `//span[contains(@id, '__TmpLedgerBase_Module_ApplyFilters_label')]') and contains(@id, '_input')]`
    );
  }

  get Suppliers_Voucher_Transactions_Transaction_Origin_Account_FirstIndex() {
    return $(
      `//input[starts-with(@id, 'TmpLedgerBase_Id_') and contains(@id, '_input')]`
    );
  }

  // Posted VAT of the transaction page
  get Suppliers_Voucher_Transactions_PostedVAT_Header_Title() {
    return $(`//h1//child::span[text()="Posted VAT"]`);
  }

  get Suppliers_Voucher_Transactions_PostedVAT_VATCode_Input() {
    return $(`//input[contains(@id, "TaxCode") and contains(@id, "input")]`);
  }

  get Suppliers_Voucher_Transactions_PostedVAT_VATCode_Input1() {
    return $(`//input[contains(@aria-label, "VAT code")`);
  }

  get Suppliers_Voucher_Transactions_PostedVAT_ActualVATAmount_Input() {
    return $(`//input[contains(@aria-label, "Actual VAT amount")`);
  }

  get Suppliers_Voucher_Transactions_PostedVAT_General_Tab() {
    return $(
      `//li[contains(@id, "TaxTrans") and contains(@id,"General_header")]`
    );
  }

  get Suppliers_Voucher_Transactions_PostedVAT_General_VATPercentage_Input() {
    return $(`//input[contains(@id, "Invoicing_TaxValue_input")]`);
  }

  get Suppliers_Voucher_Transactions_PostedVAT_Back_BTN() {
    return $(
      `//button[starts-with(@id, 'TaxTrans_') and contains(@id, '_SystemDefinedCloseButton')]`
    );
  }

  /*************************************SUPPLIER TEST FUNCTION**********************************************/
  /*********************************************************************************************************/

  async FilterSupplier(SupplierID) {
    await this.WaitForSecond(1);
    (await this.Suppliers_Grid_Account_Filter).click();
    await this.WaitForSecond(2);
    (await this.Suppliers_Grid_Account_Filter_Input).addValue(SupplierID);
    await this.WaitForSecond(2);
    (await this.Suppliers_Grid_Account_Filter_Apply_BTN).click();
  }

  async VerifySupplierTransactionforInvoice(InvoiceNumber) {
    await this.WaitForSecond(2);
    await this.Suppliers_Account_Transactions_BTN.click();
    await this.WaitForComplete();
    await (
      await this.Suppliers_Transactions_Header_Title
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Supplier transactions';
      },
      { timeout: 50000, timeoutMsg: 'Supplier transactions is not displayed' }
    );

    //Filter the Invoice until it appears in the Grid view
    await this.WaitForSecond(2);
    (await this.Suppliers_Transactions_Grid_Invoice_Filter).click();
    await this.WaitForSecond(2);
    (await this.Suppliers_Transactions_Grid_Invoice_Filter_Input).addValue(
      InvoiceNumber
    );

    (await this.Suppliers_Transactions_Grid_Invoice_Filter_Apply_BTN).click();
    await this.WaitForSecond(2);

    let result = '';
    do {
      await this.PressKey([KEY_SHIFT, KEY_F5, 'NULL']);
      await this.WaitForSecond(2);

      try {
        result =
          await this.Suppliers_Transactions_Grid_No_Result_Message.getText();
      } catch (e) {
        break;
      }
    } while (result === "We didn't find anything to show here.");

    await (
      await this.Suppliers_Transactions_Grid_FirstIndex
    ).waitUntil(
      async function () {
        return (await this.isDisplayed()) === true;
      },
      { timeout: 50000, timeoutMsg: 'Invoice transaction is not appears' }
    );
    await this.WaitForSecond(1);
    await browser.refresh();

    await this.WaitForSecond(2);
    (await this.Suppliers_Transactions_Grid_Invoice_Filter).click();
    await this.WaitForSecond(2);
    (await this.Suppliers_Transactions_Grid_Invoice_Filter_Input).addValue(
      InvoiceNumber
    );

    (await this.Suppliers_Transactions_Grid_Invoice_Filter_Apply_BTN).click();
    await this.WaitForSecond(2);

    await this.Suppliers_Transactions_Voucher_BTN.click();

    do {
      await this.PressKey([KEY_SHIFT, KEY_F5, 'NULL']);
      await this.WaitForSecond(2);

      try {
        result =
          await this.Suppliers_Transactions_Grid_No_Result_Message.getText();
      } catch (e) {
        break;
      }
    } while (result === "We didn't find anything to show here.");
  }

  async VerifyVoucherOfSupplierInvoice(VATCode, Description) {
    await this.WaitForComplete();

    await (
      await this.Suppliers_Voucher_Transactions_Header_Title
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Voucher transactions';
      },
      { timeout: 50000, timeoutMsg: 'Voucher transactions is not displayed' }
    );
    await this.Suppliers_Voucher_Transactions_PostedVAT_BTN.click();

    await (
      await this.Suppliers_Voucher_Transactions_PostedVAT_Header_Title
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Posted VAT';
      },
      { timeout: 50000, timeoutMsg: 'Posted VAT is not displayed' }
    );

    var vatCode = await (
      await this.Suppliers_Voucher_Transactions_PostedVAT_VATCode_Input
    ).getValue();
    assert.equal(
      vatCode,
      VATCode,
      'Correct VAT Code displays for Posted VAT page'
    );

    await this.SaveScreenShot('general-ledger', Description, 'POSTEDVAT');
  }

  async Verify_New_FA_Create_From_Supplier_Invoice() {
    await this.WaitForComplete();
    (await this.Suppliers_Voucher_Transactions_PostedVAT_Back_BTN).click();

    await (
      await this.Suppliers_Voucher_Transactions_Header_Title
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Voucher transactions';
      },
      { timeout: 50000, timeoutMsg: 'Voucher transactions is not displayed' }
    );

    (await this.Suppliers_Voucher_Transactions_Transaction_Origin_BTN).click();

    await (
      await this.Suppliers_Voucher_Transactions_Transaction_Origin_Title
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Transaction origin';
      },
      { timeout: 50000, timeoutMsg: 'Transaction origin is not displayed' }
    );

    (
      await this
        .Suppliers_Voucher_Transactions_Transaction_Origin_AccountType_Header
    ).click();
    await this.WaitForSecond(2);
    (
      await this
        .Suppliers_Voucher_Transactions_Transaction_Origin_AccountType_Input_Filter
    ).setValue('Fixed assets');
    await this.WaitForSecond(1);
    await this.Suppliers_Voucher_Transactions_Transaction_Origin_AccountType_Apply_BTN.click();
    let FANumber = (
      await this
        .Suppliers_Voucher_Transactions_Transaction_Origin_Account_FirstIndex
    ).getAttribute('title');

    return FANumber;
  }
}
module.exports = new newSupp();
