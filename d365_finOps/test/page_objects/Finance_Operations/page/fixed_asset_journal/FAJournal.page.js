const Page = require('../../../../services/page_service.js');
const chai = require('chai');
const { browser, driver, $ } = require('@wdio/globals');

const {
  KEY_ENTER,
  KEY_TAB,
  KEY_DELETE,
  KEY_ALT,
  KEY_CTRL,
  FIXED_ASSETS_JOURNAL,
} = require('../../../../constants/global.constant.js');
const {
  FOLDER_FIXED_ASSETS,
} = require('../../../../constants/reportfolder.constant.js');
const moment = require('moment');

//Fixed Asset Journal element locator
const locFixedAssetJournal = require('../../element_locator/fixed_asset_journal/FixedAssetJournal.locator.js');
const locFinHome = require('../../element_locator/home/D365FinHome.js');

// Date Time format
const currentDate = new Date();
const TODAY = moment(currentDate).format('DD/MM/YYYY');
const DEPDATE = '31/03/2024';

class FAJournal extends Page {
  /*--------------------------------------- GENERAL FUNCTION ---------------------------------------*/
  async Create_New_Fix_Asset_Journal(JournalName) {
    /*TODO: Create FA journal with desire Journal name then open line details
     PRE-CONDITIONS: 
     - User is on fixed asset journal page
     STEPS: 
     1. 
     AUTHOR:	Quoc Tran - Code Update: 26/09/2023*/
    /********************************************************************************************/
    await this.waitUntilMeetPageTitle(FIXED_ASSETS_JOURNAL);
    await locFixedAssetJournal.ListView.loc_abtnNew.click();
    await this.WaitForComplete();

    // input FA Journal name
    await (await locFixedAssetJournal.ListView.loc_fmMain_txtName).click();
    await (
      await locFixedAssetJournal.ListView.loc_fmMain_txtName
    ).setValue(JournalName);
    await this.PressKey(KEY_TAB);
    await this.WaitForSecond(1);

    // Line
    await locFixedAssetJournal.ListView.loc_fmMain_abtnLines.click();
    await this.WaitForComplete();
  }

  async Add_New_FAJournal_Line_And_Posted(
    TransactionType,
    FixedAssetAccount,
    Description,
    Debit,
    OffsetAccount,
    TCID
  ) {
    /*TODO: Add fixed asset journal line with desire value and posted it
     PRE-CONDITIONS: 
     - User is on fixed asset journal line details form
     STEPS: 
     1. 
     AUTHOR:	Quoc Tran - Code Update: 26/09/2023*/
    /********************************************************************************************/
    await this.WaitUntilTargetDisplayedOnView(
      locFixedAssetJournal.Details.loc_fmDetails_txtTransactionType
    );
    // Input line value via list tab
    await this.inputTargetNewValue(
      locFixedAssetJournal.Details.loc_fmDetails_txtTransactionType,
      TransactionType
    );
    await this.PressKey(KEY_TAB);

    await this.inputTargetNewValue(
      locFixedAssetJournal.Details.loc_fmDetails_txtAccount,
      FixedAssetAccount
    );

    await this.inputTargetNewValue(
      locFixedAssetJournal.Details.loc_fmDetails_txtDescription,
      Description
    );
    await this.PressKey(KEY_TAB);

    await (
      await locFixedAssetJournal.Details.loc_fmDetails_txtDebit
    ).setValue(Debit);

    // Input offset account value via general tab
    await this.ifTabSelected(
      locFixedAssetJournal.Details.loc_fmDetails_abtnGeneral,
      locFixedAssetJournal.Details.loc_fmDetails_abtnGeneral
    );

    await this.clickVisibleTarget(
      locFixedAssetJournal.Details.loc_fmDetails_txtOffsetAccountType
    );

    await this.clickVisibleTarget(
      locFixedAssetJournal.Details
        .loc_fmDetails_txtOffsetAccountType_optSupplier
    );

    await this.inputTargetNewValue(
      locFixedAssetJournal.Details.loc_fmDetails_txtOffsetAccount,
      OffsetAccount
    );

    await this.PressKey(KEY_TAB);
    await this.WaitForSecond(1);

    await this.ifTabSelected(
      locFixedAssetJournal.Details.loc_fmDetails_tabList,
      locFixedAssetJournal.Details.loc_fmDetails_btnList
    );
    await this.WaitUntilTargetDisplayedOnView(
      locFixedAssetJournal.Details.loc_fmDetails_txtVoucher
    );
    let VoucherID =
      await locFixedAssetJournal.Details.loc_fmDetails_txtVoucher.getValue();
    // Post
    await locFixedAssetJournal.Details.loc_fmDetails_abtnPost.click();
    await this.waitUntilOperationComplete();
    //** Take Screenshot
    await this.SaveScreenShot(FOLDER_FIXED_ASSETS, TCID, '_Posted_FAJ.png');
    return VoucherID;
  }

