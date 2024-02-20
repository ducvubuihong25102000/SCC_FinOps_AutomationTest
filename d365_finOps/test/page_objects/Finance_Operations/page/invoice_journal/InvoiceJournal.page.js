const { browser, driver, $ } = require('@wdio/globals');

//Import Library
const Page = require('../../../../services/page_service.js');
const chai = require('chai');
const moment = require('moment');

//Page Objects
const locInvoiceJournal = require('../../element_locator/invoice_journal/InvoiceJournal.locator.js');

//Global constansts
const {
  KEY_ENTER,
  KEY_TAB,
  KEY_DELETE,
  KEY_ALT,
  KEY_CTRL,
  KEY_SHIFT,
  KEY_HOME,
  ALL_FREE_TEXT_INVOICE,
  FIXED_ASSETS,
} = require('../../../../constants/global.constant.js');

//Date time format
const currentDate = new Date();
const TODAY = moment(currentDate).format('YYYYMMDD');

class INVJ extends Page {
  async Add_New_Invoice_Journal_Line(Name) {
    await this.waitUntilMeetPageTitle('Invoice journal');
    //2. Click on New Invoice Journal button and create new invoice journal
    await this.clickVisibleTarget(locInvoiceJournal.ListView.loc_abtnNew);

    await this.inputTargetNewValue(
      locInvoiceJournal.ListView.loc_gridJournal_txtName,
      Name
    );
    await this.PressKey(KEY_ALT, 's');
    //3. Open Invoice journal details page
    await this.PressKey(KEY_TAB);
    await this.WaitForSecond(1);
    await this.clickVisibleTarget(locInvoiceJournal.ListView.loc_abtnLines);
    await this.waitUntilMeetPageTitle('Supplier invoice journal');
  }

  async Verify_New_Invoice_Journal_Should_Be_Created_And_Posted_Correctly(
    Description,
    AccountType,
    Account,
    Debit,
    Offsetaccount
  ) {
    /*******************************TO DO LIST************************
     *  1. Verify that user is on the Invoice Journal page
        2. Click on New Invoice Journal button and create new invoice journal
        3. Open Invoice journal details page
        4. Add new invoice journal line
        5. Fulfill the invoice journal line with Account type is Fixed Asset
        6. Validate and Post the invoice journal
        7. Navigate to Fixed Assets and find the FA that was used for above invoice journal line
        8. Open transactions history page and verify that the transaction is created with correct information
    ******************************************************************/

    //5. Input Account and Offset Account

    await this.inputTargetNewValue(
      locInvoiceJournal.Details.loc_tabList_ddAccountType,
      AccountType
    );
    await this.PressKey(KEY_TAB);
    await this.inputTargetNewValue(
      locInvoiceJournal.Details.loc_tabList_ddAccount,
      Account
    );

    await this.PressKey(KEY_TAB);
    const INVOICEID = (await this.generateNumber()).toString();

    await locInvoiceJournal.Details.loc_tabList_ddAccount;
    await this.inputTargetNewValue(
      locInvoiceJournal.Details.loc_tabList_txtInvoice,
      INVOICEID
    );
    await this.inputTargetNewValue(
      locInvoiceJournal.Details.loc_tabList_txtDescription,
      Description
    );
    await this.inputTargetNewValue(
      locInvoiceJournal.Details.loc_tabList_txtDebit,
      Debit
    );
    await this.PressKey(KEY_TAB);

    //General tab
    await this.ifTabSelected(
      locInvoiceJournal.Details.loc_tabGeneral,
      locInvoiceJournal.Details.loc_btnGeneral
    );

    await this.selectAnOptionFromDropDown(
      locInvoiceJournal.Details.loc_tabGeneral_ddOffsetAccountType,
      locInvoiceJournal.Details.loc_tabGeneral_ddOAT_optSupplier
    );

    await this.inputTargetNewValue(
      locInvoiceJournal.Details.loc_tabGeneral_txtOffsetAccount,
      Offsetaccount
    );
    await this.PressKey(KEY_TAB);
    await this.WaitForSecond(1);

    //5. Input rest of reamaining value from List tab
    await this.ifTabSelected(
      locInvoiceJournal.Details.loc_tabList,
      locInvoiceJournal.Details.loc_btnList
    );
    await this.reInputInvoiceJournalLine(
      locInvoiceJournal.Details.loc_tabList_txtOffsetAccount,
      Offsetaccount
    );

    await this.clickVisibleTarget(await locInvoiceJournal.Details.loc_abtnPost);
    await this.waitUntilOperationComplete();
    let VoucherID = await (
      await locInvoiceJournal.Details.loc_tabList_txtVoucher
    ).getValue();

    return VoucherID;
  }

  async reInputInvoiceJournalLine(selector, value) {
    await selector.isDisplayedInViewport();
    if ((await selector.getAttribute('title')) === null) {
      await this.inputTargetNewValue(selector, value);
    }
  }
}
module.exports = new INVJ();
