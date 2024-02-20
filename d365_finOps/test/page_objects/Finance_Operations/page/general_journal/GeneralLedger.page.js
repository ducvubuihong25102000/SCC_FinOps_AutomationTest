const Page = require('../../../../services/page_service.js');
const CHAI = require('chai');
// Page element locator
const locGeneralJournal = require('../../element_locator/general_ledger/GeneralJournal.locator.js');

// Page objects
const { browser, driver, $ } = require('@wdio/globals');

// Global variables
const {
  KEY_F2,
  KEY_ENTER,
  KEY_TAB,
  KEY_DELETE,
  KEY_ALT,
  FIXED_ASSETS,
  KEY_ARROW_DOWN,
  KEY_CTRL,
} = require('../../../../constants/global.constant.js');

/* ----------------------- Libraries import ---------------------------- */
// Date time library
const moment = require('moment');
const currentDate = new Date();
const toDay = moment(currentDate).format('YYYYMMDD');
var ExpectedJournalPostedDate = moment(currentDate).format('DD/MM/YYYY');

class D365FINGeneralJournal extends Page {
  async OpenGLViaFilter(JournalBatchNumber) {
    /*TODO: 
     PRE-CONDITIONS: 
     - Expecting user is on General Ledger page
     FUNTIONS: Used to Open desire journal record by providing it batch number
     AUTHOR:	Quoc Tran */
    /********************************************************************************************/
    await locGeneralJournal.ListView.loc_viewGrid_colJournalBatchNumber.click();
    await this.WaitForComplete();
    await locGeneralJournal.ListView.loc_viewGrid_colJournalBatchNumber_txtFilter.addValue(
      JournalBatchNumber
    );
    await this.WaitForComplete();
    await locGeneralJournal.ListView.loc_viewGrid_colJournalBatchNumber_btnApplyFilter.click();
    await this.waitUntilATargetValueIsNotEmpty(
      locGeneralJournal.ListView.loc_viewGrid_txtJournalBatchNumber_01
    );
    await (
      await locGeneralJournal.ListView.loc_viewGrid_txtJournalBatchNumber_01
    ).click();
    await this.PressKey(KEY_ENTER);
    await this.waitUntilTargetMeetPageTitle('Journal voucher');
    CHAI.expect(
      await (
        await locGeneralJournal.ListView.loc_viewHeader_tltJournalVoucher
      ).getText()
    ).to.equal('Journal voucher');
  }
  //USING IN: 66920, 91784, 91785, 92677
  async Create_New_General_Journal(JournalName) {
    /*TODO: 
     PRE-CONDITIONS: 
     - Expecting user is on General journal page
     FUNCTION: Creating new General Journal with desire Journal Name
     STEPS: 
      1. Open GL page and create new GL record
      2. Open the record and create new GL line and Bank account
      3. Post GL for Bank
      4. Verify GL After Post
      5. Verify Bank transaction update correctly 
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/

    await this.waitUntilMeetPageTitle('General journals');
    await (await locGeneralJournal.ListView.loc_abtnNew).click();
    await (
      await locGeneralJournal.ListView.loc_viewGrid_txtJournalName_01
    ).click();
    await (
      await locGeneralJournal.ListView.loc_viewGrid_txtJournalName_01
    ).setValue(JournalName);
    let journalBatchNumber = await (
      await locGeneralJournal.ListView.loc_viewGrid_txtJournalBatchNumber_01
    ).getValue();
    await this.WaitForComplete();
    await this.PressKey(KEY_TAB);
    await this.WaitForSecond(1);
    await locGeneralJournal.ListView.loc_viewLine_abtnLine.click();
    await this.waitUntilMeetPageTitle('Journal voucher');

    return journalBatchNumber;
  }
  //USING IN: 66920, 91784, 91785, 91783, 92677
  async Create_New_Line_For_General_Journal(
    AccountType,
    Account,
    Description,
    Debit,
    OffsetAccountType,
    OffsetAccount
  ) {
    /*TODO: 
     PRE-CONDITIONS: 
     - Expecting user is on General voucher journal details page
     FUNCTION: Creating new General Journal Line with desire Info
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    await this.WaitForComplete();
    let voucherID =
      await locGeneralJournal.Details.loc_viewLine_txtVoucherID.getValue();
    await (await locGeneralJournal.Details.loc_viewLine_txtAccountType).click();
    await this.WaitForComplete();
    await (
      await locGeneralJournal.Details.loc_viewLine_txtAccountType
    ).doubleClick();
    await this.PressKey(KEY_DELETE);
    await this.WaitForComplete();
    await (
      await locGeneralJournal.Details.loc_viewLine_txtAccountType
    ).setValue(AccountType);
    await this.PressKey(KEY_TAB);
    await this.WaitForSecond(1);
    await (
      await locGeneralJournal.Details.loc_viewLine_txtAccount
    ).addValue(Account);
    await this.WaitForComplete();

    await this.PressKey(KEY_TAB);
    await this.WaitForSecond(1);
    await (
      await locGeneralJournal.Details.loc_viewLine_txtDescription
    ).setValue(Description);
    await this.WaitForSecond(1);
    await this.PressKey(KEY_TAB);

    await (
      await locGeneralJournal.Details.loc_viewLine_txtDebit
    ).setValue(Debit);
    await this.WaitForSecond(1);
    await this.PressKey(KEY_TAB);
    await this.PressKey(KEY_TAB);
    await this.PressKey(KEY_TAB);
    await this.PressKey(KEY_DELETE);
    await this.WaitForComplete();

    await (
      await locGeneralJournal.Details.loc_viewLine_txtOffsetAccountType
    ).setValue(OffsetAccountType);
    await this.WaitForSecond(1);
    await this.PressKey(KEY_TAB);
    await (
      await locGeneralJournal.Details.loc_viewLine_txtOffsetAccount
    ).setValue(OffsetAccount);
    await this.WaitForComplete();

    await locGeneralJournal.Details.loc_abtnSave.click();

    return voucherID;
  }
  //USING IN: 66920, 91784, 91785, 92677
  async Verify_GL_is_Posted_Sucessfully() {
    /*TODO: 
     PRE-CONDITIONS: 
     - Expecting user is on GL details page
     - Make sure Journal is input all infos correctly
     FUNCTION: Posting a journal and waituntil operation is completed
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    await (await locGeneralJournal.Details.loc_abtnPost).click();
    await this.waitUntilOperationComplete();
  }
  //USING IN:
  async Verify_Posted_Should_Be_Checked_Under_GL_Grid(
    JournalBatchNumber,
    TCID
  ) {
    /*TODO: 
     PRE-CONDITIONS: 
     - Expecting user is on General journal page
     - Make sure Journal is posted and return a batch number
     FUNCTION: Filter posted journal and verify that posted check box is checked when a journal posted successfully
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    //Filter the GL need to check
    await this.WaitForComplete();
    await this.WaitUntilTargetDisplayedOnView(
      locGeneralJournal.ListView.loc_ddShowPostedFilter
    );

    await (await locGeneralJournal.ListView.loc_ddShowPostedFilter).click();
    await this.WaitForSecond(3);
    await locGeneralJournal.ListView.loc_ddShowPostedFilter_optPosted.click();
    await this.WaitForSecond(3);
    await locGeneralJournal.ListView.loc_viewGrid_colJournalBatchNumber.click();
    await this.WaitForComplete();
    await locGeneralJournal.ListView.loc_viewGrid_colJournalBatchNumber_txtFilter.addValue(
      JournalBatchNumber
    );
    await this.WaitForComplete();
    await locGeneralJournal.ListView.loc_viewGrid_colJournalBatchNumber_btnApplyFilter.click();
    await this.waitUntilATargetValueIsNotEmpty(
      locGeneralJournal.ListView.loc_viewGrid_txtJournalBatchNumber_01
    );
    //Check the Posted checkbox and date Posted
    let acutal_chbPosted = await (
      await locGeneralJournal.ListView.loc_viewGrid_chbPosted_optYes
    ).getAttribute('title');
    chai.expect(acutal_chbPosted).to.be.equal('Yes');

    await this.WaitForComplete();
    var actual_ExpectedJournalPostedDate = await (
      await locGeneralJournal.ListView.loc_viewGrid_txtPostedOn
    ).getValue();
    let actual_ExpectedJournalPostedDate_Concat =
      actual_ExpectedJournalPostedDate.slice(0, 10);
    chai
      .expect(actual_ExpectedJournalPostedDate_Concat)
      .to.be.equal(ExpectedJournalPostedDate);
    await this.WaitForComplete();
    await this.SaveScreenShot('general-ledger', TCID, 'JournalVoucher');
  }
  //USING IN: 91781, 91160
  async Verify_Voucher_of_Posted_GL(
    Expected_Account,
    Expected_OffsetAccount,
    Expected_Amount,
    TCID
  ) {
    /*TODO: 
     PRE-CONDITIONS: 
     - Expecting user is on general journal page
     - Make sure user is already filter desire gj record on the grd
     FUNCTION: 
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    await (await locGeneralJournal.ListView.loc_viewLine_abtnLine).click();
    await this.WaitForComplete();
    await this.waitUntilMeetPageTitle('Journal voucher');

    await this.WaitForComplete();
    await (await this.loc_viewLine_oabVoucher).click();
    await this.waitUntilMeetPageTitle('Voucher transactions');

    //Check the Account
    await this.WaitForComplete();
    await (await this.loc_viewGrid_colLedgerAccount).click();
    await this.WaitForComplete();
    await (
      await this.loc_viewGrid_colLedgerAccount_txtFilter
    ).setValue(Expected_Account);
    await this.WaitForSecond(1);
    await (await this.loc_viewGrid_colLedgerAccount_btnApplyFilter).click();
    await this.WaitForSecond(3);

    let account = await (
      await this.loc_viewGrid_txtLedgerAccount_01
    ).getValue();
    await this.WaitForComplete();
    assert.equal(
      account,
      Expected_Account,
      'Message: Correct Financial Dimension for Ledger Account'
    );
    await this.WaitForComplete();

    let amountLedger = await (await this.loc_viewGrid_txtAmount_01).getValue();
    await this.WaitForComplete();
    assert.equal(
      amountLedger,
      (Expected_Amount * 1).toFixed(2),
      'Message: Correct Amount for Ledger Account'
    );
    await this.WaitForComplete();

    let postingTypeLedger = await (
      await this.loc_viewGrid_txtPostingType_01
    ).getValue();
    await this.WaitForComplete();
    assert.equal(
      postingTypeLedger,
      'Ledger journal',
      'Message: Correct Posting Type for Ledger Account'
    );
    await this.WaitForComplete();

    //Check the Offset Account
    await this.WaitForComplete();
    await (await this.loc_viewGrid_colLedgerAccount).click();
    await this.WaitForComplete();
    await (
      await this.loc_viewGrid_colLedgerAccount_txtFilter
    ).setValue(Expected_OffsetAccount);
    await this.WaitForSecond(1);
    await (await this.loc_viewGrid_colLedgerAccount_btnApplyFilter).click();
    await this.WaitForSecond(3);

    let offsetAccount = await (
      await this.loc_viewGrid_txtLedgerAccount_01
    ).getValue();
    await this.WaitForComplete();
    assert.equal(
      offsetAccount,
      Expected_OffsetAccount,
      'Message: Correct Financial Dimension for Offset Account'
    );
    await this.WaitForComplete();

    let amountBank = await (await this.loc_viewGrid_txtAmount_01).getValue();
    await this.WaitForComplete();
    assert.equal(
      amountBank,
      (Amount * -1).toFixed(2),
      'Message: Correct Amount for Offset Account'
    );
    await this.WaitForComplete();

    let postingTypeBank = await (
      await this.loc_viewGrid_txtPostingType_01
    ).getValue();
    await this.WaitForComplete();
    assert.equal(
      postingTypeBank,
      'Ledger journal',
      'Message: Correct Posting Type for Offset Account'
    );
    await this.WaitForComplete();
    await browser.saveScreenshot(
      `./test-report/${toDay}_${await TCID}_GeneralLedger_Posted.png`
    );
  }
  //USING IN:
  async Verify_GL_is_Imported_Via_Excel() {
    //Expecting user is on GL details form
    const scriptpath = 'C:/Users/quoctd/Desktop';
    const scriptname = 'oExcel.exe';
    await (await locGeneralJournal.Details.loc_abtnSave).click();
    await (await locGeneralJournal.Details.loc_abtnOpenExcel).click();
    await this.WaitForSecond(1);
    await (
      await locGeneralJournal.Details.loc_ddOpenInExcel_optInvoiceJournalLine
    ).click();
    await this.WaitForSecond(1);
    await (
      await locGeneralJournal.Details.loc_dlgOpenInExcel_btnDownload
    ).click();
    await this.WaitForSecond(3);
    await this.runAutoItScript(scriptpath, scriptname);
  }
  //USING IN:
  async Verify_GL_Data_After_Import() {
    //Expecting user is on GL details form
  }
  //USING IN: 921677
  async Verify_VAT_information_for_GL(
    ItemVatGroup,
    VatGroup,
    VATCode,
    Percent,
    ActualVATAmount,
    TotalActualVATAmount,
    TCID
  ) {
    await this.WaitForComplete();
    await locGeneralJournal.Details.loc_viewLine_txtItemVATGroup.click();
    await this.WaitForComplete();
    await (
      await locGeneralJournal.Details.loc_viewLine_txtItemVATGroup
    ).setValue(ItemVatGroup);
    await this.WaitForComplete();
    await (
      await locGeneralJournal.Details.loc_viewLine_txtVATGroup
    ).setValue(VatGroup);
    await this.WaitForComplete();

    await locGeneralJournal.Details.loc_abtnSave.click();

    await this.WaitForSecond(3);
    await locGeneralJournal.Details.loc_viewLine_oabVAT.click();

    //Check if users in the VAT transactions dialog
    await this.waitUntilMeetPageTitle('VAT transactions');
    //check the VAT information in the GL form
    await this.WaitForComplete();

    let actual_VATCode = await (
      await locGeneralJournal.Details
        .loc_dlgVATTransaction_tabOverView_txtVATCode_01
    ).getValue();
    await this.WaitForComplete();
    assert.equal(
      actual_VATCode,
      VATCode,
      'Message: Correct VAT Code match with the Item VAT Group and VAT Group '
    );
    await this.WaitForComplete();

    let actual_Percent = await (
      await locGeneralJournal.Details
        .loc_dlgVATTransaction_tabOverView_txtPercent_01
    ).getValue();
    await this.WaitForComplete();
    assert.equal(actual_Percent, Percent, 'Message: Correct Percent for VAT');
    await this.WaitForComplete();

    let actualVATAmount = await (
      await locGeneralJournal.Details
        .loc_dlgVATTransaction_tabOverView_txtAmount_01
    ).getValue();
    await this.WaitForComplete();
    assert.equal(
      actualVATAmount,
      ActualVATAmount,
      'Message: Correct Actual VAT amount for Ledger'
    );
    await this.WaitForComplete();

    let totalActualVATAmount = await (
      await locGeneralJournal.Details
        .loc_dlgVATTransaction_tabFooter_txtTotalActualVATAmount
    ).getAttribute('title');
    await this.WaitForComplete();
    assert.equal(
      totalActualVATAmount,
      TotalActualVATAmount,
      'Message: Correct Total Actual VAT amount for Ledger'
    );
    await this.WaitForComplete();

    //Take the screenshot of the VAT transactions page
    await this.SaveScreenShot('general-ledger', TCID, '_GeneralLedger_Posted');

    await this.WaitForComplete();
    //Out the VAT transactions dialog prepare for pre-Post
    await (await locGeneralJournal.Details.loc_dlgVATTransaction_btnOK).click();
    await this.WaitForComplete();
  }
  async Verify_VAT_Voucher_of_Posted_GL(VATAccount, AmountVAT, TCID) {
    await this.WaitForSecond(1);
    await (await locGeneralJournal.Details.loc_viewLine_oabVoucher).click();
    await this.waitUntilMeetPageTitle('VAT transactions');

    //Check the Account
    await (
      await locGeneralJournal.Details.loc_viewGrid_colLedgerAccount
    ).click();
    await this.WaitForComplete();
    await (
      await locGeneralJournal.Details.loc_viewGrid_colLedgerAccount_txtFilter
    ).setValue(VATAccount);
    await this.WaitForSecond(1);
    await (
      await locGeneralJournal.Details
        .loc_viewGrid_colLedgerAccount_btnApplyFilter
    ).click();
    await this.WaitForSecond(3);

    let account = await (
      await locGeneralJournal.Details.loc_viewGrid_txtLedgerAccount_01
    ).getValue();
    await this.WaitForComplete();
    assert.equal(
      account,
      VATAccount,
      'Message: Correct Financial Dimension for VAT Account'
    );
    await this.WaitForComplete();

    let amountVAT = await (
      await locGeneralJournal.Details.loc_viewGrid_txtAmount_01
    ).getValue();
    await this.WaitForComplete();
    assert.equal(
      amountVAT,
      AmountVAT,
      'Message: Correct Amount for VAT Account'
    );
    await this.WaitForComplete();

    let postingTypeLedger = await (
      await locGeneralJournal.Details.loc_viewGrid_txtPostingType_01
    ).getValue();
    await this.WaitForComplete();
    assert.equal(
      postingTypeLedger,
      'VAT',
      'Message: Correct Posting Type for VAT Account'
    );
    await this.WaitForComplete();

    await this.SaveScreenShot(
      'general-ledger',
      TCID,
      '_GeneralLedgerVAT_Posted'
    );
  }
}
module.exports = new D365FINGeneralJournal();