  async Add_New_Depreciation_Line_Via_Depreciation_Proposal(FAID, TCID) {
    /*TODO: 
     PRE-CONDITIONS: 
     - Expecting user on Fixed asset journal line details with Depreciation type
     STEPS: 
     1. 
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    await this.waitUntilMeetPageTitle('Fixed asset journal');

    await this.clickVisibleTarget(
      locFixedAssetJournal.Details.loc_fmDetails_abtnProposals
    );
    await this.clickVisibleTarget(
      locFixedAssetJournal.Details
        .loc_fmDetails_ddProposals_btnDepreciationProposal
    );

    await this.waitUntilMeetPageTitle('Depreciation proposal');
    await this.inputTargetNewValue(
      locFixedAssetJournal.DP.loc_tabParameters_txtToDate,
      DEPDATE
    );
    await this.ifTargetChecked(
      locFixedAssetJournal.DP.loc_tabParameters_tggSummariseDepreciation,
      locFixedAssetJournal.DP.loc_tabParameters_tggSummariseDepreciation
    );

    await this.ifTabExpanded(
      locFixedAssetJournal.DP.loc_tabRecordInclude,
      locFixedAssetJournal.DP.loc_tabRecordInclude
    );
    await locFixedAssetJournal.DP.loc_tabRecordInclude_btnFilter.isFocused();
    await this.clickVisibleTarget(
      locFixedAssetJournal.DP.loc_tabRecordInclude_btnFilter
    );
    await this.waitUntilMeetPageTitle('Depreciation proposal for books');

    await this.inputTargetNewValue(
      locFixedAssetJournal.DPFB.loc_tabRange_colCriteria_txtFixedAssetNumber,
      FAID
    );

    await this.closeDialog();
    await this.WaitUntilTargetDisplayedOnView(
      locFixedAssetJournal.DP.loc_tabRecordInclude_btnFilter
    );
    await locFixedAssetJournal.DP.loc_btnOK.isFocused();
    await locFixedAssetJournal.DP.loc_btnOK.click();
    await this.waitUntilOperationComplete();

    // Post

    await locFixedAssetJournal.Details.loc_fmDetails_abtnPost.waitForClickable();
    await locFixedAssetJournal.Details.loc_fmDetails_abtnPost.click();
    await this.waitUntilOperationComplete();
    await this.WaitForSecond(2);
    let VoucherID =
      await locFixedAssetJournal.Details.loc_fmDetails_txtVoucher.getValue();
    //** Take Screenshot
    await this.SaveScreenShot(FOLDER_FIXED_ASSETS, TCID, '_Posted_FAJ.png');

    return VoucherID;
  }

  /*********************************** FUNTIONAL FOR FIXED ASSETS JOURNAL SCEN ******************************/
  //USING IN 91844, 91929, 91928
  async Verify_FixedAsset_Can_Be_Acquired_Via_FixedAssetJournal(
    FAnum,
    FAJType,
    FAJ_Name,
    Debit,
    OffsetAccount,
    FAJDescription,
    TCID
  ) {
    /*TODO: Create Acquisition journal and posted
     PRE-CONDITIONS: 
     - User is on Fixed asset journal page
     STEPS: 
      1. Login to FinOps by admin user - c
      2. Navigate to Fixed Assets page - c
      3. Click New and enter FAJrn - n
      4. Open Lines and enter required values - n
      5. Click Post - n
      6. Open Financial Dimensions tab -n
      7. Input FDs infor - n
     AUTHOR:	Quoc Tran - Code Update: 26/09/2023*/
    /********************************************************************************************/

    await this.WaitForComplete();
    await (await locFixedAssetJournal.ListView.loc_abtnNew).click();
    await this.WaitForSecond(2);

    await (await locFixedAssetJournal.ListView.loc_fmMain_txtName).click();
    await (
      await locFixedAssetJournal.ListView.loc_fmMain_txtName
    ).setValue(FAJ_Name);
    await this.WaitForComplete();
    await this.PressKey(KEY_TAB);
    await this.WaitForSecond(1);

    await (await locFixedAssetJournal.ListView.loc_fmMain_abtnLines).click();
    await this.WaitForComplete();

    await (
      await locFixedAssetJournal.Details.loc_fmDetails_txtTransactionType
    ).click();
    await (
      await locFixedAssetJournal.Details.loc_fmDetails_txtTransactionType
    ).setValue(FAJType);
    await this.PressKey(KEY_TAB);
    await (
      await locFixedAssetJournal.Details.loc_fmDetails_txtAccount
    ).setValue(FAnum);
    await this.PressKey(KEY_TAB);
    await this.PressKey(KEY_TAB);
    await (
      await locFixedAssetJournal.Details.loc_fmDetails_txtDescription
    ).setValue(FAJDescription);
    await this.PressKey(KEY_TAB);
    await (
      await locFixedAssetJournal.Details.loc_fmDetails_txtDebit
    ).setValue(Debit);
    await this.WaitForSecond(3);

    await (
      await locFixedAssetJournal.Details.loc_fmDetails_abtnGeneral
    ).click();
    await this.WaitForComplete();

    await (
      await locFixedAssetJournal.Details.loc_fmDetails_txtOffsetAccountType
    ).isClickable();
    await locFixedAssetJournal.Details.loc_fmDetails_txtOffsetAccountType.click();
    await this.WaitForComplete();
    await (
      await locFixedAssetJournal.loc_fmDetails_txtOffsetAccountType_optSupplier
    ).isClickable();
    await locFixedAssetJournal.Details.loc_fmDetails_txtOffsetAccountType_optSupplier.click();
    await this.WaitForSecond(1);

    await (
      await locFixedAssetJournal.Details.loc_fmDetails_txtOffsetAccount
    ).click();
    await this.WaitForSecond(1);
    await (
      await locFixedAssetJournal.Details.loc_fmDetails_txtOffsetAccount
    ).setValue(OffsetAccount);

    await this.WaitForSecond(1);
    await this.PressMultipleKey(KEY_ALT, 's');
    await this.WaitForSecond(1);
    await this.PressKey(KEY_TAB);
    await this.WaitForSecond(1);

    await (await locFixedAssetJournal.Details.loc_fmDetails_btnList).click();
    let FAJVoucher = await (
      await locFixedAssetJournal.Details.loc_fmDetails_txtVoucher
    ).getValue();
    await this.WaitForSecond(1);
    // ** Take Screenshot
    await this.SaveScreenShot('fixed-assets', TCID, '_FAJ_Acquisition.png');

    await this.WaitForComplete();

    await browser.waitUntil(() =>
      locFixedAssetJournal.Details.loc_fmDetails_abtnPost.isClickable()
    );
    await (await locFixedAssetJournal.Details.loc_fmDetails_abtnPost).click();
    await this.waitUntilOperationComplete();

    //** Take Screenshot
    await this.SaveScreenShot(
      'fixed-assets',
      TCID,
      '_Posted_FAJ_Acquisition.png'
    );
  }

  //USING IN 91923, 91929, 91928
  async Verify_FixedAsset_Can_Be_Depreciated_Via_FixedAssetJournal(
    FixedAssetNumber,
    JournalName,
    TransactionType,
    Credit,
    Description,
    TCID
  ) {
    /*TODO: Create depreciation journal and posted
     PRE-CONDITIONS: 
     - user is on Fixed asset journal page
     STEPS: 
     1. 
     AUTHOR:	Quoc Tran - Code Update: 26/09/2023*/
    /********************************************************************************************/
    await this.clickVisibleTarget(locFixedAssetJournal.ListView.loc_abtnNew);

    await this.inputTargetNewValue(
      locFixedAssetJournal.ListView.loc_fmMain_txtName,
      JournalName
    );

    await this.PressKey(KEY_TAB);
    await this.WaitForSecond(1);

    await this.clickVisibleTarget(
      locFixedAssetJournal.ListView.loc_fmMain_abtnLines
    );

    await this.inputTargetNewValue(
      locFixedAssetJournal.Details.loc_fmDetails_txtTransactionType,
      TransactionType
    );
    await this.PressKey(KEY_TAB);
    // Create FA journal line
    await (
      await locFixedAssetJournal.Details.loc_fmDetails_txtAccount
    ).setValue(FixedAssetNumber);
    await this.PressKey(KEY_TAB);
    await this.PressKey(KEY_TAB);
    await (
      await locFixedAssetJournal.Details.loc_fmDetails_txtDescription
    ).setValue(Description);
    await this.PressKey(KEY_TAB);
    await (
      await locFixedAssetJournal.Details.loc_fmDetails_txtCredit
    ).setValue(Credit);
    await this.WaitForSecond(3);

    //** Take Screenshot
    await this.SaveScreenShot('fixed-assets', TCID, '_FAJ_Depreciation.png');

    await this.PressMultipleKey(KEY_ALT, 's');
    await this.WaitForSecond(2);

    await browser.waitUntil(() =>
      locFixedAssetJournal.Details.loc_fmDetails_abtnPost.isClickable()
    );
    await (await locFixedAssetJournal.Details.loc_fmDetails_abtnPost).click();
    await this.waitUntilOperationComplete();

    //** Take Screenshot
    await this.SaveScreenShot(
      'fixed-assets',
      TCID,
      '_FAJ_Depreciation_Posted.png'
    );
    await this.WaitForComplete();
  }
}

module.exports = new FAJournal();
